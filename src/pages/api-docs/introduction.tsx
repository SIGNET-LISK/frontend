import { GlassCard } from "@/components/ui/glass-card";
import { Server, Activity } from "lucide-react";

export default function Introduction() {
  return (
    <div className="space-y-8 max-w-4xl">
      <section className="space-y-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-white-100 mb-6 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            SIGNET API Usage Guide
          </h1>
          <p className="text-xl text-white-100 leading-relaxed">
            A complete guide to interact with SIGNET Backend API.
          </p>
        </div>

        <GlassCard className="p-6 bg-blue-500/10 border-blue-500/20">
          <div className="flex items-center gap-3 mb-2">
            <Server className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-blue-200">Base URL</h3>
          </div>
          <code className="block bg-black/30 p-3 rounded-lg text-blue-300 font-mono">
            http://localhost:8000
          </code>
        </GlassCard>
      </section>

      <div className="w-full h-px bg-white/5" />

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white-100 flex items-center gap-3 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
          <Activity className="w-6 h-6 text-green-400" />
          1. Health Check
        </h2>
        <p className="text-white-100 leading-relaxed">
          Check the backend server status.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <GlassCard className="p-4">
            <p className="text-sm text-gray-400 mb-1">Method</p>
            <p className="text-green-400 font-mono font-bold">GET</p>
          </GlassCard>
          <GlassCard className="p-4">
            <p className="text-sm text-gray-400 mb-1">Endpoint</p>
            <p className="text-blue-300 font-mono"> / </p>
          </GlassCard>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-white-100">Success Response (200 OK)</h3>
          <GlassCard className="p-0 overflow-hidden bg-[#1e1e1e]">
            <pre className="p-4 text-sm text-gray-300 overflow-x-auto">
              {`{
    "message": "SIGNET Backend is running"
}`}
            </pre>
          </GlassCard>
        </div>
      </section>
    </div>
  );
}
