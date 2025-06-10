import { readFile } from 'fs/promises'
import { join } from 'path'

import { App } from 'octokit'
import type { Octokit } from 'octokit'
import yaml from 'yaml'
import type { Project } from '~/types'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ project: Project, image?: { type: string, data: string } }>(event)
  const { appId, privateKey, installationId, baseBranch, owner, repo } = useRuntimeConfig().app.github

  let localPrivateKey

  try {
    localPrivateKey = await readFile(join(process.cwd(), 'private-key.pem'), 'utf8')
  }
  catch {
    // Intentionally ignore the error
  }

  const id = (body.project.id && body.project.id.toLowerCase() === body.project.name.toLowerCase().replace(/\s+/g, '-'))
    ? body.project.id
    : body.project.name.toLowerCase().replace(/\s+/g, '-')

  const yamlProject = yaml.stringify({
    ...body.project,
    id,
  })

  const app = new App({
    appId,
    privateKey: privateKey || localPrivateKey,
  })
  await app.octokit.rest.apps.getAuthenticated()
  const octokit = await app.getInstallationOctokit(installationId)

  const newBranchName = `${id}-project-update-${Date.now()}`
  const commitMessage = `${body.project.id
    ? `Updating the project: ${body.project.id}`
    : `Initiating the creation of project: ${body.project.name}`}`

  const files = [
    {
      path: `src/projects/${id}/index.yaml`,
      content: yamlProject,
      encoding: 'utf-8',
    },
  ]

  if (body.image?.data && body.image?.type) {
    let extension = body.image.type.split('/')[1]
    if (extension === 'svg+xml') {
      extension = 'svg'
    }
    files.push(
      {
        path: `src/projects/${id}/logo.${extension}`,
        content: body.image.data,
        encoding: 'base64',
      },
    )
  }

  async function createBranch(octokit: Octokit, owner: string, repo: string, newBranchName: string, baseBranch: string) {
    const { data: baseBranchData } = await octokit.rest.git.getRef({
      owner,
      repo,
      ref: `heads/${baseBranch}`,
    })

    await octokit.rest.git.createRef({
      owner,
      repo,
      ref: `refs/heads/${newBranchName}`,
      sha: baseBranchData.object.sha,
    })
  }

  async function deleteOldProjectFolder(octokit: Octokit, owner: string, repo: string, branch: string, oldFolderPath: string) {
    const { data: latestCommit } = await octokit.rest.repos.getCommit({
      owner,
      repo,
      ref: branch,
    })

    const { data: baseTree } = await octokit.rest.git.getTree({
      owner,
      repo,
      tree_sha: latestCommit.commit.tree.sha,
      recursive: 'true',
    })

    // Log to verify the tree structure
    console.log('Base Tree:', baseTree.tree.map(item => item.path))

    // Filter out the old folder from the tree
    const newTreeItems = baseTree.tree.filter(item => !item.path?.startsWith(oldFolderPath))
    console.log('New Tree Items (after filtering):', newTreeItems.map(item => item.path))

    if (newTreeItems.length === baseTree.tree.length) {
      console.log(`No items found to delete in the folder: ${oldFolderPath}`)
      return
    }

    const newTreeMappedItems = newTreeItems.map(item => ({
      path: item.path,
      mode: item.mode as '100644' | '100755' | '040000' | '160000' | '120000' | undefined,
      type: item.type as 'tree' | 'blob' | 'commit' | undefined,
      sha: item.sha,
    }))

    // Create a new tree without the old folder
    const { data: newTree } = await octokit.rest.git.createTree({
      owner,
      repo,
      tree: newTreeMappedItems,
      base_tree: baseTree.sha,
    })

    console.log('New Tree SHA:', newTree.sha)

    // Create a new commit with the new tree
    const { data: newCommit } = await octokit.rest.git.createCommit({
      owner,
      repo,
      message: `Deleting old project folder: ${oldFolderPath}`,
      tree: newTree.sha,
      parents: [latestCommit.sha],
    })

    console.log('New Commit SHA:', newCommit.sha)

    // Update the reference to point to the new commit
    await octokit.rest.git.updateRef({
      owner,
      repo,
      ref: `heads/${branch}`,
      sha: newCommit.sha,
    })
  }

  async function commitChangesToNewBranch(
    octokit: Octokit,
    owner: string,
    repo: string,
    newBranch: string,
    message: string,
    files: { path: string, content: string, encoding: string }[],
    deletedFiles: string[] = [],
  ) {
    try {
      const { data: latestCommit } = await octokit.rest.repos.getCommit({
        owner,
        repo,
        ref: newBranch,
      })

      const { data: baseTree } = await octokit.rest.git.getTree({
        owner,
        repo,
        tree_sha: latestCommit.commit.tree.sha,
      })

      const blobs = await Promise.all(files.map(async (file) => {
        const { data: blob } = await octokit.rest.git.createBlob({
          owner,
          repo,
          content: file.content,
          encoding: file.encoding,
        })
        return {
          path: file.path,
          mode: '100644' as const,
          type: 'blob' as const,
          sha: blob.sha,
        }
      }))

      const deletions = deletedFiles.map(filePath => ({
        path: filePath,
        mode: '100644' as const,
        type: 'blob' as const,
        sha: null,
      }))

      const { data: newTree } = await octokit.rest.git.createTree({
        owner,
        repo,
        base_tree: baseTree.sha,
        tree: [...blobs, ...deletions],
      })

      const { data: newCommit } = await octokit.rest.git.createCommit({
        owner,
        repo,
        message,
        tree: newTree.sha,
        parents: [latestCommit.sha],
      })

      await octokit.rest.git.updateRef({
        owner,
        repo,
        ref: `heads/${newBranch}`,
        sha: newCommit.sha,
      })
    }
    catch (error) {
      console.error('Error during commit operation:', error)
    }
  }

  async function createPullRequest(octokit: Octokit, owner: string, repo: string, head: string, base: string, title: string, body: string) {
    const { data: pullRequest } = await octokit.rest.pulls.create({
      owner,
      repo,
      title,
      head,
      base,
      body,
    })

    return pullRequest
  }

  try {
    await createBranch(octokit, owner, repo, newBranchName, baseBranch)
    console.log(`Branch ${newBranchName} created successfully!`)

    const deletedFiles = []
    if (body.project.id && body.project.id.toLowerCase() !== body.project.name.toLowerCase().replace(/\s+/g, '-')) {
      const oldId = body.project.id
      const oldFolderPath = `src/projects/${oldId}`
      await deleteOldProjectFolder(octokit, owner, repo, newBranchName, oldFolderPath)
      console.log(`Old project folder ${oldFolderPath} deleted successfully!`)
      deletedFiles.push(oldFolderPath)
    }

    await commitChangesToNewBranch(octokit, owner, repo, newBranchName, commitMessage, files, deletedFiles)
    console.log(`Changes committed to branch ${newBranchName} successfully!`)

    const pullRequestData = await createPullRequest(
      octokit,
      owner,
      repo,
      newBranchName,
      baseBranch,
      `${body.project.id ? `Update project: ${body.project.id}` : `Create project: ${body.project.name}`}`,
      `${body.project.id ? `Updating the project: ${body.project.id}` : `Initiating the creation of project: ${body.project.name}`}`,
    )
    console.log('Pull request created:', pullRequestData)

    return pullRequestData.html_url
  }
  catch (error) {
    console.error('Error during GitHub operations:', error)
  }
})
