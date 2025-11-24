import { Layout } from "@/components/layout/Layout";
import { GlassCard } from "@/components/ui/glass-card";
import { GlowButton } from "@/components/ui/glow-button";
import { useDropzone } from "react-dropzone";
import { useCallback, useState, useEffect } from "react";
import { UploadCloud, File, CheckCircle2, AlertCircle, Image, FileText, Video, Hash, ServerOff } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { uploadFile } from "@/lib/api";
import { CONTRACT_ADDRESS } from "@/lib/wagmi";
import { usePublisher } from "@/hooks/usePublisher";
import { useLocation } from "wouter";

const CONTRACT_ABI = [
  {
    inputs: [
      { internalType: "string", name: "_pHash", type: "string" },
      { internalType: "string", name: "_title", type: "string" },
      { internalType: "string", name: "_desc", type: "string" },
    ],
    name: "registerContent",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export default function RegisterContent() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pHash, setPHash] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<1 | 2>(1); // 1: upload, 2: register
  const [, setLocation] = useLocation();
  
  const { isConnected } = useAccount();
  const { isPublisher, isLoading: isLoadingPublisher } = usePublisher();
  
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

  // Redirect if not publisher
  useEffect(() => {
    if (!isLoadingPublisher && (!isConnected || !isPublisher)) {
      setLocation("/");
    }
  }, [isConnected, isPublisher, isLoadingPublisher, setLocation]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setStep(1);
      setPHash("");
      setError(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, maxFiles: 1 });

  const handleUpload = async () => {
    if (!file || !title || !description) {
      setError("Please fill all fields");
      return;
    }

    if (!isConnected) {
      setError("Please connect your wallet first");
      return;
    }

    setError(null);
    try {
      const data = await uploadFile(file, title, description);
      setPHash(data.p_hash);
      setStep(2);
    } catch (err: any) {
      const errorMessage = err.message || err.response?.data?.detail || "Upload failed";
      setError(errorMessage);
    }
  };

  const handleRegister = () => {
    if (!pHash || !isConnected) {
      setError("Please connect your wallet first");
      return;
    }

    if (!title || !description) {
      setError("Title and description are required");
      return;
    }

    setError(null);
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "registerContent",
      args: [pHash, title, description],
    });
  };

  // Reset on success
  useEffect(() => {
    if (isConfirmed) {
      setFile(null);
      setTitle("");
      setDescription("");
      setPHash("");
      setStep(1);
    }
  }, [isConfirmed]);

  if (isLoadingPublisher) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-center">
            <p className="text-gray-400">Loading...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!isConnected || !isPublisher) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-center space-y-4">
            <AlertCircle className="w-16 h-16 text-red-400 mx-auto" />
            <h2 className="text-2xl font-bold text-white">Access Denied</h2>
            <p className="text-gray-400">
              You need to connect your wallet and be registered as a publisher to access this page.
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  if (isConfirmed) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center space-y-6 max-w-md"
          >
            <div className="w-24 h-24 mx-auto rounded-full bg-green-500/20 flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(34,197,94,0.3)]">
              <CheckCircle2 className="w-12 h-12 text-green-400" />
            </div>
            <h2 className="text-3xl font-bold text-white">Registration Successful!</h2>
            <p className="text-gray-400">
              Your content has been successfully hashed and registered on the Lisk blockchain.
            </p>
            <div className="bg-black/30 p-4 rounded-xl border border-white/10 font-mono text-xs text-gray-400 break-all">
              TX: {hash}
            </div>
            <GlowButton onClick={() => { setFile(null); setTitle(""); setDescription(""); setPHash(""); setStep(1); }}>
              Register Another
            </GlowButton>
          </motion.div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-white">Register Content</h2>
        <p className="text-gray-400 mt-1">Upload assets to generate a perceptual hash and anchor it to the blockchain.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          {/* File Uploader */}
          <div 
            {...getRootProps()} 
            className={`
              border-2 border-dashed rounded-3xl p-10 text-center cursor-pointer transition-all duration-300
              ${isDragActive 
                ? "border-blue-500 bg-blue-500/10 shadow-[0_0_30px_rgba(59,130,246,0.2)]" 
                : "border-white/10 hover:border-white/20 hover:bg-white/5 bg-white/[0.02]"
              }
            `}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center">
                <UploadCloud className="w-8 h-8 text-blue-400" />
              </div>
              <div>
                <p className="text-lg font-medium text-white">
                  {isDragActive ? "Drop file here" : "Drag & drop file or click to browse"}
                </p>
                <p className="text-sm text-gray-500 mt-1">Supports JPG, PNG, PDF (Max 50MB)</p>
              </div>
            </div>
          </div>

          {/* Metadata Form */}
          <GlassCard>
            <h3 className="text-lg font-semibold text-white mb-6">Metadata</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-gray-400">Content Title</Label>
                <Input 
                  placeholder="e.g. Q3 Financial Report" 
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-600"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-400">Description</Label>
                <Textarea 
                  placeholder="Brief description of the content..." 
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 min-h-[100px]"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              {step === 1 && (
                <GlowButton 
                  className="w-full py-3" 
                  onClick={handleUpload}
                  disabled={!file || !title || !description}
                >
                  Generate Hash
                </GlowButton>
              )}
            </div>
          </GlassCard>
        </div>

        <div className="space-y-6">
          {/* Preview & Hash */}
          <AnimatePresence mode="wait">
            {file ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <GlassCard className="border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.1)]">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <File className="w-5 h-5 text-blue-400" />
                    Selected File
                  </h3>
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-black/40 border border-white/10">
                    <div className="w-12 h-12 rounded bg-white/10 flex items-center justify-center text-xs font-bold text-gray-400 uppercase">
                      {file.name.split('.').pop()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium truncate">{file.name}</p>
                      <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setFile(null); }}
                      className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white"
                    >
                      <AlertCircle className="w-5 h-5" />
                    </button>
                  </div>

                  {step === 2 && pHash && (
                    <>
                      <div className="mt-6 pt-6 border-t border-white/10 space-y-4">
                        <div>
                          <Label className="text-xs uppercase tracking-wider text-gray-500 mb-2 block">Generated Perceptual Hash (pHash)</Label>
                          <div className="font-mono text-sm text-blue-300 bg-blue-500/10 border border-blue-500/20 p-3 rounded-lg break-all">
                            {pHash}
                          </div>
                        </div>
                        <div className="flex items-start gap-3 text-sm text-gray-400 bg-white/5 p-3 rounded-lg">
                          <AlertCircle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                          <p>This hash acts as a unique digital fingerprint. Changing even one pixel of the source file will result in a completely different hash.</p>
                        </div>
                      </div>
                    </>
                  )}
                </GlassCard>

                {error && (
                  <Alert variant="destructive" className="bg-red-500/10 border-red-500/20">
                    <ServerOff className="h-4 w-4" />
                    <AlertTitle className="text-red-400">Error</AlertTitle>
                    <AlertDescription className="text-red-300 text-sm mt-1">
                      {error}
                    </AlertDescription>
                  </Alert>
                )}

                {writeError && (
                  <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-red-400 text-sm">
                    {(writeError as any)?.shortMessage || writeError?.message || "Transaction failed"}
                  </div>
                )}

                {step === 2 && pHash && (
                  <GlowButton 
                    className="w-full py-4 text-lg shadow-[0_0_40px_rgba(100,130,255,0.3)]" 
                    onClick={handleRegister}
                    loading={isPendingTx || isConfirming}
                  >
                    {isConfirming ? "Confirming Transaction..." : isPendingTx ? "Waiting for Wallet..." : "Register to Lisk Blockchain"}
                  </GlowButton>
                )}
              </motion.div>
            ) : (
              <GlassCard className="h-[300px] flex flex-col items-center justify-center text-center text-gray-500 border-dashed">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                   <File className="w-8 h-8 opacity-30" />
                </div>
                <p>Select a file to view preview and generate hash</p>
              </GlassCard>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Layout>
  );
}
