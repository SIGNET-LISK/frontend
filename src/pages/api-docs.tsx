import { GlassCard } from "@/components/ui/glass-card";
import { CodeBlockGlass } from "@/components/ui/code-block-glass";
import { Hash, ShieldCheck, Globe, Server, Menu, X } from "lucide-react";
import { Link } from "wouter";
import { GlowButton } from "@/components/ui/glow-button";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import generatedImage from '@/assets/img/dark_futuristic_background_with_swirling_blue_and_orange_lights.png';

const SECTIONS = [
  { id: "introduction", label: "Introduction" },
  { id: "authentication", label: "Authentication" },
  { id: "verify-endpoint", label: "Verify Content" },
  { id: "register-endpoint", label: "Register Content" },
  { id: "publisher-endpoint", label: "Get Publisher" },
  { id: "rate-limits", label: "Rate Limits" },
  { id: "sdk-js", label: "JavaScript SDK" },
  { id: "errors", label: "Error Codes" },
];

export default function APIDocs() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden font-sans selection:bg-blue-500/30 flex flex-col">
      
      {/* Background Layers (Copied from Layout/Landing to match style) */}
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.4 }}
        transition={{ duration: 1.5 }}
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `url(${generatedImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-black/80 via-black/50 to-black/80 pointer-events-none" />
      <div className="fixed inset-0 z-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,0,0,0)_0%,rgba(0,0,0,1)_100%)] pointer-events-none" />

      {/* Top Navbar (Like Landing Page) */}
      <nav className="sticky top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/50 backdrop-blur-xl h-20 flex-shrink-0">
        <div className="max-w-7xl mx-auto px-6 h-full flex justify-between items-center">
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                <span className="font-bold text-white">S</span>
              </div>
            <span className="font-bold text-xl tracking-tight">SIGNET <span className="text-gray-500 font-normal ml-2 text-sm">API Docs</span></span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <Link href="/"><span className="hover:text-white transition-colors cursor-pointer">Home</span></Link>
            <Link href="/verify"><span className="hover:text-white transition-colors cursor-pointer">Verification</span></Link>
            <Link href="/dashboard"><span className="hover:text-white transition-colors cursor-pointer">Dashboard</span></Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/dashboard/api">
              <GlowButton className="hidden sm:flex h-9 px-4 text-sm">Get API Key</GlowButton>
            </Link>
            <button 
              className="md:hidden p-2 text-gray-400 hover:text-white"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
            >
              {isMobileOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      <div className="flex-1 flex flex-col lg:flex-row max-w-7xl mx-auto w-full relative z-10">
        
        {/* Sidebar Navigation */}
        <AnimatePresence>
          {(isMobileOpen || window.innerWidth >= 1024) && (
            <motion.aside 
              initial={{ x: -280, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -280, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className={cn(
                "fixed lg:sticky top-20 lg:top-20 h-[calc(100vh-80px)] w-[280px] flex flex-col p-6 z-40 overflow-y-auto custom-scrollbar bg-black/80 lg:bg-transparent backdrop-blur-xl lg:backdrop-blur-none border-r border-white/10 lg:border-none",
                !isMobileOpen && "hidden lg:flex"
              )}
            >
              <div className="space-y-1">
                <h3 className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-6 px-3">Table of Contents</h3>
                {SECTIONS.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className="w-full text-left px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all border-l-2 border-transparent hover:border-blue-500"
                  >
                    {section.label}
                  </button>
                ))}
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-10 pb-20 space-y-16 lg:ml-0">
          
          {/* Introduction */}
          <section id="introduction" className="space-y-6 pt-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">SIGNET API Documentation</h1>
              <p className="text-xl text-gray-400 leading-relaxed max-w-3xl">
                Integrate trust and authenticity verification directly into your applications. 
                SIGNET provides powerful APIs to authenticate media, verify digital content, 
                and interact with the on-chain fingerprint registry.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-200 text-sm flex items-center gap-2">
                <Globe className="w-4 h-4" />
                REST API
              </div>
              <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-200 text-sm flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                On-Chain Verify
              </div>
              <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-200 text-sm flex items-center gap-2">
                <Server className="w-4 h-4" />
                99.9% Uptime
              </div>
            </div>
          </section>

          <div className="w-full h-px bg-white/5" />

          {/* Authentication */}
          <section id="authentication" className="space-y-6 scroll-mt-24">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center">
                <Hash className="w-4 h-4" />
              </div>
              Authentication
            </h2>
            <p className="text-gray-400">
              All API requests must be authenticated using a Bearer Token. 
              You can obtain your API key from the <Link href="/dashboard/api" className="text-blue-400 hover:underline">Developer Dashboard</Link>.
            </p>
            
            <GlassCard className="p-0 overflow-hidden bg-black/20">
              <CodeBlockGlass 
                title="JavaScript Example"
                code={`const res = await fetch("https://api.signet.com/v1/verify", {
  headers: { 
    "Authorization": "Bearer sk_live_51Mx...92zA",
    "Content-Type": "application/json"
  }
});`}
              />
            </GlassCard>
          </section>

          <div className="w-full h-px bg-white/5" />

          {/* Verify Endpoint */}
          <section id="verify-endpoint" className="space-y-6 scroll-mt-24">
            <div className="flex items-baseline gap-3">
              <span className="px-2 py-1 rounded text-xs font-bold bg-green-500/20 text-green-400 border border-green-500/30">POST</span>
              <h2 className="text-2xl font-bold text-white">/api/verify</h2>
            </div>
            <p className="text-gray-400">
              Check if a given media file or URL matches a registered on-chain fingerprint. 
              The API calculates the perceptual hash and queries the Lisk blockchain registry.
            </p>

            <GlassCard>
              <h4 className="text-sm font-semibold text-gray-300 mb-4 uppercase tracking-wider">Request Parameters</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="font-mono text-blue-300">file</span>
                  <span className="text-gray-500">Binary (Multipart)</span>
                  <span className="text-gray-400 text-right w-1/2">The media file to verify (max 50MB).</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="font-mono text-blue-300">url</span>
                  <span className="text-gray-500">String</span>
                  <span className="text-gray-400 text-right w-1/2">Alternatively, provide a direct URL to the media.</span>
                </div>
              </div>
            </GlassCard>

            <CodeBlockGlass 
              title="Response Example"
              code={`{
  "match": true,
  "similarity_score": 98.5,
  "content": {
    "id": "cnt_8f7a2b3c",
    "title": "Press Release Q3",
    "registered_at": "2024-11-20T14:30:00Z",
    "publisher": {
      "name": "TechCorp Inc.",
      "verified": true
    }
  },
  "blockchain_proof": {
    "network": "Lisk L2",
    "tx_hash": "0x7f3a...2b1c",
    "block_height": 12849302
  }
}`}
            />
          </section>

          <div className="w-full h-px bg-white/5" />

          {/* Register Endpoint */}
          <section id="register-endpoint" className="space-y-6 scroll-mt-24">
             <div className="flex items-baseline gap-3">
              <span className="px-2 py-1 rounded text-xs font-bold bg-green-500/20 text-green-400 border border-green-500/30">POST</span>
              <h2 className="text-2xl font-bold text-white">/api/register</h2>
            </div>
            <p className="text-gray-400">
              Register a new content fingerprint on-chain. Requires Publisher-level permissions.
            </p>
            <CodeBlockGlass 
              title="Request Body"
              code={`{
  "title": "Breaking News Clip",
  "description": "Original source footage from event...",
  "content_hash": "ph:a1b2c3d4e5f6..." // Optional if sending file
}`}
            />
          </section>

          <div className="w-full h-px bg-white/5" />

          {/* Rate Limits */}
          <section id="rate-limits" className="space-y-6 scroll-mt-24">
            <h2 className="text-2xl font-bold text-white">Rate Limits</h2>
            <p className="text-gray-400">API rate limits are applied per API key based on your subscription plan.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <GlassCard className="text-center p-6">
                <h4 className="text-gray-400 mb-2">Free</h4>
                <p className="text-2xl font-bold text-white">100 <span className="text-sm font-normal text-gray-500">/ min</span></p>
              </GlassCard>
              <GlassCard className="text-center p-6 border-blue-500/30">
                <h4 className="text-blue-300 mb-2">Pro</h4>
                <p className="text-2xl font-bold text-white">1,000 <span className="text-sm font-normal text-gray-500">/ min</span></p>
              </GlassCard>
              <GlassCard className="text-center p-6">
                <h4 className="text-purple-300 mb-2">Enterprise</h4>
                <p className="text-2xl font-bold text-white">Unlimited</p>
              </GlassCard>
            </div>
          </section>

          <div className="w-full h-px bg-white/5" />

          {/* Error Codes */}
          <section id="errors" className="space-y-6 scroll-mt-24">
             <h2 className="text-2xl font-bold text-white">Error Codes</h2>
             <GlassCard className="p-0 overflow-hidden">
               <table className="w-full text-left text-sm">
                 <thead className="bg-white/5 text-gray-400 uppercase tracking-wider border-b border-white/5">
                   <tr>
                     <th className="p-4 font-medium">Code</th>
                     <th className="p-4 font-medium">Message</th>
                     <th className="p-4 font-medium">Description</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-white/5">
                   <tr>
                     <td className="p-4 font-mono text-red-300">401</td>
                     <td className="p-4 text-white">Unauthorized</td>
                     <td className="p-4 text-gray-500">Invalid or missing API Key.</td>
                   </tr>
                   <tr>
                     <td className="p-4 font-mono text-yellow-300">429</td>
                     <td className="p-4 text-white">Too Many Requests</td>
                     <td className="p-4 text-gray-500">You have exceeded your rate limit.</td>
                   </tr>
                   <tr>
                     <td className="p-4 font-mono text-orange-300">422</td>
                     <td className="p-4 text-white">Unprocessable Entity</td>
                     <td className="p-4 text-gray-500">The file format is not supported or corrupted.</td>
                   </tr>
                   <tr>
                     <td className="p-4 font-mono text-red-300">500</td>
                     <td className="p-4 text-white">Server Error</td>
                     <td className="p-4 text-gray-500">Unexpected internal blockchain error.</td>
                   </tr>
                 </tbody>
               </table>
             </GlassCard>
          </section>

        </div>
      </div>
    </div>
  );
}
