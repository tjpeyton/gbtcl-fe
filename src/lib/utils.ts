export const formatBalance = (rawBalance: string) => {
  const balance = (parseInt(rawBalance) / 1000000000000000000).toFixed(2)
  return balance
}
    
export const formatChainAsNum = (chainIdHex: string) => {
  const chainIdNum = parseInt(chainIdHex)
  return chainIdNum
}
    
export const formatAddress = (addr: string) => {
//   const upperAfterLastTwo = addr.slice(0, 2) + addr.slice(2)
//   return `${upperAfterLastTwo.substring(0, 5)}...${upperAfterLastTwo.substring(39)}`
  return `${addr.slice(0, 6)}...${addr.slice(-6)}`;
}

export const CHAIN_ID_TO_NETWORK: { [key: number]: string } = {
  0: 'Unknown',
  1: 'Ethereum Mainnet',
  42: 'Ethereum Kovan',
  137: 'Polygon Mainnet',
  8453: 'Base Mainnet',
  11155111: 'Sepolia'
}
