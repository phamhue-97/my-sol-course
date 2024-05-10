'use client'
import { useMemo } from "react";
import * as web3 from "@solana/web3.js";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
    WalletModalProvider,
    WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
// Default styles that can be overridden by your app
import "@solana/wallet-adapter-react-ui/styles.css";

import Balance from "./Components/Balance";

export default function Home() {
  const endpoint = web3.clusterApiUrl("devnet");
  const wallets = useMemo(() => [], []);

  return (
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets}>
            <WalletModalProvider>
                <WalletMultiButton />
                <Balance />
            </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
  );
}
