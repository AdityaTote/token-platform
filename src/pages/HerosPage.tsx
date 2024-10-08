import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useWallet } from "@solana/wallet-adapter-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"

export default function HerosPage() {
  const { connected } = useWallet()

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <main className="flex-1 flex items-center justify-center">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                Solana Token Platform
              </h1>
              <p className="max-w-[600px] text-zinc-400 md:text-xl lg:text-2xl">
                Create, manage, and interact with Solana tokens effortlessly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {connected ? (
                  <>
                    <Link to="/create-token">
                      <Button variant="default" size="lg" className="w-full sm:w-auto">
                        Create Token
                      </Button>
                    </Link>
                    <Link to="/wallet-interact">
                      <Button variant="default" size="lg" className="w-full sm:w-auto">
                        Interact with Wallet
                      </Button>
                    </Link>
                  </>
                ) : (
                  <WalletMultiButton />
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}