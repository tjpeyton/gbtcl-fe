'use client'

import { createContext, ReactNode, useContext } from "react";

import useWalletProvider, { WalletState } from "@/lib/hooks/useWalletProviders";


export interface WalletContext {
    connectWallet: () => Promise<any>;
    disconnect: () => void;
    state: WalletState;
}
  
const WalletContext = createContext<WalletContext | null>(null);
  
type Props = {
    children: ReactNode;
};


const WalletContextProvider = ({ children }: Props) => {
    const { connectWallet, disconnect, state } = useWalletProvider();

    return (
        <WalletContext.Provider
            value={{
                connectWallet,
                disconnect,
                state,
            }}
        >
            {children}
        </WalletContext.Provider>
  );
}

export default WalletContextProvider;

export const useWalletContext = () => useContext(WalletContext);    
