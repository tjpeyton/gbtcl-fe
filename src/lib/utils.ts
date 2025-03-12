import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { LotteryDocument, LotteryStatus } from './types/lottery'

const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

const formatAddress = (address: string) => {
  return address.slice(0, 6) + '...' + address.slice(-4)
}

const CHAIN_ID_TO_NETWORK: Record<string, string> =  {
  '0': 'Unknown',
  '1': 'Ethereum Mainnet',
  '11155111': 'Sepolia Testnet'
}

const CHAIN_ID_TO_ETHERSCAN_API_URL: Record<string, string> = {
  '1': 'https://api.etherscan.io/api',
  '11155111': 'https://api-sepolia.etherscan.io/api'
} 

const NETWORK_TO_CHAIN_ID: Record<string, string> = {
  'Ethereum Mainnet': '1',
  'Sepolia Testnet': '11155111'
}

const formatUnixTimestampFromSeconds = (timestamp: number) => {
  return new Date(timestamp * 1000).toLocaleString()
}

const formatUnixTimestampFromMilliseconds = (timestamp: number) => {
  return new Date(timestamp).toLocaleString()
}

const secondsToMilliseconds = (seconds: number) => {
  return seconds * 1000
}

const minutesToSeconds = (minutes: number) => {
  return minutes * 60
}

const minutesToMilliseconds = (minutes: number) => {
  return minutes * 60 * 1000
}

const addMinutesToUnixTimestamp = (timestamp: number, minutes: number) => {
  const milliseconds = minutesToMilliseconds(minutes)
  const baseTimestamp = new Date(minutesToMilliseconds(timestamp))
  const newTimestamp = new Date(baseTimestamp.getTime() + milliseconds)
  
  return newTimestamp.getTime()
}

const getLotteryStatus = (lottery: LotteryDocument): LotteryStatus => {
  if (lottery.status === 'open' && lottery.expiration < Date.now()) {
  
    return LotteryStatus.DRAWING
  } else {
    return lottery.status
  }
}

export {
  cn,
  formatAddress,
  CHAIN_ID_TO_NETWORK,
  CHAIN_ID_TO_ETHERSCAN_API_URL,
  NETWORK_TO_CHAIN_ID,
  formatUnixTimestampFromSeconds,
  formatUnixTimestampFromMilliseconds,
  secondsToMilliseconds,
  minutesToSeconds,
  minutesToMilliseconds,
  addMinutesToUnixTimestamp,
  getLotteryStatus
}
