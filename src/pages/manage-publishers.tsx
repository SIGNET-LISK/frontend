import { Layout } from "@/components/layout/Layout";
import { GlassCard } from "@/components/ui/glass-card";
import { GlowButton } from "@/components/ui/glow-button";
import { Building2, Plus, Search, CheckCircle2, XCircle, MoreVertical, Wallet, Calendar, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract } from "wagmi";
import { CONTRACT_ADDRESS } from "@/lib/wagmi";
import { usePublisher } from "@/hooks/usePublisher";
import { useLocation } from "wouter";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const CONTRACT_ABI = [
  {
    inputs: [{ internalType: "address", name: "_clientWallet", type: "address" }],
    name: "addPublisher",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "authorizedPublishers",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

const MOCK_PUBLISHERS = [
  { 
    id: 1, 
    wallet: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb", 
    name: "Tech News Media", 
    status: "active", 
    registered: "2024-01-15",
    contents: 124,
    verified: true
  },
  { 
    id: 2, 
    wallet: "0x8ba1f109551bD432803012645Hac136c22C9e", 
    name: "Financial Times", 
    status: "active", 
    registered: "2024-02-20",
    contents: 89,
    verified: true
  },
  { 
    id: 3, 
    wallet: "0x3f5CE1FBbF3f28E2B5C8F5B8F5B8F5B8F5B8F5B8", 
    name: "Global News Network", 
    status: "banned", 
    registered: "2023-12-10",
    contents: 45,
    verified: false
  },
  { 
    id: 4, 
    wallet: "0x9f8f5B8F5B8F5B8F5B8F5B8F5B8F5B8F5B8F5B8", 
    name: "Digital Media Corp", 
    status: "active", 
    registered: "2024-03-05",
    contents: 203,
    verified: true
  },
];

const formatAddress = (address: string) => {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export default function ManagePublishers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [newPublisherAddress, setNewPublisherAddress] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [, setLocation] = useLocation();
  const { isConnected } = useAccount();
  const { isOwner, isLoading: isLoadingOwner } = usePublisher();

  // Write contract hook
  const {
    writeContract,
    data: hash,
    isPending: isPendingTx,
    error: writeError,
  } = useWriteContract();

  // Wait for transaction
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  // Redirect if not owner
  useEffect(() => {
    if (!isLoadingOwner && (!isConnected || !isOwner)) {
      setLocation("/");
    }
  }, [isConnected, isOwner, isLoadingOwner, setLocation]);

  // Reset form on success
  useEffect(() => {
    if (isConfirmed) {
      setNewPublisherAddress("");
      setIsDialogOpen(false);
    }
  }, [isConfirmed]);

  const handleAddPublisher = () => {
    if (!newPublisherAddress || !newPublisherAddress.startsWith("0x")) {
      return;
    }

    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "addPublisher",
      args: [newPublisherAddress as `0x${string}`],
    });
  };

  if (isLoadingOwner) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-[60vh]">
          <p className="text-gray-400">Loading...</p>
        </div>
      </Layout>
    );
  }

  if (!isConnected || !isOwner) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-center space-y-4">
            <AlertCircle className="w-16 h-16 text-red-400 mx-auto" />
            <h2 className="text-2xl font-bold text-white">Access Denied</h2>
            <p className="text-gray-400">
              Only the contract owner can access this page.
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <motion.header 
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-red-200 to-orange-200 bg-clip-text text-transparent">
            Manage Publishers
          </h2>
          <p className="text-gray-400 mt-1">Whitelist and manage publisher access to the SIGNET platform.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <GlowButton className="gap-2">
              <Plus className="w-4 h-4" />
              Add Publisher
            </GlowButton>
          </DialogTrigger>
          <DialogContent className="bg-background/95 backdrop-blur-xl border-white/10">
            <DialogHeader>
              <DialogTitle className="text-white">Add New Publisher</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-gray-400">Wallet Address</Label>
                <Input
                  placeholder="0x..."
                  value={newPublisherAddress}
                  onChange={(e) => setNewPublisherAddress(e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 font-mono"
                />
              </div>
              {writeError && (
                <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg text-red-400 text-sm">
                  {(writeError as any)?.shortMessage || writeError?.message || "Transaction failed"}
                </div>
              )}
              <GlowButton
                className="w-full"
                onClick={handleAddPublisher}
                loading={isPendingTx || isConfirming}
                disabled={!newPublisherAddress || !newPublisherAddress.startsWith("0x")}
              >
                {isConfirming ? "Confirming..." : isPendingTx ? "Waiting for Wallet..." : "Add Publisher"}
              </GlowButton>
              {isConfirmed && (
                <div className="bg-green-500/10 border border-green-500/20 p-3 rounded-lg text-green-400 text-sm">
                  Publisher added successfully! Transaction: {hash}
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </motion.header>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <GlassCard className="relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
              <Building2 className="w-24 h-24" />
            </div>
            <div className="relative z-10">
              <div className="p-3 w-fit rounded-xl bg-blue-500/[0.15] border border-blue-500/[0.2] text-blue-400 mb-4">
                <Building2 className="w-6 h-6" />
              </div>
              <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">Total Publishers</p>
              <h3 className="text-4xl font-bold text-white mt-1">156</h3>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <GlassCard className="relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
              <CheckCircle2 className="w-24 h-24" />
            </div>
            <div className="relative z-10">
              <div className="p-3 w-fit rounded-xl bg-green-500/[0.15] border border-green-500/[0.2] text-green-400 mb-4">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">Active</p>
              <h3 className="text-4xl font-bold text-white mt-1">142</h3>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <GlassCard className="relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
              <XCircle className="w-24 h-24" />
            </div>
            <div className="relative z-10">
              <div className="p-3 w-fit rounded-xl bg-red-500/[0.15] border border-red-500/[0.2] text-red-400 mb-4">
                <XCircle className="w-6 h-6" />
              </div>
              <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">Banned</p>
              <h3 className="text-4xl font-bold text-white mt-1">14</h3>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <GlassCard className="relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
              <Wallet className="w-24 h-24" />
            </div>
            <div className="relative z-10">
              <div className="p-3 w-fit rounded-xl bg-purple-500/[0.15] border border-purple-500/[0.2] text-purple-400 mb-4">
                <Wallet className="w-6 h-6" />
              </div>
              <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">Pending</p>
              <h3 className="text-4xl font-bold text-white mt-1">8</h3>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Search & Filter */}
      <GlassCard className="mb-6">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search by wallet address or publisher name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-600"
            />
          </div>
        </div>
      </GlassCard>

      {/* Publishers Table */}
      <GlassCard className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-500 border-b border-white/5 text-sm uppercase tracking-wider bg-white/[0.02]">
                <th className="p-6 font-medium">Publisher</th>
                <th className="p-6 font-medium">Wallet Address</th>
                <th className="p-6 font-medium">Status</th>
                <th className="p-6 font-medium">Contents</th>
                <th className="p-6 font-medium">Registered</th>
                <th className="p-6 font-medium w-10"></th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {MOCK_PUBLISHERS.map((publisher) => (
                <tr key={publisher.id} className="group hover:bg-white/5 transition-colors border-b border-white/5 last:border-0">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center border border-blue-500/30">
                        <Building2 className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium text-white">{publisher.name}</p>
                        {publisher.verified && (
                          <span className="text-xs text-green-400 flex items-center gap-1 mt-1">
                            <CheckCircle2 className="w-3 h-3" />
                            Verified
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2 font-mono text-gray-300">
                      <Wallet className="w-4 h-4 text-gray-500" />
                      {formatAddress(publisher.wallet)}
                    </div>
                  </td>
                  <td className="p-6">
                    {publisher.status === "active" ? (
                      <span className="px-3 py-1 rounded-full bg-green-500/[0.08] backdrop-blur-[4px] text-green-400 text-xs border border-green-500/[0.15]">
                        Active
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full bg-red-500/[0.08] backdrop-blur-[4px] text-red-400 text-xs border border-red-500/[0.15]">
                        Banned
                      </span>
                    )}
                  </td>
                  <td className="p-6">
                    <span className="text-white font-medium">{publisher.contents}</span>
                    <span className="text-gray-500 ml-1">items</span>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Calendar className="w-4 h-4" />
                      {publisher.registered}
                    </div>
                  </td>
                  <td className="p-6">
                    <button className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </Layout>
  );
}

