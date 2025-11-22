import { GlassCard } from "@/components/ui/glass-card";
import { Globe, ShieldCheck, Server, Hash } from "lucide-react";

export default function Introduction() {
  return (
    <div className="space-y-8 max-w-4xl">
      <section className="space-y-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            SIGNET API Documentation
          </h1>
          <p className="text-xl text-gray-100 leading-relaxed">
            Integrate trust and authenticity verification directly into your applications. 
            SIGNET provides powerful APIs to authenticate media, verify digital content, 
            and interact with the on-chain fingerprint registry.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <GlassCard className="p-4 flex items-center gap-3 bg-blue-500/10 border-blue-500/20">
            <Globe className="w-5 h-5 text-blue-400" />
            <div>
              <p className="text-blue-200 font-semibold">REST API</p>
              <p className="text-xs text-blue-300/70">Standard HTTP endpoints</p>
            </div>
          </GlassCard>
          <GlassCard className="p-4 flex items-center gap-3 bg-purple-500/10 border-purple-500/20">
            <ShieldCheck className="w-5 h-5 text-purple-400" />
            <div>
              <p className="text-purple-200 font-semibold">On-Chain Verify</p>
              <p className="text-xs text-purple-300/70">Blockchain-backed proof</p>
            </div>
          </GlassCard>
          <GlassCard className="p-4 flex items-center gap-3 bg-orange-500/10 border-orange-500/20">
            <Server className="w-5 h-5 text-orange-400" />
            <div>
              <p className="text-orange-200 font-semibold">99.9% Uptime</p>
              <p className="text-xs text-orange-300/70">Enterprise reliability</p>
            </div>
          </GlassCard>
        </div>
      </section>

      <div className="w-full h-px bg-white/5" />

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
          <Hash className="w-6 h-6 text-blue-400" />
          What is SIGNET API?
        </h2>
        <p className="text-gray-100 leading-relaxed">
          SIGNET API is a comprehensive platform that enables developers, enterprises, and integrators 
          to connect their systems with SIGNET's content verification infrastructure. The API provides 
          three core functions:
        </p>
        <ul className="space-y-3 text-gray-100">
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">•</span>
            <span><strong className="text-white">Verification:</strong> Check if media matches registered on-chain fingerprints</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">•</span>
            <span><strong className="text-white">Registration:</strong> Register new content fingerprints on the blockchain</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">•</span>
            <span><strong className="text-white">Publisher Identity:</strong> Retrieve publisher data and verification status</span>
          </li>
        </ul>
      </section>

      <div className="w-full h-px bg-white/5" />

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
          <ShieldCheck className="w-6 h-6 text-blue-400" />
          Core Technology
        </h2>
        <GlassCard>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2 drop-shadow-[0_0_8px_rgba(255,255,255,0.15)]">Perceptual Hashing</h3>
              <p className="text-gray-100 text-sm">
                SIGNET uses advanced perceptual hashing algorithms to create unique fingerprints 
                of media content. These hashes are resistant to minor modifications, compression, 
                and format changes, ensuring accurate matching even when content is slightly altered.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2 drop-shadow-[0_0_8px_rgba(255,255,255,0.15)]">Lisk L2 Blockchain</h3>
              <p className="text-gray-100 text-sm">
                All content fingerprints are stored on the Lisk L2 blockchain, providing immutable 
                proof of registration and ownership. This ensures that verification results are 
                tamper-proof and can be independently verified.
              </p>
            </div>
          </div>
        </GlassCard>
      </section>

      <div className="w-full h-px bg-white/5" />

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
          <Globe className="w-6 h-6 text-blue-400" />
          Who Needs This API?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <GlassCard>
            <h3 className="text-lg font-semibold text-white mb-2">Developers</h3>
            <p className="text-gray-100 text-sm">
              Integrate content verification into your applications, websites, or services 
              to ensure authenticity and prevent fraud.
            </p>
          </GlassCard>
          <GlassCard>
            <h3 className="text-lg font-semibold text-white mb-2">Enterprises</h3>
            <p className="text-gray-100 text-sm">
              Protect your brand and intellectual property by verifying content authenticity 
              at scale with enterprise-grade reliability.
            </p>
          </GlassCard>
          <GlassCard>
            <h3 className="text-lg font-semibold text-white mb-2">Integrators</h3>
            <p className="text-gray-100 text-sm">
              Build custom solutions that leverage SIGNET's verification infrastructure 
              for content management systems, media platforms, and more.
            </p>
          </GlassCard>
          <GlassCard>
            <h3 className="text-lg font-semibold text-white mb-2">Publishers</h3>
            <p className="text-gray-100 text-sm">
              Register your content on-chain to establish proof of ownership and enable 
              others to verify authenticity.
            </p>
          </GlassCard>
        </div>
      </section>

      <div className="w-full h-px bg-white/5" />

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
          <Server className="w-6 h-6 text-blue-400" />
          How It Works
        </h2>
        <GlassCard>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-sm flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1 drop-shadow-[0_0_8px_rgba(255,255,255,0.15)]">Request</h3>
                <p className="text-gray-100 text-sm">
                  Send a media file or URL to the verification endpoint along with your API key.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-sm flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1 drop-shadow-[0_0_8px_rgba(255,255,255,0.15)]">Processing</h3>
                <p className="text-gray-100 text-sm">
                  SIGNET calculates the perceptual hash and queries the blockchain registry 
                  for matching fingerprints.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-sm flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1 drop-shadow-[0_0_8px_rgba(255,255,255,0.15)]">Response</h3>
                <p className="text-gray-100 text-sm">
                  Receive match results, similarity scores, publisher information, and 
                  blockchain proof data.
                </p>
              </div>
            </div>
          </div>
        </GlassCard>
      </section>
    </div>
  );
}
