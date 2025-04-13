
const weiToEther = (wei: string): number => {
  return Number(wei) / 10 ** 18
}

const weiToGwei = (wei: string): number => {
  return Number(wei) / 10 ** 9
} 

const formatEther = (ether: number): string => {
  return ether.toFixed(2) + ' ETH'  
}

const formatGwei = (gwei: number): string => {
  return gwei.toFixed(2) + ' Gwei'
}

const formatWei = (wei: number): string => {
  return wei.toFixed(2) + ' Wei'
}

export { 
  weiToEther, 
  weiToGwei,
  formatEther,
  formatGwei,
  formatWei
}
