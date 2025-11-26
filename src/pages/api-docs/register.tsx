import { GlassCard } from "@/components/ui/glass-card";
import { Server } from "lucide-react";

export default function Register() {
  return (
    <div className="space-y-8 max-w-4xl">
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white-100 flex items-center gap-3 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
          <Server className="w-6 h-6 text-blue-400" />
          2. Register Content
        </h2>
        <p className="text-white-100 leading-relaxed">
          Register new content to the Lisk blockchain and save it to the indexer database.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <GlassCard className="p-4">
            <p className="text-sm text-gray-400 mb-1">Method</p>
            <p className="text-yellow-400 font-mono font-bold">POST</p>
          </GlassCard>
          <GlassCard className="p-4">
            <p className="text-sm text-gray-400 mb-1">Endpoint</p>
            <p className="text-blue-300 font-mono">/api/register-content</p>
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
                    <td className="p-4 text-red-400">Yes</td>
                    <td className="p-4 text-gray-300">Image or video file to register.</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-mono text-purple-300">title</td>
                    <td className="p-4 text-gray-300">Text</td>
                    <td className="p-4 text-red-400">Yes</td>
                    <td className="p-4 text-gray-300">Content title.</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-mono text-purple-300">description</td>
                    <td className="p-4 text-gray-300">Text</td>
                    <td className="p-4 text-red-400">Yes</td>
                    <td className="p-4 text-gray-300">Brief description of the content.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </GlassCard>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-white-100">Success Response (200 OK)</h3>
          <GlassCard className="p-0 overflow-hidden bg-[#1e1e1e]">
            <pre className="p-4 text-sm text-gray-300 overflow-x-auto">
              {`{
    "status": "SUCCESS",
    "pHash": "a1b2c3d4e5f67890",
    "txHash": "0x123456789abcdef...",
    "message": "Content registered successfully. Indexer will pick it up shortly."
}`}
            </pre>
          </GlassCard>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-white-100">Error Response (500 Internal Server Error)</h3>
          <p className="text-sm text-gray-400">When upload or blockchain interaction error occurs.</p>
          <GlassCard className="p-0 overflow-hidden bg-[#1e1e1e]">
            <pre className="p-4 text-sm text-gray-300 overflow-x-auto">
              {`{
    "detail": "Error message description..."
}`}
            </pre>
          </GlassCard>
        </div>
      </section>
    </div>
  );
}
