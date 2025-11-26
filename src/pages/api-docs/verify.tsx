import { GlassCard } from "@/components/ui/glass-card";
import { ShieldCheck } from "lucide-react";

export default function Verify() {
  return (
    <div className="space-y-8 max-w-4xl">
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white-100 flex items-center gap-3 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
          <ShieldCheck className="w-6 h-6 text-blue-400" />
          3. Verify Content
        </h2>
        <p className="text-white-100 leading-relaxed">
          Check content authenticity by comparing the perceptual hash (pHash) with the existing database.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <GlassCard className="p-4">
            <p className="text-sm text-gray-400 mb-1">Method</p>
            <p className="text-yellow-400 font-mono font-bold">POST</p>
          </GlassCard>
          <GlassCard className="p-4">
            <p className="text-sm text-gray-400 mb-1">Endpoint</p>
            <p className="text-blue-300 font-mono">/api/verify</p>
          </GlassCard>
          <GlassCard className="p-4">
            <p className="text-sm text-gray-400 mb-1">Body Type</p>
            <p className="text-purple-300 font-mono">form-data</p>
          </GlassCard>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white-100">Body Parameters</h3>
          <GlassCard className="p-0 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-white/5 border-b border-white/10">
                  <tr>
                    <th className="p-4 font-semibold text-blue-200">Key</th>
                    <th className="p-4 font-semibold text-blue-200">Type</th>
                    <th className="p-4 font-semibold text-blue-200">Required</th>
                    <th className="p-4 font-semibold text-blue-200">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr>
                    <td className="p-4 font-mono text-purple-300">file</td>
                    <td className="p-4 text-gray-300">File</td>
                    <td className="p-4 text-yellow-400">Optional*</td>
                    <td className="p-4 text-gray-300">File to verify for authenticity.</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-mono text-purple-300">link</td>
                    <td className="p-4 text-gray-300">Text</td>
                    <td className="p-4 text-yellow-400">Optional*</td>
                    <td className="p-4 text-gray-300">Video/image link (YouTube, TikTok, Instagram, Direct URL).</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="p-4 bg-white/5 text-sm text-gray-400 italic">
              *One of `file` or `link` must be provided.
            </div>
          </GlassCard>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-white-100">Response: VERIFIED (Authentic)</h3>
          <p className="text-sm text-gray-400">Content found with similarity below threshold (Hamming Distance &lt;= Threshold).</p>
          <GlassCard className="p-0 overflow-hidden bg-[#1e1e1e]">
            <pre className="p-4 text-sm text-gray-300 overflow-x-auto">
              {`{
    "status": "VERIFIED",
    "pHash_input": "a1b2c3d4e5f67890",
    "pHash_match": "a1b2c3d4e5f67890",
    "hamming_distance": 0,
    "publisher": "0xPublisherAddress...",
    "title": "Content Title",
    "txHash": "0x123456789abcdef...",
    "explorer_link": "https://sepolia-blockscout.lisk.com/tx/0x...",
    "message": "Content is authentic."
}`}
            </pre>
          </GlassCard>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-white-100">Response: UNVERIFIED (Fake/Not Registered)</h3>
          <p className="text-sm text-gray-400">Content not found or difference is too large.</p>
          <GlassCard className="p-0 overflow-hidden bg-[#1e1e1e]">
            <pre className="p-4 text-sm text-gray-300 overflow-x-auto">
              {`{
    "status": "UNVERIFIED",
    "pHash_input": "f9e8d7c6b5a43210",
    "message": "No matching content found."
}`}
            </pre>
          </GlassCard>
          <p className="text-sm text-gray-400 mt-2">Or if found but distance is too large:</p>
          <GlassCard className="p-0 overflow-hidden bg-[#1e1e1e]">
            <pre className="p-4 text-sm text-gray-300 overflow-x-auto">
              {`{
    "status": "UNVERIFIED",
    "pHash_input": "...",
    "pHash_match": "...",
    "hamming_distance": 35,
    ...
    "message": "Content is different."
}`}
            </pre>
          </GlassCard>
        </div>
      </section>
    </div>
  );
}
