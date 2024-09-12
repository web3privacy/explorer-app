import { App } from 'octokit'
import yaml from 'yaml'
import type { Project } from '~/types'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ project: Project, image?: { type: string, data: string } }>(event)
  const yamlProject = yaml.stringify(body.project)
  const { appId, privateKey, installationId } = useAppConfig().github

  const id = body.project.id || body.project.name.toLowerCase().replace(/\s+/g, '-')

  const app = new App({
    appId,
    privateKey,
  })
  await app.octokit.rest.apps.getAuthenticated()
  const octokit = await app.getInstallationOctokit(installationId)

  const owner = 'develit-io'
  const repo = 'test-repo'
  const baseBranch = 'main'
  const newBranchName = `${id}-project-update`
  const commitMessage = `${body.project.id ? `Updating the project: ${body.project.name}` : `Initiating the creation of project: ${body.project.name}`}`

  const files = [
    {
      path: `src/projects/${id}/index.yaml`,
      content: yamlProject,
      encoding: 'utf-8',
    },
  ]

  if (body.image?.data && body.image?.type) {
    files.push(
      {
        path: `src/projects/${id}/logo.${body.image.type.split('/')[1]}`,
        content: body.image.data,
        encoding: 'base64',
      },
    )
  }

  async function createBranch(owner: string, repo: string, newBranchName: string, baseBranch: string) {
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

  async function commitChangesToNewBranch(owner: string, repo: string, newBranch: string, message: string, files: { path: string, content: string }[]) {
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

    const tree = files.map(file => ({
      path: file.path,
      mode: '100644' as const,
      type: 'blob' as const,
      content: file.content,
    }))

    const { data: newTree } = await octokit.rest.git.createTree({
      owner,
      repo,
      base_tree: baseTree.sha,
      tree,
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

  async function createPullRequest(owner: string, repo: string, head: string, base: string, title: string, body: string) {
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
    await createBranch(owner, repo, newBranchName, baseBranch)
    console.log(`Branch ${newBranchName} created successfully!`)

    await commitChangesToNewBranch(owner, repo, newBranchName, commitMessage, files)
    console.log(`Changes committed to branch ${newBranchName} successfully!`)

    const pullRequestData = await createPullRequest(owner, repo, newBranchName, baseBranch, `${body.project.id ? `Update project: ${body.project.name}` : `Create project: ${body.project.name}`}`, `${body.project.id ? `Updating the project: ${body.project.name}` : `Initiating the creation of project: ${body.project.name}`}`)
    console.log('Pull request created:', pullRequestData)
  }
  catch (error) {
    console.error('Error during GitHub operations:', error)
  }
})
