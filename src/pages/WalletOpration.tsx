import { useState, useEffect } from "react";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { ed25519 } from "@noble/curves/ed25519";

import { NavBar } from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

function WalletOpration() {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [balance, setBalance] = useState("0");
  const [airdropAmount, setAirdropAmount] = useState("0");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [transactionAmount, setTransactionAmount] = useState("0");
  const [messageToSign, setMessageToSign] = useState("");

  useEffect(() => {
    if (wallet.connecting) {
      toast.info("Connecting wallet...", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    if (!wallet.connecting && !wallet.connected) {
      toast.error("Please connect your wallet to use this functionality", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
  }, [wallet.connecting, wallet.connected]);

  const handleRefreshBalance = async () => {
    try {
      if (!wallet.connected) return;
      // Implement balance refresh logic here
      if (wallet.publicKey) {
        const lamports = await connection.getBalance(wallet.publicKey);
        const balance = lamports / LAMPORTS_PER_SOL;
        setBalance(balance.toString());
      } else {
        toast.error("Wallet public key is not available", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error: any) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleAirdrop = async () => {
    if (!wallet.connected) return;
    // Implement airdrop logic here
    try {
      if (wallet.publicKey) {
        const intAmount: number = Number(airdropAmount);
        const response = await connection.requestAirdrop(
          wallet.publicKey,
          intAmount * LAMPORTS_PER_SOL
        );
        if (response) {
          toast.success("Airdrop request sent successfully", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setAirdropAmount("0");
          setTimeout(() => {
            handleRefreshBalance();
          }, 2000);
        } else {
          toast.error("Airdrop request failed", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      } else {
        toast.error("Wallet public key is not available", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error: any) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleSendTransaction = async () => {
    if (!wallet.connected) return;
    // Implement send transaction logic here
    try {
      if (wallet.publicKey) {
        const transaction = new Transaction().add(
          SystemProgram.transfer({
            fromPubkey: wallet.publicKey,
            toPubkey: new PublicKey(recipientAddress),
            lamports: Number(transactionAmount) * LAMPORTS_PER_SOL,
          })
        );

        const response = await wallet.sendTransaction(transaction, connection);

        if (response) {
          toast.success("Transaction sent successfully", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setRecipientAddress("");
          setTransactionAmount("0");
          setTimeout(() => {
            handleRefreshBalance();
          }, 2000);
        } else {
          toast.error("Transaction failed", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      } else {
        toast.error("Wallet public key is not available", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error: any) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleSignMessage = async () => {
    if (!wallet.connected) return;
    // Implement sign message logic here
    try {
      if (wallet.publicKey && wallet.signMessage) {
        const encodedMessage = new TextEncoder().encode(messageToSign);
        const response = await wallet.signMessage(encodedMessage);
        if (response) {
          if (ed25519.verify(response, encodedMessage, wallet.publicKey.toBytes())) {
            console.log(response);
            toast.success("Message signed successfully", {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setMessageToSign("");
          } else {
            toast.error("Message signing failed", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        } else {
          toast.error("Message signing failed", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      } else {
        toast.error("Wallet public key is not available", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error: any) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <NavBar />
      <div className="text-lg text-slate-300 px-6 my-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/wallet-interact">
                Wallet Operation
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <ToastContainer />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-white">
          Wallet Operations
        </h1>

        {!wallet.connected ? (
          <div className="text-center">
            <p className="text-white mb-4">
              Please connect your wallet to use this functionality
            </p>
            <WalletMultiButton />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-zinc-950 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Wallet Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold text-white">
                  {balance} SOL
                </p>
                <Button
                  className="mt-4 bg-white text-black hover:bg-gray-200"
                  onClick={handleRefreshBalance}
                >
                  Refresh Balance
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-zinc-950 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Airdrop SOL</CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  className="mb-4 bg-zinc-900 text-white"
                  placeholder="SOL"
                  value={airdropAmount}
                  onChange={(e) => setAirdropAmount(e.target.value)}
                />
                <Button
                  className="w-full bg-white text-black hover:bg-gray-200"
                  onClick={handleAirdrop}
                >
                  Request Airdrop
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-zinc-950 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Send Transaction</CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  className="mb-4 bg-zinc-900 text-white"
                  placeholder="Recipient Address"
                  value={recipientAddress}
                  onChange={(e) => setRecipientAddress(e.target.value)}
                />
                <Input
                  className="mb-4 bg-zinc-900 text-white"
                  placeholder="Amount (SOL)"
                  type="text"
                  value={transactionAmount}
                  onChange={(e) => setTransactionAmount(e.target.value)}
                />
                <Button
                  className="w-full bg-white text-black hover:bg-gray-200"
                  onClick={handleSendTransaction}
                >
                  Send SOL
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-zinc-950 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Sign Message</CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  className="mb-4 bg-zinc-900 text-white"
                  placeholder="Enter message to sign"
                  value={messageToSign}
                  onChange={(e) => setMessageToSign(e.target.value)}
                />
                <Button
                  className="w-full bg-white text-black hover:bg-gray-200"
                  onClick={handleSignMessage}
                >
                  Sign Message
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

export default WalletOpration;
