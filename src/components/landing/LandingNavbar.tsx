import { Link } from "wouter";
import { motion } from "framer-motion";
import { GlowButton } from "@/components/ui/glow-button";
import { GlassCard } from "@/components/ui/glass-card";
import { useAccount, useDisconnect } from "wagmi";
import { useAppKit } from "@reown/appkit/react";
import { Copy, LogOut } from "lucide-react";
import { useState } from "react";
import abstractShapes from "@/assets/img/signet-logo.svg";

type LandingNavbarProps = {
  scrolled: boolean;
};

// Helper function to format address
const formatAddress = (address: string) => {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export function LandingNavbar({ scrolled }: LandingNavbarProps) {
  const { isConnected, address } = useAccount();
  const { open } = useAppKit();
  const { disconnect } = useDisconnect();
  const [copied, setCopied] = useState(false);

  const handleConnectWallet = () => {
    if (isConnected) {
      disconnect();
    } else {
      open();
    }
  };

  const handleCopyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.nav
      className={`fixed top-4 left-4 right-4 z-50 rounded-full transition-all duration-300 ${
        scrolled
          ? "border border-white/[0.08] bg-black/30 backdrop-blur-[12px] shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
          : "border border-white/[0.05] bg-black/20 backdrop-blur-[8px] shadow-[0_4px_24px_rgba(0,0,0,0.3)]"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)]">
            <img src={abstractShapes} alt="SIGNET" className="w-full h-full object-cover" />
          </div>
          <span className="font-bold text-xl tracking-tight">SIGNET</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <a href="#features" className="hover:text-white transition-colors">
            Features
          </a>
          <a href="#pricing" className="hover:text-white transition-colors">
            Pricing
          </a>
          <Link href="/verify">
            <span className="hover:text-white transition-colors cursor-pointer">Verify</span>
          </Link>
          <Link href="/docs">
            <span className="hover:text-white transition-colors cursor-pointer">API Docs</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {isConnected && (
            <>
              <Link href="/dashboard">
                <span className="text-sm font-medium text-gray-400 hover:text-white cursor-pointer transition-colors">
                  Dashboard
                </span>
              </Link>
              {/* Wallet Address Display */}
              <GlassCard className="px-4 py-2 border-white/[0.08]">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400">Wallet</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-white font-mono">
                        {formatAddress(address || "")}
                      </span>
                      <button
                        onClick={handleCopyAddress}
                        className="p-1 hover:bg-white/[0.05] rounded transition-colors group"
                        title="Copy address"
                      >
                        <Copy className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={disconnect}
                    className="p-2 hover:bg-red-500/[0.1] rounded-lg transition-colors group border border-transparent hover:border-red-500/[0.2]"
                    title="Disconnect"
                  >
                    <LogOut className="w-4 h-4 text-gray-400 group-hover:text-red-400 transition-colors" />
                  </button>
                </div>
              </GlassCard>
            </>
          )}
          {!isConnected && (
            <GlowButton 
              className="hidden sm:flex" 
              onClick={handleConnectWallet}
            >
              Connect Wallet
            </GlowButton>
          )}
        </div>
      </div>
    </motion.nav>
  );
}

