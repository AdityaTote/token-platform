import React, { useState } from "react";
import {
  createAssociatedTokenAccountInstruction,
  createInitializeMetadataPointerInstruction,
  createInitializeMintInstruction,
  createMintToInstruction,
  ExtensionType,
  getAssociatedTokenAddressSync,
  getMintLen,
  LENGTH_SIZE,
  TOKEN_2022_PROGRAM_ID,
  TYPE_SIZE,
} from "@solana/spl-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { createInitializeInstruction, pack } from "@solana/spl-token-metadata";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NavBar } from "@/components/NavBar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function TokenLanchPad() {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [initialSupply, setInitialSupply] = useState("");
  const [imgURL, setImgURL] = useState("");
  const [decimals, setDecimals] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "success" | "error" | "incomplete"
  >("idle");
  console.log(wallet.wallets[0]);
  const handleTokenCreation = async () => {
    setIsLoading(true);
    setStatus("idle");

    // Check if all fields are filled
    if (!name || !symbol || !initialSupply || !imgURL || !decimals) {
      setStatus("incomplete");
      setIsLoading(false);
      return;
    }

    try {
      const mintKeypair = Keypair.generate();

      const metadata = {
        mint: mintKeypair.publicKey,
        name: name,
        symbol: symbol,
        uri: imgURL,
        additionalMetadata: [],
      };

      const mintLen = getMintLen([ExtensionType.MetadataPointer]);

      const metaDataLen: number =
        TYPE_SIZE + LENGTH_SIZE + pack(metadata).length;

      const lamport = await connection.getMinimumBalanceForRentExemption(
        mintLen + metaDataLen
      );

      const transaction1 = new Transaction().add(
        SystemProgram.createAccount({
          fromPubkey: wallet.publicKey as PublicKey,
          newAccountPubkey: mintKeypair.publicKey,
          space: mintLen,
          lamports: lamport,
          programId: TOKEN_2022_PROGRAM_ID,
        }),
        createInitializeMetadataPointerInstruction(
          mintKeypair.publicKey,
          wallet.publicKey,
          mintKeypair.publicKey,
          TOKEN_2022_PROGRAM_ID
        ),
        createInitializeMintInstruction(
          mintKeypair.publicKey,
          Number(decimals),
          wallet.publicKey as PublicKey,
          null,
          TOKEN_2022_PROGRAM_ID
        ),
        createInitializeInstruction({
          programId: TOKEN_2022_PROGRAM_ID,
          mint: mintKeypair.publicKey,
          metadata: mintKeypair.publicKey,
          name: metadata.name,
          symbol: metadata.symbol,
          uri: metadata.uri,
          mintAuthority: wallet.publicKey as PublicKey,
          updateAuthority: wallet.publicKey as PublicKey,
        })
      );

      transaction1.feePayer = wallet.publicKey as PublicKey;
      transaction1.recentBlockhash = (
        await connection.getLatestBlockhash()
      ).blockhash;
      transaction1.partialSign(mintKeypair);

      await wallet.sendTransaction(transaction1, connection);

      const associatedToken = getAssociatedTokenAddressSync(
        mintKeypair.publicKey,
        wallet.publicKey as PublicKey,
        false,
        TOKEN_2022_PROGRAM_ID
      );
      const transaction2 = new Transaction().add(
        createAssociatedTokenAccountInstruction(
          wallet.publicKey as PublicKey,
          associatedToken,
          wallet.publicKey as PublicKey,
          mintKeypair.publicKey,
          TOKEN_2022_PROGRAM_ID
        )
      );

      await wallet.sendTransaction(transaction2, connection);

      const transaction3 = new Transaction().add(
        createMintToInstruction(
          mintKeypair.publicKey,
          associatedToken,
          wallet.publicKey as PublicKey,
          BigInt(initialSupply),
          [],
          TOKEN_2022_PROGRAM_ID
        )
      );

      await wallet.sendTransaction(transaction3, connection);

      setName("");
      setSymbol("");
      setInitialSupply("");
      setImgURL("");
      setDecimals("");
      setStatus("success");
    } catch (error: unknown) {
      console.error(error);
      setStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
  <NavBar />
  <div className="mt-4"> {/* Add margin-top to push content below NavBar */}
  <div className="text-lg text-slate-300 px-6 my-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/wallet-interact">Wallet Operation</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

    <div className="flex flex-col items-center justify-center min-h-screen -my-24">
      <h1 className="text-4xl font-bold my-8 text-center">
        Solana TokenLanchpad
      </h1>
      <div className="w-full max-w-md space-y-4">
        <Input
          type="text"
          placeholder="Name of Token"
          className="w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Symbol of Token"
          className="w-full"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Initial Supply"
          className="w-full"
          value={initialSupply}
          onChange={(e) => setInitialSupply(e.target.value)}
        />
        <Input
          type="text"
          placeholder="ImageURL"
          className="w-full"
          value={imgURL}
          onChange={(e) => setImgURL(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Decimals"
          className="w-full"
          value={decimals}
          onChange={(e) => setDecimals(e.target.value)}
        />
      </div>
      <Button
        className="mt-8"
        onClick={handleTokenCreation}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating Token...
          </>
        ) : (
          "Create Token"
        )}
      </Button>
      <AnimatePresence>
        {status !== "idle" && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`mt-4 p-4 rounded-md ${
              status === "success"
                ? "bg-green-500"
                : status === "error"
                ? "bg-red-500"
                : "bg-yellow-500"
            }`}
          >
            {status === "success" ? (
              <div className="flex items-center">
                <CheckCircle className="mr-2" />
                Token created successfully!
              </div>
            ) : status === "error" ? (
              <div className="flex items-center">
                <XCircle className="mr-2" />
                Failed to create token. Please try again.
              </div>
            ) : (
              <div className="flex items-center">
                <AlertCircle className="mr-2" />
                Please fill in all fields before creating the token.
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </div>
</div>
  );
}
