import { createAppKit } from "@reown/appkit/react";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { defineChain } from "viem";

// Get the project ID from environment variables
const projectId =
  import.meta.env.VITE_PROJECT_ID || "de217164330f177c24db00e46b038f35";

// Define Lisk Sepolia Testnet
const liskSepolia = defineChain({
  id: 4202,
  name: "Lisk Sepolia",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH",
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.sepolia-api.lisk.com"],
    },
  },
  blockExplorers: {
    default: {
      name: "Lisk Sepolia BlockScout",
      url: "https://sepolia-blockscout.lisk.com",
    },
  },
  testnet: true,
  // Add icon URL to prevent Web3Modal from trying to fetch undefined assets
  iconUrl: "https://avatars.githubusercontent.com/u/26967284?s=200&v=4", // Lisk official logo
});

// Create a metadata object - this is used for the wallet connection modal
const metadata = {
  name: "SIGNET",
  description:
    "AI-powered, blockchain-backed platform to authenticate digital content",
  url: "https://signet.app", // optional
  icons: ["https://signet.app/logo.png"], // optional
};

// Create the Wagmi Adapter - only Lisk Sepolia
const wagmiAdapter = new WagmiAdapter({
  networks: [liskSepolia],
  projectId,
});

// Get the wagmi config from the adapter
export const wagmiConfig = wagmiAdapter.wagmiConfig;

// Create the AppKit instance - only Lisk Sepolia
export const appKit = createAppKit({
  adapters: [wagmiAdapter],
  networks: [liskSepolia],
  projectId,
  metadata,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
  },
  themeMode: "dark",
  themeVariables: {
    "--w3m-accent": "#5227FF",
  },
});

// Contract address - read from environment variable or use default
// This should point to the NEW SignetRegistry address (gasless transaction enabled)
// Make sure to set VITE_CONTRACT_ADDRESS in your .env file
export const CONTRACT_ADDRESS = (import.meta.env.VITE_CONTRACT_ADDRESS ||
  "0xe13c070791672Bf02e7Fc0C68FBB8b0EF7a547C0") as `0x${string}`;
