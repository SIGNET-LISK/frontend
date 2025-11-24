import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { GlowButton } from "@/components/ui/glow-button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ArrowLeft, ShieldCheck, ServerOff } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { VerifyHero } from "@/components/verify/VerifyHero";
import { VerifyInput } from "@/components/verify/VerifyInput";
import { VerifyResult } from "@/components/verify/VerifyResult";
import { VerifyLoading } from "@/components/verify/VerifyLoading";
import LiquidEther from "@/components/LiquidEther";
import abstractShapes from "@/assets/img/signet-logo.svg";
import { verifyContent } from "@/lib/api";

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

  const handleVerify = async () => {
    if (!file && !url) return;

    setIsVerifying(true);
    setResult(null);

    try {
      // For now, only support file upload (URL support can be added later)
      if (!file) {
        setResult({
          status: "unverified",
          similarity: 0,
        });
        setIsVerifying(false);
        return;
      }

      const response = await verifyContent(file);
      
      // Map backend response to frontend format
      // Backend returns: { verified: boolean, distance: number, threshold: number, content: {...} }
      if (response?.verified) {
        // Calculate similarity percentage (lower distance = higher similarity)
        const similarity = Math.max(0, Math.min(100, 100 - (response.distance / response.threshold) * 100));
        
        // Determine status based on distance
        let status: "verified" | "near-match" = "verified";
        if (response.distance > 5 && response.distance <= response.threshold) {
          status = "near-match";
        }
        
        setResult({
          status: status,
          similarity: similarity,
          hammingDistance: response.distance,
          publisher: response.content ? {
            name: "Publisher",
            wallet: response.content.publisher,
            verified: true,
          } : undefined,
          metadata: response.content ? {
            title: response.content.title,
            description: response.content.description,
            dateRegistered: new Date(response.content.timestamp * 1000).toISOString(),
            contentType: file.type || "Unknown",
          } : undefined,
        });
      } else {
        setResult({
          status: "unverified",
          similarity: 0,
          hammingDistance: response.distance,
        });
      }
    } catch (error: any) {
      // Handle error - show user-friendly message
      const errorMessage = error.message || "Verification failed";
      
      // Set result with error flag
      setResult({
        status: "unverified",
        similarity: 0,
        hammingDistance: undefined, // Flag untuk indicate error
        error: errorMessage,
      });
    } finally {
      setIsVerifying(false);
    }
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

          {/* Backend Error Alert */}
          {result && (result as any).error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Alert variant="destructive" className="bg-red-500/10 border-red-500/20">
                <ServerOff className="h-4 w-4" />
                <AlertTitle className="text-red-400">Backend Server Error</AlertTitle>
                <AlertDescription className="text-red-300 text-sm mt-1">
                  {(result as any).error || "Unable to connect to the backend server. Please make sure the backend is running at http://localhost:3000"}
                </AlertDescription>
              </Alert>
            </motion.div>
          )}

          {/* Results */}
          <AnimatePresence mode="wait">
            {result && !isVerifying && !(result as any).error && (
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
