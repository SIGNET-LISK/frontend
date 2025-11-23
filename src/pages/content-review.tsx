import { Layout } from "@/components/layout/Layout";
import { GlassCard } from "@/components/ui/glass-card";
import { Eye, Search, Filter, ExternalLink, CheckCircle2, AlertTriangle, Clock, Building2 } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const MOCK_CONTENTS = [
  { 
    id: 1, 
    title: "Q3 Financial Report", 
    publisher: "Tech News Media",
    wallet: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    type: "PDF", 
    phash: "ph:9f86...0f00a08", 
    tx: "0x8f...2c1d0e", 
    date: "2 mins ago",
    status: "verified"
  },
  { 
    id: 2, 
    title: "Breaking News Article", 
    publisher: "Global News Network",
    wallet: "0x3f5CE1FBbF3f28E2B5C8F5B8F5B8F5B8F5B8F5B8",
    type: "Image", 
    phash: "ph:7a2b...1e4d2a", 
    tx: "0x3a...9f1b2c", 
    date: "1 hour ago",
    status: "pending"
  },
  { 
    id: 3, 
    title: "Marketing Campaign Assets", 
    publisher: "Digital Media Corp",
    wallet: "0x9f8f5B8F5B8F5B8F5B8F5B8F5B8F5B8F5B8F5B8",
    type: "ZIP", 
    phash: "ph:1c2d...8b4a1c", 
    tx: "0x5e...7d8e9f", 
    date: "3 hours ago",
    status: "verified"
  },
  { 
    id: 4, 
    title: "Legal Document v2", 
    publisher: "Financial Times",
    wallet: "0x8ba1f109551bD432803012645Hac136c22C9e",
    type: "DOCX", 
    phash: "ph:3e4f...5a6b7c", 
    tx: "0x9a...1b2c3d", 
    date: "1 day ago",
    status: "flagged"
  },
];

const formatAddress = (address: string) => {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export default function ContentReview() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Layout>
      <motion.header 
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-red-200 to-orange-200 bg-clip-text text-transparent">
            Global Content Review
          </h2>
          <p className="text-gray-400 mt-1">Review and moderate all content registered across the platform.</p>
        </div>
      </motion.header>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <GlassCard className="relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
              <Eye className="w-24 h-24" />
            </div>
            <div className="relative z-10">
              <div className="p-3 w-fit rounded-xl bg-blue-500/[0.15] border border-blue-500/[0.2] text-blue-400 mb-4">
                <Eye className="w-6 h-6" />
              </div>
              <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">Total Contents</p>
              <h3 className="text-4xl font-bold text-white mt-1">12,458</h3>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <GlassCard className="relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
              <CheckCircle2 className="w-24 h-24" />
            </div>
            <div className="relative z-10">
              <div className="p-3 w-fit rounded-xl bg-green-500/[0.15] border border-green-500/[0.2] text-green-400 mb-4">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">Verified</p>
              <h3 className="text-4xl font-bold text-white mt-1">11,892</h3>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <GlassCard className="relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
              <Clock className="w-24 h-24" />
            </div>
            <div className="relative z-10">
              <div className="p-3 w-fit rounded-xl bg-yellow-500/[0.15] border border-yellow-500/[0.2] text-yellow-400 mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">Pending</p>
              <h3 className="text-4xl font-bold text-white mt-1">456</h3>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <GlassCard className="relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
              <AlertTriangle className="w-24 h-24" />
            </div>
            <div className="relative z-10">
              <div className="p-3 w-fit rounded-xl bg-red-500/[0.15] border border-red-500/[0.2] text-red-400 mb-4">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">Flagged</p>
              <h3 className="text-4xl font-bold text-white mt-1">110</h3>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Search & Filter */}
      <GlassCard className="mb-6">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search by title, publisher, or hash..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-600"
            />
          </div>
          <button className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-center gap-2 text-gray-400 hover:text-white">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
      </GlassCard>

      {/* Contents Table */}
      <GlassCard className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-500 border-b border-white/5 text-sm uppercase tracking-wider bg-white/[0.02]">
                <th className="p-6 font-medium">Content</th>
                <th className="p-6 font-medium">Publisher</th>
                <th className="p-6 font-medium">pHash</th>
                <th className="p-6 font-medium">TX Hash</th>
                <th className="p-6 font-medium">Status</th>
                <th className="p-6 font-medium text-right">Date</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {MOCK_CONTENTS.map((content) => (
                <tr key={content.id} className="group hover:bg-white/5 transition-colors border-b border-white/5 last:border-0">
                  <td className="p-6">
                    <div>
                      <p className="font-medium text-white">{content.title}</p>
                      <p className="text-xs text-gray-500 mt-1">{content.type}</p>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-gray-500" />
                      <div>
                        <p className="text-white text-sm">{content.publisher}</p>
                        <p className="text-xs text-gray-500 font-mono">{formatAddress(content.wallet)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="font-mono text-xs text-blue-300 bg-blue-500/10 border border-blue-500/20 px-2 py-1 rounded w-fit">
                      {content.phash}
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors cursor-pointer group/tx">
                      <span className="font-mono">{content.tx}</span>
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover/tx:opacity-100 transition-opacity" />
                    </div>
                  </td>
                  <td className="p-6">
                    {content.status === "verified" ? (
                      <span className="px-3 py-1 rounded-full bg-green-500/[0.08] backdrop-blur-[4px] text-green-400 text-xs border border-green-500/[0.15]">
                        Verified
                      </span>
                    ) : content.status === "pending" ? (
                      <span className="px-3 py-1 rounded-full bg-yellow-500/[0.08] backdrop-blur-[4px] text-yellow-400 text-xs border border-yellow-500/[0.15]">
                        Pending
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full bg-red-500/[0.08] backdrop-blur-[4px] text-red-400 text-xs border border-red-500/[0.15]">
                        Flagged
                      </span>
                    )}
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex items-center justify-end gap-2 text-gray-500">
                      <Clock className="w-3 h-3" />
                      {content.date}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </Layout>
  );
}

