import { BrowserProvider, ethers, JsonRpcSigner } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { generateToken } from "../jwt";

declare global {
    interface Window {
      ethereum?: any;
    }
}

export interface WalletState {
    address: string | null;
    currentChain: number | null;
    signer: JsonRpcSigner | null;
    provider: BrowserProvider | null;
    isAuthenticated: boolean;
}

const useWalletProvider = () => {
    const initialWalletState = {
        address: null,
        currentChain: null,
        signer: null,
        provider: null,
        isAuthenticated: false,
    };
  
    const [state, setState] = useState<WalletState>(initialWalletState);
  
    const connectWallet = useCallback(async () => {
      if (state.isAuthenticated) return;
  
      try {
        const { ethereum } = window

        const provider = new ethers.BrowserProvider(ethereum)
  
        const accounts: string[] = await provider.send("eth_requestAccounts", [])
  
        if (accounts.length > 0) {
          const signer = await provider.getSigner()
          const chain = Number(await (await provider.getNetwork()).chainId)
  
          setState({
            ...state,
            address: accounts[0],
            signer,
            currentChain: chain,
            provider,
            isAuthenticated: true,
          });
  
          console.log('hello: ')
          localStorage.setItem("isConnected", "true")

          const request = await fetch('/api/auth', {
            method: 'POST',
            body: JSON.stringify({ address: accounts[0], chain }),
          })
          const token = await request.json()

          console.log('token', token)
          localStorage.setItem("token", token.token)
        }
      } catch (error) {
        console.error("Error connecting wallet", error)
      }
    }, [state]);
  
    const disconnect = () => {
      setState(initialWalletState)
      localStorage.removeItem("isConnected")
    };
  
    // Check if wallet is connected
    useEffect(() => {
      if (window == null) return;
  
      if (localStorage.hasOwnProperty("isConnected")) {
        connectWallet()
      }
    }, [connectWallet, state.isAuthenticated])
  
    useEffect(() => {
      if (typeof window.ethereum === "undefined") return
  
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        setState({ ...state, address: accounts[0] })
      })
  
      window.ethereum.on("networkChanged", (network: string) => {
        setState({ ...state, currentChain: Number(network) })
      })
  
      return () => {
        window.ethereum.removeAllListeners()
      };
    }, [state])
  
    return {
      connectWallet,
      disconnect,
      state,
    }
}

export default useWalletProvider
  