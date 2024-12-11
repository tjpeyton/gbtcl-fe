import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatAddress(address: string) {
  return address.slice(0, 6) + '...' + address.slice(-4)
}

export const CHAIN_ID_TO_NETWORK: Record<string, string> =  {
  "0": "Unknown",
  "1": "Ethereum Mainnet",
  "11155111": "Sepolia Testnet"
}

export const CHAIN_ID_TO_ETHERSCAN_API_URL: Record<string, string> = {
  "1": "https://api.etherscan.io/api",
  "11155111": "https://api-sepolia.etherscan.io/api"
} 

export const NETWORK_TO_CHAIN_ID: Record<string, string> = {
  "Ethereum Mainnet": "1",
  "Sepolia Testnet": "11155111"
}

export const formatUnixTimestampFromSeconds = (timestamp: number) => {
  return new Date(timestamp * 1000).toLocaleString()
}

export const formatUnixTimestampFromMilliseconds = (timestamp: number) => {
  return new Date(timestamp).toLocaleString()
}

export const secondsToMilliseconds = (seconds: number) => {
  return seconds * 1000
}

export const minutesToSeconds = (minutes: number) => {
  return minutes * 60
}

export const minutesToMilliseconds = (minutes: number) => {
  return minutes * 60 * 1000
}

export const addMinutesToUnixTimestamp = (timestamp: number, minutes: number) => {
  const milliseconds = minutesToMilliseconds(minutes)
  const baseTimestamp = new Date(minutesToMilliseconds(timestamp))
  console.log('baseTimestamp', baseTimestamp)   

  const newTimestamp = new Date(baseTimestamp.getTime() + milliseconds)
  console.log('newTimestamp', newTimestamp)
  
  return newTimestamp.getTime()
}
