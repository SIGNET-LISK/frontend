import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { GlowButton } from "@/components/ui/glow-button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { VerifyHero } from "@/components/verify/VerifyHero";
import { VerifyInput } from "@/components/verify/VerifyInput";
import { VerifyResult } from "@/components/verify/VerifyResult";
import { VerifyLoading } from "@/components/verify/VerifyLoading";
import LiquidEther from "@/components/LiquidEther";
import abstractShapes from "@/assets/img/signet-logo.svg";

type VerificationResult = {
  status: "verified" | "near-match" | "unverified" | "manipulation";
  similarity: number;
  hammingDistance?: number;
  publisher?: {
    name: string;
    wallet: string;
    verified: boolean;
  };
  metadata?: {
    title: string;
    description: string;
    dateRegistered: string;
    contentType: string;
  };
  blockchainProof?: {
    txHash: string;
    blockHeight: string;
    timestamp: string;
    contractId: string;
  };
  similarContent?: Array<{
    title: string;
    similarity: number;
    publisher: string;
    txHash: string;
  }>;
};

export default function VerifyContent() {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);

  const handleVerify = () => {
    if (!file && !url) return;

    setIsVerifying(true);
    setResult(null);

    // Simulate API call
    setTimeout(() => {
      setIsVerifying(false);
      // Simulate different results for demo
      const rand = Math.random();
      if (rand > 0.6) {
        // Verified
        setResult({
          status: "verified",
          similarity: 98,
          hammingDistance: 2,
          publisher: {
            name: "Kompas Media Group",
            wallet: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
            verified: true,
          },
          metadata: {
            title: "Breaking News: Technology Update",
            description: "Official press release regarding latest technology developments",
            dateRegistered: "2024-11-20 14:32:15 UTC",
            contentType: "Image/JPEG",
          },
          blockchainProof: {
            txHash: "0x7f3a2b1c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b",
            blockHeight: "1,234,567",
            timestamp: "2024-11-20 14:32:15 UTC",
            contractId: "0xSignetContract...",
          },
        });
      } else if (rand > 0.4) {
        // Near match
        setResult({
          status: "near-match",
          similarity: 87,
          hammingDistance: 8,
          publisher: {
            name: "BBC News",
            wallet: "0x8ba1f109551bD432803012645Hac136c22C9e",
            verified: true,
          },
          metadata: {
            title: "News Article Image",
            description: "Cover image for news article",
            dateRegistered: "2024-11-19 10:15:30 UTC",
            contentType: "Image/PNG",
          },
          blockchainProof: {
            txHash: "0x3a9f1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a",
            blockHeight: "1,234,520",
            timestamp: "2024-11-19 10:15:30 UTC",
            contractId: "0xSignetContract...",
          },
          similarContent: [
            {
              title: "Related News Image",
              similarity: 85,
              publisher: "BBC News",
              txHash: "0x2b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b",
            },
          ],
        });
      } else if (rand > 0.2) {
        // Manipulation
        setResult({
          status: "manipulation",
          similarity: 45,
          hammingDistance: 32,
          similarContent: [
            {
              title: "Original Content",
              similarity: 92,
              publisher: "Reuters",
              txHash: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b",
            },
          ],
        });
      } else {
        // Unverified
        setResult({
          status: "unverified",
          similarity: 0,
        });
      }
    }, 2500);
  };

  const handleReset = () => {
    setFile(null);
    setUrl("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden font-sans selection:bg-blue-500/30 dark:selection:bg-blue-500/30">
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

      {/* Navbar */}
      <motion.nav
        className="fixed top-4 left-4 right-4 z-50 rounded-full border border-white/[0.1] dark:border-white/[0.08] bg-background/30 dark:bg-black/30 backdrop-blur-[12px] shadow-[0_8px_32px_rgba(0,0,0,0.15)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)]">
              <img src={abstractShapes} alt="SIGNET" className="w-full h-full object-cover" />
            </div>
            <span className="font-bold text-xl tracking-tight">SIGNET</span>
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/">
              <GlowButton variant="secondary" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </GlowButton>
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main className="relative z-10 pt-32 pb-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <VerifyHero />

          <VerifyInput
            file={file}
            url={url}
            isVerifying={isVerifying}
            onFileChange={setFile}
            onUrlChange={setUrl}
          />

          {/* Verify Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <GlowButton
              className="w-full h-14 text-lg shadow-[0_0_30px_rgba(100,130,255,0.25)]"
              onClick={handleVerify}
              disabled={(!file && !url) || isVerifying}
              loading={isVerifying}
            >
              {isVerifying ? (
                <>
                  <ShieldCheck className="w-5 h-5 mr-2" />
                  Analyzing Content...
                </>
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5 mr-2" />
                  Verify Authenticity
                </>
              )}
            </GlowButton>
          </motion.div>

          {/* Loading State */}
          <AnimatePresence mode="wait">
            {isVerifying && <VerifyLoading />}
          </AnimatePresence>

          {/* Results */}
          <AnimatePresence mode="wait">
            {result && !isVerifying && (
              <motion.div
                key="result"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
              >
                <VerifyResult result={result} />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-6 flex justify-center"
                >
                  <GlowButton variant="secondary" onClick={handleReset}>
                    Verify Another Content
                  </GlowButton>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
