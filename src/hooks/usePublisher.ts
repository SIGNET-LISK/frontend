import { useAccount, useReadContract } from "wagmi";
import { CONTRACT_ADDRESS } from "@/lib/wagmi";

const CONTRACT_ABI = [
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "authorizedPublishers",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

export function usePublisher() {
  const { address, isConnected } = useAccount();

  // Check if address is authorized publisher
  const { data: isPublisher, isLoading: isLoadingPublisher } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "authorizedPublishers",
    args: address ? [address] : undefined,
    query: {
      enabled: isConnected && !!address,
    },
  });

  // Check if address is owner
  const { data: owner } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "owner",
    query: {
      enabled: isConnected,
    },
  });

  const isOwner =
    isConnected &&
    owner &&
    address &&
    address.toLowerCase() === (owner as string).toLowerCase();

  return {
    isPublisher: isPublisher as boolean | undefined,
    isOwner: isOwner as boolean,
    isLoading: isLoadingPublisher,
    isConnected,
    address,
  };
}

