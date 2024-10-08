import React from "react";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";

export const NavBar: React.FC = () => {
  return (
        <nav className="flex items-center justify-between py-4">
          <div className="flex-none">
            <WalletMultiButton className="w-full sm:w-auto" />
          </div>
          <div className="flex-none ml-auto">
            <WalletDisconnectButton className="w-full sm:w-auto" />
          </div>
        </nav>
  );
};