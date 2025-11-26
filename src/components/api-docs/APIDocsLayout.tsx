import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { GlowButton } from "@/components/ui/glow-button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { TableOfContents } from "./TableOfContents";
import { MobileTableOfContents } from "./MobileTableOfContents";
import abstractShapes from "@/assets/img/signet-logo.svg";
import LiquidEther from "@/components/LiquidEther";

interface APIDocsLayoutProps {
  children: React.ReactNode;
}

export function APIDocsLayout({ children }: APIDocsLayoutProps) {
  const [location] = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location]);

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden font-sans selection:bg-blue-500/30 dark:selection:bg-blue-500/30">
      {/* LiquidEther Background - Full Page Animation */}
      <div
        className="fixed inset-0 pointer-events-none bg-background"
        style={{ zIndex: 0 }}
      >
        <LiquidEther
          colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>

      {/* Overlay gradient for text readability */}
      <div
        className="fixed inset-0 pointer-events-none bg-gradient-to-b from-background/80 via-background/40 to-background/80 dark:from-black/80 dark:via-black/40 dark:to-black/80"
        style={{ zIndex: 1 }}
      />

      {/* Top Navbar - Fixed above sidebar (desktop) */}
      <nav className="hidden lg:block fixed top-0 left-[280px] right-0 z-50 border-b border-white/[0.1] dark:border-white/[0.08] bg-background/50 dark:bg-black/50 backdrop-blur-xl h-20">
        <div className="h-full px-6 flex justify-between items-center">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                <img
                  src={abstractShapes}
                  alt="SIGNET"
                  className="w-full h-full object-cover"
                />
              </div>

              <span className="font-bold text-xl tracking-tight">SIGNET</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <Link href="/">
              <span className="hover:text-foreground transition-colors cursor-pointer">
                Home
              </span>
            </Link>
            <Link href="/verify">
              <span className="hover:text-foreground transition-colors cursor-pointer">
                Verify
              </span>
            </Link>
            <Link href="/dashboard">
              <span className="hover:text-foreground transition-colors cursor-pointer">
                Dashboard
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/dashboard/api">
              <GlowButton className="hidden sm:flex h-9 px-4 text-sm">
                Get API Key
              </GlowButton>
            </Link>
            <ThemeToggle />
            <button
              className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
            >
              {isMobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Desktop Layout: Fixed Sidebar + Content Area */}
      <div className="hidden lg:flex">
        {/* Fixed Sidebar - Independent container */}
        <TableOfContents />

        {/* Content Area - Independent scrollable container */}
        <div
          className="flex-1 ml-[280px] h-screen overflow-y-auto"
          style={{ scrollBehavior: "smooth" }}
        >
          {/* Spacer for navbar */}
          <div className="h-20 flex-shrink-0" />

          {/* Content */}
          <div className="p-6 lg:p-10 pb-20">{children}</div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        {/* Mobile Navbar */}
        <nav className="sticky top-0 left-0 right-0 z-50 border-b border-white/[0.1] dark:border-white/[0.08] bg-background/50 dark:bg-black/50 backdrop-blur-xl h-20">
          <div className="px-6 h-full flex justify-between items-center">
            <Link href="/">
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                  <span className="font-bold text-white">S</span>
                </div>
                <span className="font-bold text-xl tracking-tight">
                  SIGNET{" "}
                  <span className="text-muted-foreground font-normal ml-2 text-sm">
                    API Docs
                  </span>
                </span>
              </div>
            </Link>

            <div className="flex items-center gap-2">
              <ThemeToggle />
            <button
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
            >
              {isMobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
            </div>
          </div>
        </nav>

        {/* Mobile Sidebar */}
        <div
          className={cn(
            "fixed top-20 left-0 h-[calc(100vh-80px)] w-[280px] z-40",
            "transition-transform duration-300 ease-in-out",
            isMobileOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <MobileTableOfContents onItemClick={() => setIsMobileOpen(false)} />
        </div>

        {/* Mobile Overlay */}
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/50 dark:bg-black/50 backdrop-blur-sm z-30"
              onClick={() => setIsMobileOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Mobile Content */}
        <div className="overflow-y-auto" style={{ scrollBehavior: "smooth" }}>
          <div className="p-6 pb-20">{children}</div>
        </div>
      </div>
    </div>
  );
}
