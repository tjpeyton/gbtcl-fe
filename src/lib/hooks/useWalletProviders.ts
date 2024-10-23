import { BrowserProvider, ethers, JsonRpcSigner } from "ethers";
import { useCallback, useEffect, useState } from "react";

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
  
          localStorage.setItem("isConnected", "true")
        }
      } catch {
        console.error("Error connecting wallet")
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
  