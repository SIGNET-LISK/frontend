import { Layout } from "@/components/layout/Layout";
import { GlassCard } from "@/components/ui/glass-card";
import { GlowButton } from "@/components/ui/glow-button";
import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import { UploadCloud, File, CheckCircle2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function RegisterContent() {
  const [file, setFile] = useState<File | null>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, maxFiles: 1 });

  const handleRegister = () => {
    setIsRegistering(true);
    // Simulate blockchain interaction
    setTimeout(() => {
      setIsRegistering(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
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
              TX: 0x8f3a2b1c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e
            </div>
            <GlowButton onClick={() => { setIsSuccess(false); setFile(null); }}>
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
                <Input placeholder="e.g. Q3 Financial Report" className="bg-white/5 border-white/10 text-white placeholder:text-gray-600" />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-400">Description</Label>
                <Textarea placeholder="Brief description of the content..." className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 min-h-[100px]" />
              </div>
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

                  <div className="mt-6 pt-6 border-t border-white/10 space-y-4">
                     <div>
                        <Label className="text-xs uppercase tracking-wider text-gray-500 mb-2 block">Generated Perceptual Hash (pHash)</Label>
                        <div className="font-mono text-sm text-blue-300 bg-blue-500/10 border border-blue-500/20 p-3 rounded-lg break-all">
                          ph:9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08
                        </div>
                     </div>
                     <div className="flex items-start gap-3 text-sm text-gray-400 bg-white/5 p-3 rounded-lg">
                        <AlertCircle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                        <p>This hash acts as a unique digital fingerprint. Changing even one pixel of the source file will result in a completely different hash.</p>
                     </div>
                  </div>
                </GlassCard>

                <GlowButton 
                  className="w-full py-4 text-lg shadow-[0_0_40px_rgba(100,130,255,0.3)]" 
                  onClick={handleRegister}
                  loading={isRegistering}
                >
                  {isRegistering ? "Registering to Blockchain..." : "Register to Lisk Blockchain"}
                </GlowButton>
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
