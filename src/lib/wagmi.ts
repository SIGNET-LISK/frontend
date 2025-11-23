import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { defineChain } from 'viem'

// Get the project ID from environment variables
const projectId = import.meta.env.VITE_PROJECT_ID || 'de217164330f177c24db00e46b038f35'

// Define Lisk Sepolia Testnet
const liskSepolia = defineChain({
  id: 4202,
  name: 'Lisk Sepolia',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.sepolia-api.lisk.com'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Lisk Sepolia BlockScout',
      url: 'https://sepolia-blockscout.lisk.com',
    },
  },
  testnet: true,
})

// Create a metadata object - this is used for the wallet connection modal
const metadata = {
  name: 'SIGNET',
  description: 'AI-powered, blockchain-backed platform to authenticate digital content',
  url: 'https://signet.app', // optional
  icons: ['https://signet.app/logo.png'] // optional
}

// Create the Wagmi Adapter - only Lisk Sepolia
const wagmiAdapter = new WagmiAdapter({
  networks: [liskSepolia],
  projectId
})

// Get the wagmi config from the adapter
export const wagmiConfig = wagmiAdapter.wagmiConfig

// Create the AppKit instance - only Lisk Sepolia
export const appKit = createAppKit({
  adapters: [wagmiAdapter],
  networks: [liskSepolia],
  projectId,
  metadata,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
  },
  themeMode: 'dark',
  themeVariables: {
    '--w3m-accent': '#5227FF',
  }
})

