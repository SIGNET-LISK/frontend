import { Link } from "wouter";
import { motion } from "framer-motion";
import { GlowButton } from "@/components/ui/glow-button";
import abstractShapes from "@/assets/img/signet-logo.svg";

type LandingNavbarProps = {
  scrolled: boolean;
};

export function LandingNavbar({ scrolled }: LandingNavbarProps) {
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
          <Link href="/dashboard">
            <span className="text-sm font-medium text-gray-400 hover:text-white cursor-pointer transition-colors">
              Dashboard
            </span>
          </Link>
          <GlowButton className="hidden sm:flex">Get Started</GlowButton>
        </div>
      </div>
    </motion.nav>
  );
}

