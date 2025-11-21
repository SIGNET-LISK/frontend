import { Layout } from "@/components/layout/Layout";
import { GlassCard } from "@/components/ui/glass-card";
import { Activity, Database, ShieldCheck, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardHome() {
  return (
    <Layout>
      <motion.header 
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
            Publisher Dashboard
          </h2>
          <p className="text-gray-400 mt-1">Manage your content and monitor blockchain registrations.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/[0.08] backdrop-blur-[8px] border border-green-500/[0.15] text-green-400 text-sm font-medium">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Lisk Sepolia Connected
        </div>
      </motion.header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <GlassCard className="relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
              <Database className="w-24 h-24" />
            </div>
            <div className="relative z-10">
              <div className="p-3 w-fit rounded-xl bg-blue-500/[0.15] border border-blue-500/[0.2] text-blue-400 mb-4">
                <Database className="w-6 h-6" />
              </div>
              <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">Total Registered</p>
              <h3 className="text-4xl font-bold text-white mt-1">1,284</h3>
              <div className="flex items-center gap-1 text-green-400 text-sm mt-2">
                <ArrowUpRight className="w-4 h-4" />
                <span>+12% this month</span>
              </div>
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
              <ShieldCheck className="w-24 h-24" />
            </div>
            <div className="relative z-10">
              <div className="p-3 w-fit rounded-xl bg-purple-500/[0.15] border border-purple-500/[0.2] text-purple-400 mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">Verifications</p>
              <h3 className="text-4xl font-bold text-white mt-1">856</h3>
              <div className="flex items-center gap-1 text-green-400 text-sm mt-2">
                <ArrowUpRight className="w-4 h-4" />
                <span>+5% this week</span>
              </div>
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
              <Activity className="w-24 h-24" />
            </div>
            <div className="relative z-10">
              <div className="p-3 w-fit rounded-xl bg-orange-500/[0.15] border border-orange-500/[0.2] text-orange-400 mb-4">
                <Activity className="w-6 h-6" />
              </div>
              <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">API Requests</p>
              <h3 className="text-4xl font-bold text-white mt-1">45.2k</h3>
              <div className="flex items-center gap-1 text-orange-400 text-sm mt-2">
                <Activity className="w-4 h-4" />
                <span>Near Quota Limit</span>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Recent Activity Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <GlassCard className="mt-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-white">Recent Activity</h3>
            <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">View All</button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-gray-500 border-b border-white/[0.08] text-sm uppercase tracking-wider">
                  <th className="pb-4 font-medium">Content ID</th>
                  <th className="pb-4 font-medium">Type</th>
                  <th className="pb-4 font-medium">Status</th>
                  <th className="pb-4 font-medium">TX Hash</th>
                  <th className="pb-4 font-medium text-right">Time</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {[1, 2, 3, 4, 5].map((i) => (
                  <tr key={i} className="group hover:bg-white/[0.03] transition-colors border-b border-white/[0.08] last:border-0">
                    <td className="py-4 font-mono text-gray-300 group-hover:text-white">#CONTENT-{1000 + i}</td>
                    <td className="py-4 text-gray-400">Image Asset</td>
                    <td className="py-4">
                      <span className="px-2 py-1 rounded-full bg-green-500/[0.08] backdrop-blur-[4px] text-green-400 text-xs border border-green-500/[0.15]">
                        Verified
                      </span>
                    </td>
                    <td className="py-4 font-mono text-blue-400/80 truncate max-w-[150px]">0x7f...3a2b</td>
                    <td className="py-4 text-gray-500 text-right">{i * 12} mins ago</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </motion.div>
    </Layout>
  );
}
