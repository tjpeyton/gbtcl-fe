import { CHAIN_ID_TO_ETHERSCAN_API_URL } from "./utils"

export type EtherscanResponse = {
    status: string
    message: string
    result: string
}

export const validateContract = async (chainId: string, address: string) => {
    try {
        const ETHERSCAN_API_URL = CHAIN_ID_TO_ETHERSCAN_API_URL[chainId]

        const response = await fetch(
            ETHERSCAN_API_URL + 
            `?module=contract&action=getabi&` +         
            `address=${address}&` +
            `apikey=${process.env.ETHERSCAN_API_KEY}`
        )       

        return await response.json()
    } catch (error) {
        throw new Error('Failed to validate contract')
    }
}
