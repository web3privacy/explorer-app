import type { Team } from './team'
import type { Fund } from './fund'
import type { ClientDiversability } from './clientDiversability'
import type { Audit } from './audit'

export interface Project {
  id: string
  name: string
  categories: string[]
  usecases: string[]
  ecosystem?: string[]
  product_readiness?: string
  security?: string
  have_token?: boolean
  token_link?: string
  tokens?: {
    name?: string
    symbol?: string
    network?: string
    contract_address?: string
    token_link?: string
    [k: string]: unknown
  }[]
  description?: string
  project_type?: string
  product_launch_day?: string
  project_phase?: string
  sunset: boolean
  technology?: {
    type: string
    name?: string
    features: string[]
    [k: string]: unknown
  }
  links?: {
    web?: string
    twitter?: string
    telegram?: string
    discord?: string
    blog?: string
    facebook?: string
    block_explorer?: string
    whitepaper?: string
    github?: string
    docs?: string
    changelog?: string
    governance?: string
    forum?: string
    snapshot?: string
    lens?: string
    farcaster?: string
    rss_feed?: string
    coingecko?: string
    token?: string
    [k: string]: unknown
  }
  blockchain_features?: {
    p2p?: boolean
    encryption?: string
    network?: string
    upgradability?: {
      enabled?: boolean
      type?: string
      admin_keys?: string
      [k: string]: unknown
    }
    [k: string]: unknown
    opensource: boolean
    viewing_key?: boolean
    dissapearing_tx?: boolean
    frontend_anonymity?: string
    identity_integration?: null
    connected_tx?: boolean
    revealed_recipient?: boolean
    revealed_sender?: boolean
    revealed_ammount?: boolean
    reversability_condition?: string
    data_masking?: string
    asset_custody_type?: string
  }
  licences?: string
  privacy_policy?: {
    defined?: boolean
    link?: string
    data_usage?: string
    [k: string]: unknown
  }
  team?: Team
  storage?: {
    decentralized?: boolean
    [k: string]: unknown
  }
  tracebility?: {
    tracked_data?: string
    kyc?: boolean
    sign_in_type_requirments?: string[]
    [k: string]: unknown
  }
  third_party_dependency?: string
  compliance?: string
  audits?: Audit[]
  social_trust?: string
  technical_spof?: string
  assets_used?: string[]
  history?: {
    title?: string
    event_type?: string
    description?: string
    time?: string
    link?: string
    [k: string]: unknown
  }[]
  client_diversability?: ClientDiversability[]
  default_privacy?: boolean
  funding?: Fund[]
  project_status?: {
    live_status?: boolean
    version?: string
    testnet?: boolean
    mainnet?: boolean
    [k: string]: unknown
  }
  logos?: {
    file?: string
    ext?: string
    url?: string
    [k: string]: unknown
  }[]
}

export interface ProjectShallow {
  id: string
  image: string
  title1: string
  description: string
  percentage: number
  forum?: string
  github?: string
  website?: string
  twitter?: string
  coingecko?: string
  explorer?: string
  newsletter?: string
  readyness?: string
  team?: Team
  docs?: string
  audits?: Audit[]
  support?: number
  anonymity?: boolean
}

export interface ProjectIndexable extends Project {
  [key: string]: unknown
}
