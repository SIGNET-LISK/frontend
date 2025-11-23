import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  UploadCloud,
  FileText,
  Key,
  Users,
  ShieldAlert,
  Activity,
  LogOut,
  Menu,
  X,
  ArrowLeft,
  Copy,
  Wallet,
  Building2,
  FileCheck,
  Zap,
  Server,
  Eye,
  Settings,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAccount, useDisconnect } from "wagmi";
import generatedImage from "@/assets/img/dark_futuristic_background_with_swirling_blue_and_orange_lights.png";
import abstractShapes from "@/assets/img/signet-logo.svg";

// Helper function to format address
const formatAddress = (address: string) => {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Register Content", icon: UploadCloud, href: "/dashboard/upload" },
  { label: "My Contents", icon: FileCheck, href: "/dashboard/contents" },
  { label: "API Usage", icon: Zap, href: "/dashboard/api" },
];

const ADMIN_ITEMS = [
  {
    label: "Manage Publishers",
    icon: Building2,
    href: "/dashboard/admin/publishers",
  },
  { label: "Content Review", icon: Eye, href: "/dashboard/admin/review" },
  { label: "System Monitor", icon: Server, href: "/dashboard/admin/monitor" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-black text-white font-sans selection:bg-blue-500/30 relative overflow-hidden">
      {/* Interactive Background Layer */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.4 }}
        transition={{ duration: 1.5 }}
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `url(${generatedImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Overlay Gradients for depth */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-black/80 via-black/40 to-black/80 pointer-events-none" />
      <div className="fixed inset-0 z-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,0,0,0)_0%,rgba(0,0,0,1)_100%)] pointer-events-none" />

      {/* Animated gradient orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Mobile Nav Toggle */}
      <div className="md:hidden fixed top-4 right-4 z-50">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 rounded-full bg-white/[0.08] backdrop-blur-[8px] border border-white/[0.08] hover:bg-white/[0.12] transition-colors"
        >
          {isMobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {(isMobileOpen || window.innerWidth >= 768) && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", damping: 20 }}
            className={cn(
              "fixed md:sticky top-0 h-screen w-[280px] flex flex-col p-6 z-40",
              "bg-black/30 md:bg-black/20 border-r border-white/[0.08] backdrop-blur-[8px]",
              isMobileOpen ? "bg-black/90 backdrop-blur-[12px]" : ""
            )}
          >
            <div className="mb-10 flex items-center gap-3 px-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                <img
                  src={abstractShapes}
                  alt="SIGNET"
                  className="w-full h-full object-cover"
                />
              </div>

              <span className="font-bold text-xl tracking-tight">SIGNET</span>
            </div>

            <nav className="flex-1 space-y-8">
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-2">
                  Publisher
                </p>
                <ul className="space-y-2">
                  {NAV_ITEMS.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href}>
                        <div
                          className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 cursor-pointer group relative overflow-hidden",
                            location === item.href
                              ? "text-white border border-white/[0.15] bg-white/[0.05] shadow-[0_0_20px_rgba(100,130,255,0.12)]"
                              : "text-gray-400 hover:text-white hover:bg-white/[0.03]"
                          )}
                        >
                          {location === item.href && (
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/[0.15] to-purple-500/[0.15] opacity-100" />
                          )}
                          <item.icon
                            className={cn(
                              "w-5 h-5 transition-colors relative z-10",
                              location === item.href
                                ? "text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.8)]"
                                : "text-gray-500 group-hover:text-white"
                            )}
                          />
                          <span className="font-medium relative z-10">
                            {item.label}
                          </span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-2">
                  Admin
                </p>
                <ul className="space-y-2">
                  {ADMIN_ITEMS.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href}>
                        <div
                          className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 cursor-pointer group relative overflow-hidden",
                            location === item.href
                              ? "text-white border border-white/[0.15] bg-white/[0.05] shadow-[0_0_20px_rgba(255,100,100,0.12)]"
                              : "text-gray-400 hover:text-white hover:bg-white/[0.03]"
                          )}
                        >
                          {location === item.href && (
                            <div className="absolute inset-0 bg-gradient-to-r from-red-500/[0.15] to-orange-500/[0.15] opacity-100" />
                          )}
                          <item.icon
                            className={cn(
                              "w-5 h-5 transition-colors relative z-10",
                              location === item.href
                                ? "text-red-400 drop-shadow-[0_0_8px_rgba(248,113,113,0.8)]"
                                : "text-gray-500 group-hover:text-white"
                            )}
                          />
                          <span className="font-medium relative z-10">
                            {item.label}
                          </span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>

            <div className="mt-auto pt-6 border-t border-white/[0.08] space-y-3">
              {isConnected && address && (
                <div className="px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                  <div className="flex items-center gap-2 mb-2">
                    <Wallet className="w-4 h-4 text-blue-400" />
                    <span className="text-xs text-gray-400">
                      Wallet Address
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-mono text-white font-medium">
                      {formatAddress(address)}
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
              )}
              <Link href="/">
                <div className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-gray-400 hover:text-white hover:bg-blue-500/[0.08] transition-colors group border border-transparent hover:border-blue-500/[0.15] cursor-pointer">
                  <ArrowLeft className="w-5 h-5 group-hover:text-blue-400 transition-colors" />
                  <span className="font-medium">Back to Landing</span>
                </div>
              </Link>
              <button
                onClick={() => disconnect()}
                className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-gray-400 hover:text-white hover:bg-red-500/[0.08] transition-colors group border border-transparent hover:border-red-500/[0.15]"
              >
                <LogOut className="w-5 h-5 group-hover:text-red-400 transition-colors" />
                <span className="font-medium">Disconnect Wallet</span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto min-h-screen relative z-10">
        <div className="max-w-6xl mx-auto space-y-8 pb-10">{children}</div>
      </main>
    </div>
  );
}
