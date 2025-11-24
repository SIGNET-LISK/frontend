import { GlassCard } from "@/components/ui/glass-card";
import {
  ShieldCheck,
  XCircle,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  Building2,
  Wallet,
  Calendar,
  Hash,
  FileText,
  Copy,
  Link2,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

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

type VerifyResultProps = {
  result: VerificationResult;
};

const formatAddress = (address: string) => {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export function VerifyResult({ result }: VerifyResultProps) {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const getStatusConfig = () => {
    switch (result.status) {
      case "verified":
        return {
          icon: ShieldCheck,
          title: "Verified — Exact Match",
          description: "This content matches a registered fingerprint on the Lisk blockchain.",
          glow: "shadow-[0_0_50px_rgba(34,197,94,0.3)]",
          border: "border-green-500/30",
          gradient: "from-green-400 to-emerald-600",
          iconBg: "bg-green-500/10",
          iconBorder: "border-green-500/30",
          iconColor: "text-green-400",
          badgeBg: "bg-green-500/20",
          badgeBorder: "border-green-500/30",
          badgeText: "text-green-400",
        };
      case "near-match":
        return {
          icon: AlertTriangle,
          title: "Verified — Near Match (High Similarity)",
          description: "This content is highly similar to a registered fingerprint. Minor differences detected.",
          glow: "shadow-[0_0_50px_rgba(234,179,8,0.3)]",
          border: "border-yellow-500/30",
          gradient: "from-yellow-400 to-orange-600",
          iconBg: "bg-yellow-500/10",
          iconBorder: "border-yellow-500/30",
          iconColor: "text-yellow-400",
          badgeBg: "bg-yellow-500/20",
          badgeBorder: "border-yellow-500/30",
          badgeText: "text-yellow-400",
        };
      case "manipulation":
        return {
          icon: AlertTriangle,
          title: "Potential Manipulation Detected",
          description: "Similar structure detected but significant differences found. Content may have been altered.",
          glow: "shadow-[0_0_50px_rgba(249,115,22,0.3)]",
          border: "border-orange-500/30",
          gradient: "from-orange-400 to-red-600",
          iconBg: "bg-orange-500/10",
          iconBorder: "border-orange-500/30",
          iconColor: "text-orange-400",
          badgeBg: "bg-orange-500/20",
          badgeBorder: "border-orange-500/30",
          badgeText: "text-orange-400",
        };
      default:
        return {
          icon: XCircle,
          title: "Unverified — No Record Found",
          description: "This content does not match any registered fingerprint in our database.",
          glow: "shadow-[0_0_50px_rgba(239,68,68,0.3)]",
          border: "border-red-500/30",
          gradient: "from-red-500 to-orange-600",
          iconBg: "bg-red-500/10",
          iconBorder: "border-red-500/30",
          iconColor: "text-red-400",
          badgeBg: "bg-red-500/20",
          badgeBorder: "border-red-500/30",
          badgeText: "text-red-400",
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, type: "spring" }}
    >
      <GlassCard
        className={`${config.border} ${config.glow} overflow-hidden relative`}
      >
        {/* Top status bar */}
        <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${config.gradient}`} />

        <div className="p-8 space-y-8">
          {/* Status Header */}
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="shrink-0">
              <div
                className={`w-24 h-24 rounded-full ${config.iconBg} flex items-center justify-center border-2 ${config.iconBorder} ${config.glow}`}
              >
                <Icon className={`w-12 h-12 ${config.iconColor}`} />
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                    {config.title}
                  </h3>
                  {result.similarity > 0 && (
                    <span
                      className={`px-4 py-1.5 rounded-full ${config.badgeBg} ${config.badgeText} text-sm font-bold uppercase tracking-wider border ${config.badgeBorder}`}
                    >
                      {result.similarity}% Match
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground text-lg">{config.description}</p>
              </div>

              {/* Similarity Score */}
              {(result.similarity > 0 || result.hammingDistance !== undefined) && (
                <div className="flex flex-wrap gap-4 pt-4 border-t border-white/[0.1] dark:border-white/[0.08]">
                  {result.similarity > 0 && (
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-blue-500/10 dark:bg-blue-500/10 border border-blue-500/20 dark:border-blue-500/20">
                        <CheckCircle2 className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">Similarity</p>
                        <p className="text-lg font-bold text-foreground">{result.similarity}%</p>
                      </div>
                    </div>
                  )}
                  {result.hammingDistance !== undefined && (
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-purple-500/10 dark:bg-purple-500/10 border border-purple-500/20 dark:border-purple-500/20">
                        <Hash className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">Hamming Distance</p>
                        <p className="text-lg font-bold text-foreground">{result.hammingDistance}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Publisher Identity */}
          {result.publisher && (
            <div className="bg-white/[0.05] dark:bg-black/40 rounded-xl p-6 border border-white/[0.1] dark:border-white/[0.08] space-y-4">
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Publisher Identity
              </h4>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center border border-blue-500/30 dark:border-blue-500/30">
                  <Building2 className="w-6 h-6 text-blue-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-foreground">{result.publisher.name}</p>
                    {result.publisher.verified && (
                      <CheckCircle2 className="w-4 h-4 text-blue-400" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Wallet className="w-4 h-4" />
                    <span className="font-mono">{formatAddress(result.publisher.wallet)}</span>
                    <button
                      onClick={() => handleCopy(result.publisher!.wallet, "publisher-wallet")}
                      className="p-1 hover:bg-white/[0.1] dark:hover:bg-white/[0.1] rounded transition-colors"
                    >
                      <Copy
                        className={`w-3.5 h-3.5 ${
                          copied === "publisher-wallet" ? "text-green-400" : "text-muted-foreground"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Content Metadata */}
          {result.metadata && (
            <div className="bg-white/[0.05] dark:bg-black/40 rounded-xl p-6 border border-white/[0.1] dark:border-white/[0.08] space-y-4">
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Content Metadata
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Title</p>
                  <p className="text-foreground font-medium">{result.metadata.title}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Content Type</p>
                  <p className="text-foreground font-medium">{result.metadata.contentType}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Description</p>
                  <p className="text-muted-foreground">{result.metadata.description}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Date Registered
                  </p>
                  <p className="text-foreground font-mono text-sm">{result.metadata.dateRegistered}</p>
                </div>
              </div>
            </div>
          )}

          {/* Blockchain Proof */}
          {result.blockchainProof && (
            <div className="bg-white/[0.05] dark:bg-black/40 rounded-xl p-6 border border-white/[0.1] dark:border-white/[0.08] space-y-4">
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                <Hash className="w-4 h-4" />
                Blockchain Proof
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-4 p-3 rounded-lg bg-white/[0.03] dark:bg-black/60 border border-white/[0.05] dark:border-white/[0.05]">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground mb-1">Transaction Hash</p>
                    <p className="font-mono text-sm text-green-400/80 truncate">
                      {result.blockchainProof.txHash}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(result.blockchainProof!.txHash, "tx-hash")}
                      className="p-2 hover:bg-white/[0.1] dark:hover:bg-white/[0.1] rounded transition-colors"
                    >
                      <Copy
                        className={`w-4 h-4 ${
                          copied === "tx-hash" ? "text-green-400" : "text-muted-foreground"
                        }`}
                      />
                    </button>
                    <a
                      href={`https://sepolia-blockscout.lisk.com/tx/${result.blockchainProof.txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 hover:bg-white/[0.1] dark:hover:bg-white/[0.1] rounded transition-colors text-muted-foreground hover:text-blue-400"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Block Height</p>
                    <p className="font-mono text-sm text-foreground">{result.blockchainProof.blockHeight}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Timestamp</p>
                    <p className="font-mono text-sm text-foreground">{result.blockchainProof.timestamp}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Contract ID</p>
                    <p className="font-mono text-sm text-foreground truncate">
                      {result.blockchainProof.contractId}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Similar Content */}
          {result.similarContent && result.similarContent.length > 0 && (
            <div className="bg-white/[0.05] dark:bg-black/40 rounded-xl p-6 border border-white/[0.1] dark:border-white/[0.08] space-y-4">
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                <Link2 className="w-4 h-4" />
                Similar Content Found
              </h4>
              <div className="space-y-3">
                {result.similarContent.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-lg bg-white/[0.03] dark:bg-black/60 border border-white/[0.05] dark:border-white/[0.05] hover:border-blue-500/30 dark:hover:border-blue-500/30 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <p className="font-medium text-foreground mb-1">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.publisher}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-yellow-400">{item.similarity}%</p>
                        <p className="text-xs text-muted-foreground font-mono">{item.txHash.slice(0, 10)}...</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Security Note */}
          <div className="bg-blue-500/5 rounded-xl p-4 border border-blue-500/20">
            <p className="text-sm text-blue-200 flex items-start gap-2">
              <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" />
              <span>
                <strong>Security Note:</strong> SIGNET does not store your files. Hashing is done
                locally and only the fingerprint is processed. Your privacy is protected.
              </span>
            </p>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}

