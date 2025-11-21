import { Layout } from "@/components/layout/Layout";
import { GlassCard } from "@/components/ui/glass-card";
import { FileText, MoreVertical, ExternalLink, Clock, Image, File, Video, Archive, Hash } from "lucide-react";

const MOCK_CONTENTS = [
  { id: 1, title: "Q3 Financial Report", type: "PDF", size: "2.4 MB", phash: "ph:9f86...0f00a08", tx: "0x8f...2c1d0e", date: "2 mins ago" },
  { id: 2, title: "Project Alpha Blueprints", type: "CAD", size: "15.8 MB", phash: "ph:7a2b...1e4d2a", tx: "0x3a...9f1b2c", date: "2 hours ago" },
  { id: 3, title: "Marketing Assets Pack", type: "ZIP", size: "45.2 MB", phash: "ph:1c2d...8b4a1c", tx: "0x5e...7d8e9f", date: "1 day ago" },
  { id: 4, title: "Legal Agreements v2", type: "DOCX", size: "1.1 MB", phash: "ph:3e4f...5a6b7c", tx: "0x9a...1b2c3d", date: "3 days ago" },
  { id: 5, title: "User Data Export", type: "CSV", size: "5.6 MB", phash: "ph:5g6h...7i8j9k", tx: "0x2d...4e5f6g", date: "1 week ago" },
];

export default function MyContents() {
  return (
    <Layout>
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white">My Contents</h2>
          <p className="text-gray-400 mt-1">Manage your registered digital assets and view their blockchain proofs.</p>
        </div>
      </header>

      <GlassCard className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-500 border-b border-white/5 text-sm uppercase tracking-wider bg-white/[0.02]">
                <th className="p-6 font-medium">Asset Details</th>
                <th className="p-6 font-medium">pHash</th>
                <th className="p-6 font-medium">TX Hash</th>
                <th className="p-6 font-medium text-right">Registered</th>
                <th className="p-6 font-medium w-10"></th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {MOCK_CONTENTS.map((item) => (
                <tr key={item.id} className="group hover:bg-white/5 transition-colors border-b border-white/5 last:border-0">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center border border-blue-500/30">
                        {item.type === "PDF" || item.type === "DOCX" ? (
                          <FileText className="w-5 h-5 text-blue-400" />
                        ) : item.type === "ZIP" || item.type === "CAD" ? (
                          <Archive className="w-5 h-5 text-purple-400" />
                        ) : (
                          <File className="w-5 h-5 text-green-400" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-white">{item.title}</p>
                        <p className="text-xs text-gray-500">{item.type} • {item.size}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                      <Hash className="w-4 h-4 text-blue-400" />
                      <div className="font-mono text-xs text-blue-300 bg-blue-500/10 border border-blue-500/20 px-2 py-1 rounded w-fit">
                        {item.phash}
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors cursor-pointer group/tx">
                      <span className="font-mono">{item.tx}</span>
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover/tx:opacity-100 transition-opacity" />
                    </div>
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex items-center justify-end gap-2 text-gray-500">
                      <Clock className="w-3 h-3" />
                      {item.date}
                    </div>
                  </td>
                  <td className="p-6">
                    <button className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
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
