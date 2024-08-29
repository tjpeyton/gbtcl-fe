// Describes metadata related to a provider based on EIP-6963.
export interface EIP6963ProviderInfo {
  'rdns': string
  'uuid': string
  'name': string
  'icon': string
}
  
// Combines the provider's metadata with an actual provider object, creating a complete picture of a
// wallet provider at a glance.
export interface EIP6963ProviderDetail {
  'info': EIP6963ProviderInfo
  'provider': EIP1193Provider
}
    
// Represents the structure of an event dispatched by a wallet to announce its presence based on EIP-6963.
export type EIP6963AnnounceProviderEvent = {
  'detail': {
    'info': EIP6963ProviderInfo,
    'provider': Readonly<EIP1193Provider>,
  }
}

// Represents the structure of a provider based on EIP-1193.
export interface EIP1193Provider {
  'isStatus'?: boolean
  'host'?: string
  'path'?: string
  'sendAsync'?: (request: { 'method': string, 'params'?: Array<unknown> }, callback: (error: Error | null, response: unknown) => void) => void
  'send'?: (request: { 'method': string, 'params'?: Array<unknown> }, callback: (error: Error | null, response: unknown) => void) => void
  'request': (request: { 'method': string, 'params'?: Array<unknown> }) => Promise<unknown>
}
  