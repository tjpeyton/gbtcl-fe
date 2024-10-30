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
  "1": "Ethereum",
  "11155111": "Sepolia"
}

