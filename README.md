# 🪙 Solana Token Platform

A comprehensive web application for creating and managing SPL tokens on the Solana blockchain. Built with React, TypeScript, and the Solana Web3.js SDK, this platform provides an intuitive interface for token creation, wallet operations, and blockchain interactions.

## ✨ Features

### 🎯 Token Creation (Token Launchpad)

- Create SPL tokens with Token-2022 program
- Configure token metadata (name, symbol, decimals)
- Set initial supply and token image URI
- Automatic metadata pointer initialization
- Associated token account creation
- Real-time transaction status feedback

### 💼 Wallet Operations

- **Balance Management**: View and refresh SOL balance
- **Airdrop Functionality**: Request SOL airdrops on devnet
- **Send Transactions**: Transfer SOL to any Solana address
- **Message Signing**: Sign and verify messages with ed25519 cryptography
- Toast notifications for all operations

### 🔗 Blockchain Integration

- Connected to Solana Devnet
- Phantom Wallet support
- Automatic wallet connection handling
- Real-time transaction confirmations

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Phantom Wallet browser extension

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd token-platform
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📦 Project Structure

```
token-platform/
├── src/
│   ├── components/
│   │   ├── NavBar.tsx          # Navigation component
│   │   └── ui/                 # Reusable UI components (shadcn/ui)
│   ├── pages/
│   │   ├── HerosPage.tsx       # Landing page
│   │   ├── TokenLanchPad.tsx   # Token creation interface
│   │   └── WalletOpration.tsx  # Wallet operations interface
│   ├── hooks/
│   │   └── use-toast.ts        # Toast notification hook
│   ├── lib/
│   │   └── utils.ts            # Utility functions
│   ├── App.tsx                 # Main app component with routing
│   └── main.tsx                # Application entry point
├── public/                     # Static assets
└── package.json
```

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with shadcn/ui components
- **Blockchain**:
  - @solana/web3.js
  - @solana/spl-token
  - @solana/wallet-adapter-react
- **Animations**: Framer Motion
- **Routing**: React Router DOM
- **Icons**: Lucide React & Radix UI Icons
- **Notifications**: React Toastify

## 📖 Usage

### Creating a Token

1. Connect your Phantom wallet
2. Navigate to "Create Token" from the home page
3. Fill in the token details:
   - Token Name
   - Token Symbol
   - Initial Supply
   - Image URL
   - Decimals
4. Click "Create Token" and approve the transaction in your wallet
5. Wait for transaction confirmation

### Wallet Operations

1. Connect your Phantom wallet
2. Navigate to "Interact with Wallet"
3. Available operations:
   - **View Balance**: Click "Refresh Balance" to see your current SOL balance
   - **Request Airdrop**: Enter amount and request devnet SOL
   - **Send Transaction**: Enter recipient address and amount to transfer SOL
   - **Sign Message**: Enter a message to sign it with your wallet

## 🔧 Development

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

## 🌐 Network Configuration

Currently configured to use Solana **Devnet**. To change the network, modify the endpoint in `App.tsx`:

```typescript
const endpoint = clusterApiUrl("devnet"); // Change to "mainnet-beta" or "testnet"
```

## 📝 Key Dependencies

- `@solana/web3.js`: Solana blockchain interaction
- `@solana/spl-token`: SPL token program utilities
- `@solana/wallet-adapter-react`: Wallet integration
- `@noble/curves`: Cryptographic operations
- `framer-motion`: Animations and transitions
- `react-router-dom`: Client-side routing

## 🔐 Security Notes

- Always verify transaction details before signing
- Never share your private keys or seed phrases
- This application is configured for devnet - use caution when switching to mainnet
- Review all transaction parameters before approval

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🐛 Known Issues

- Token creation requires sufficient SOL for rent exemption
- Airdrop functionality is limited to devnet
- Message signing requires wallet adapter support

## 📞 Support

For issues, questions, or contributions, please open an issue in the repository.

---

Built with ❤️ using Solana and React
