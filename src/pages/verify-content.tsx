import { Layout } from "@/components/layout/Layout";
import { GlassCard } from "@/components/ui/glass-card";
import { GlowButton } from "@/components/ui/glow-button";
import { Input } from "@/components/ui/input";
import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import { UploadCloud, Link as LinkIcon, CheckCircle2, XCircle, ShieldCheck, ExternalLink, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function VerifyContent() {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState<"success" | "failure" | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setResult(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop, 
    maxFiles: 1,
    disabled: isVerifying 
  });

  const handleVerify = () => {
    if (!file && !url) return;
    
    setIsVerifying(true);
    setResult(null);
    
    // Simulate API call
    setTimeout(() => {
      setIsVerifying(false);
      // Randomly simulate success or failure for demo
      setResult(Math.random() > 0.3 ? "success" : "failure");
    }, 2000);
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto py-10 text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
            Verify Content Authenticity
          </h1>
          <p className="text-lg text-gray-400 max-w-xl mx-auto">
             Upload a file or paste a link to check its authenticity against the SIGNET on-chain fingerprint registry.
          </p>
        </motion.div>

        {/* Verification Input Section */}
        <GlassCard className="p-8 space-y-8 border-blue-500/20 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          
          {/* File Upload */}
          <div 
            {...getRootProps()} 
            className={cn(
              "relative group border-2 border-dashed rounded-3xl p-12 text-center cursor-pointer transition-all duration-500 overflow-hidden",
              isDragActive 
                ? "border-blue-500 bg-blue-500/10 shadow-[0_0_30px_rgba(59,130,246,0.2)]" 
                : "border-white/10 hover:border-blue-400/50 hover:bg-blue-900/5 bg-black/20"
            )}
          >
            <input {...getInputProps()} />
            
            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/0 via-blue-500/0 to-blue-500/0 group-hover:from-blue-500/5 group-hover:via-transparent group-hover:to-blue-500/5 transition-all duration-500" />

            <div className="relative z-10 flex flex-col items-center gap-4">
              <div className={cn(
                "w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500",
                file ? "bg-green-500/20 shadow-[0_0_30px_rgba(34,197,94,0.3)]" : "bg-blue-500/10 group-hover:bg-blue-500/20 group-hover:scale-110"
              )}>
                {file ? (
                  <CheckCircle2 className="w-10 h-10 text-green-400" />
                ) : (
                  <UploadCloud className="w-10 h-10 text-blue-400" />
                )}
              </div>
              
              <div className="space-y-2">
                <p className="text-xl font-medium text-white">
                  {file ? file.name : (isDragActive ? "Drop it like it's hot!" : "Drag & drop file here")}
                </p>
                {!file && (
                  <p className="text-sm text-gray-500">Supports JPG, PNG, MP4, PDF (Max 50MB)</p>
                )}
              </div>
            </div>
            
            {/* Bottom Glow Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
          </div>

          {/* Divider */}
          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-white/10"></div>
            <span className="flex-shrink-0 mx-4 text-gray-500 text-sm uppercase tracking-wider">or paste URL</span>
            <div className="flex-grow border-t border-white/10"></div>
          </div>

          {/* URL Input */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
              <LinkIcon className="w-5 h-5" />
            </div>
            <Input 
              placeholder="https://..." 
              value={url}
              onChange={(e) => { setUrl(e.target.value); setFile(null); setResult(null); }}
              className="pl-12 h-14 rounded-xl bg-black/40 border-white/10 text-white focus-visible:ring-blue-500/50 text-lg"
            />
          </div>

          {/* Verify Button */}
          <GlowButton 
            className="w-full h-14 text-lg shadow-[0_0_30px_rgba(100,130,255,0.25)]"
            onClick={handleVerify}
            disabled={(!file && !url) || isVerifying}
            loading={isVerifying}
          >
            {isVerifying ? "Analyzing Content..." : "Verify Authenticity"}
          </GlowButton>
        </GlassCard>

        {/* Results Section */}
        <AnimatePresence mode="wait">
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.5, type: "spring" }}
            >
              {result === "success" ? (
                <GlassCard className="border-green-500/30 shadow-[0_0_50px_rgba(34,197,94,0.2)] overflow-hidden relative">
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-emerald-600" />
                  
                  <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-left p-4">
                    <div className="shrink-0">
                      <div className="w-24 h-24 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                        <ShieldCheck className="w-12 h-12 text-green-400" />
                      </div>
                    </div>
                    
                    <div className="space-y-4 flex-1">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-2xl font-bold text-white">Authentic Content Verified</h3>
                          <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-bold uppercase tracking-wider border border-green-500/30">
                            98% Match
                          </span>
                        </div>
                        <p className="text-gray-400">This content matches a registered fingerprint on the Lisk blockchain.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/10">
                         <div>
                           <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Publisher</p>
                           <div className="flex items-center gap-2">
                             <div className="w-6 h-6 rounded bg-blue-500/20 flex items-center justify-center text-xs font-bold text-blue-400">K</div>
                             <span className="font-medium text-white">Kompas Media Group</span>
                             <CheckCircle2 className="w-4 h-4 text-blue-400" />
                           </div>
                         </div>
                         <div>
                           <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Registered Date</p>
                           <span className="font-mono text-sm text-gray-300">2024-11-20 14:32 UTC</span>
                         </div>
                      </div>

                      <div className="bg-black/40 rounded-xl p-4 border border-white/10 flex items-center justify-between gap-4">
                        <div className="overflow-hidden">
                          <p className="text-xs text-gray-500 mb-1">Transaction Hash</p>
                          <p className="font-mono text-xs text-green-400/80 truncate">0x7f3a2b1c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a</p>
                        </div>
                        <ExternalLink className="w-5 h-5 text-gray-500 hover:text-white cursor-pointer" />
                      </div>
                    </div>
                  </div>
                </GlassCard>
              ) : (
                <GlassCard className="border-red-500/30 shadow-[0_0_50px_rgba(239,68,68,0.2)] overflow-hidden relative">
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 to-orange-600" />
                   <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-left p-4">
                    <div className="shrink-0">
                      <div className="w-24 h-24 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
                        <XCircle className="w-12 h-12 text-red-400" />
                      </div>
                    </div>
                    <div className="space-y-4 flex-1">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">No Match Found</h3>
                        <p className="text-gray-400">
                          This content does not match any registered fingerprint in our database. 
                          It may be unregistered, altered, or synthetic.
                        </p>
                      </div>
                      <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/10">
                        <p className="text-sm text-red-200 flex items-start gap-2">
                          <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" />
                          Exercise caution. Unverified content typically lacks a provenance trail and cannot be authenticated.
                        </p>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </Layout>
  );
}
