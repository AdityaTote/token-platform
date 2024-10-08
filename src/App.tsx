import React from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import "@solana/wallet-adapter-react-ui/styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TokenLanchPad } from "@/pages/TokenLanchPad";
import HerosPage from "./pages/HerosPage";
import WalletOpration from "./pages/WalletOpration";

function App() {
  const endpoint = clusterApiUrl("devnet");
  const wallets = [new PhantomWalletAdapter()];

  return (
    <div className="text-slate-300">
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <BrowserRouter>
              <Routes>
                <Route index element={<HerosPage />} />
                <Route path="/create-token" element={<TokenLanchPad />} />
                <Route path="/wallet-interact" element={<WalletOpration />} />
              </Routes>
            </BrowserRouter>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  );
}

export default App;