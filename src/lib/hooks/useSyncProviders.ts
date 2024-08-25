import { useSyncExternalStore } from 'react'
import { store } from './walletStore'

export const useSyncProviders = () => useSyncExternalStore(store.subscribe, store.value, store.value)
