import { GlassCard } from "@/components/ui/glass-card";
import { CodeBlockGlass } from "@/components/ui/code-block-glass";
import { Server } from "lucide-react";

export default function Register() {
  return (
    <div className="space-y-8 max-w-4xl">
      <section className="space-y-6">
        <div className="flex items-baseline gap-3">
          <span className="px-3 py-1 rounded text-xs font-bold bg-green-500/20 text-green-400 border border-green-500/30">
            POST
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white flex items-center gap-3 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            <Server className="w-10 h-10 text-blue-400" />
            /api/register
          </h1>
        </div>
          <p className="text-xl text-gray-100 leading-relaxed">
          Register a new content fingerprint on-chain. This endpoint requires Publisher-level 
          permissions and is used by dashboard and enterprise clients to establish proof of 
          ownership for their content.
        </p>
      </section>

      <div className="w-full h-px bg-white/5" />

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">Request Body</h2>
        <GlassCard className="p-0 overflow-hidden">
          <div className="p-6">
            <h4 className="text-sm font-semibold text-gray-300 mb-4 uppercase tracking-wider">
              Parameters
            </h4>
            <div className="space-y-4">
              <div className="grid grid-cols-12 gap-4 py-3 border-b border-white/5">
                <div className="col-span-3">
                  <code className="text-blue-300 font-mono text-sm">file</code>
                </div>
                <div className="col-span-2">
                  <span className="text-gray-500 text-sm">Binary</span>
                </div>
                <div className="col-span-7">
                  <span className="text-gray-100 text-sm">
                    The media file to register (max 50MB). The perceptual hash will be calculated automatically.
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-12 gap-4 py-3 border-b border-white/5">
                <div className="col-span-3">
                  <code className="text-blue-300 font-mono text-sm">title</code>
                </div>
                <div className="col-span-2">
                  <span className="text-gray-500 text-sm">String</span>
                  <span className="text-red-400 text-xs ml-1">(required)</span>
                </div>
                <div className="col-span-7">
                  <span className="text-gray-100 text-sm">
                    A descriptive title for the content (max 200 characters).
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-12 gap-4 py-3 border-b border-white/5">
                <div className="col-span-3">
                  <code className="text-blue-300 font-mono text-sm">description</code>
                </div>
                <div className="col-span-2">
                  <span className="text-gray-500 text-sm">String</span>
                  <span className="text-gray-600 text-xs ml-1">(optional)</span>
                </div>
                <div className="col-span-7">
                  <span className="text-gray-100 text-sm">
                    Additional details about the content (max 1000 characters).
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-12 gap-4 py-3 border-b border-white/5">
                <div className="col-span-3">
                  <code className="text-blue-300 font-mono text-sm">content_hash</code>
                </div>
                <div className="col-span-2">
                  <span className="text-gray-500 text-sm">String</span>
                  <span className="text-gray-600 text-xs ml-1">(optional)</span>
                </div>
                <div className="col-span-7">
                  <span className="text-gray-100 text-sm">
                    Pre-calculated perceptual hash. If not provided, it will be calculated from the file.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </section>

      <div className="w-full h-px bg-white/5" />

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">Example Request</h2>
        <CodeBlockGlass 
          title="JavaScript - File Upload"
          code={`const formData = new FormData();
formData.append('file', fileInput.files[0]);
formData.append('title', 'Breaking News Clip');
formData.append('description', 'Original source footage from event coverage');

const response = await fetch('https://api.signet.com/v1/register', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer sk_live_51Mx...92zA'
  },
  body: formData
});

const result = await response.json();`}
        />
      </section>

      <div className="w-full h-px bg-white/5" />

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">Response Structure</h2>
        <CodeBlockGlass 
          title="Success Response"
          code={`{
  "success": true,
  "content": {
    "id": "cnt_8f7a2b3c",
    "title": "Breaking News Clip",
    "description": "Original source footage from event coverage",
    "content_hash": "ph:a1b2c3d4e5f6...",
    "registered_at": "2024-11-20T14:30:00Z"
  },
  "blockchain": {
    "tx_hash": "0x7f3a...2b1c",
    "block_height": 12849302,
    "network": "Lisk L2",
    "confirmation_status": "confirmed",
    "confirmations": 12
  },
  "publisher": {
    "wallet": "0x7f3a...2b1c",
    "name": "TechCorp Inc."
  }
}`}
        />
      </section>

      <div className="w-full h-px bg-white/5" />

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">Response Fields</h2>
        <GlassCard className="p-0 overflow-hidden">
          <div className="p-6">
            <div className="space-y-4">
              <div className="py-2 border-b border-white/5">
                <code className="text-blue-300 font-mono text-sm">success</code>
                <span className="text-gray-500 text-sm ml-2">Boolean</span>
                <p className="text-gray-100 text-sm mt-1">
                  Indicates whether the registration was successful.
                </p>
              </div>
              <div className="py-2 border-b border-white/5">
                <code className="text-blue-300 font-mono text-sm">content</code>
                <span className="text-gray-500 text-sm ml-2">Object</span>
                <p className="text-gray-100 text-sm mt-1">
                  Details about the registered content including ID, hash, and metadata.
                </p>
              </div>
              <div className="py-2 border-b border-white/5">
                <code className="text-blue-300 font-mono text-sm">blockchain</code>
                <span className="text-gray-500 text-sm ml-2">Object</span>
                <p className="text-gray-100 text-sm mt-1">
                  Blockchain transaction details including transaction hash, block height, and confirmation status.
                </p>
              </div>
              <div className="py-2 border-b border-white/5">
                <code className="text-blue-300 font-mono text-sm">tx_hash</code>
                <span className="text-gray-500 text-sm ml-2">String</span>
                <p className="text-gray-100 text-sm mt-1">
                  The blockchain transaction hash that can be used to verify the registration on-chain.
                </p>
              </div>
            </div>
          </div>
        </GlassCard>
      </section>

      <div className="w-full h-px bg-white/5" />

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">Permissions</h2>
        <GlassCard>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
              <h3 className="text-yellow-400 font-semibold mb-2">Publisher Account Required</h3>
              <p className="text-gray-100 text-sm">
                This endpoint requires a Publisher-level account. Free accounts cannot register content. 
                Upgrade your account in the Dashboard to gain access to content registration.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <h3 className="text-blue-400 font-semibold mb-2">Rate Limits</h3>
              <p className="text-gray-100 text-sm">
                Registration requests are subject to rate limits based on your subscription plan. 
                See the Rate Limits section for more details.
              </p>
            </div>
          </div>
        </GlassCard>
      </section>

      <div className="w-full h-px bg-white/5" />

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">Error Cases</h2>
        <GlassCard>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
              <h3 className="text-red-400 font-semibold mb-2">403 Forbidden</h3>
              <p className="text-gray-100 text-sm mb-2">
                Your account does not have permission to register content.
              </p>
              <CodeBlockGlass 
                code={`{
  "error": {
    "code": 403,
    "message": "Forbidden",
    "details": "Publisher account required for content registration"
  }
}`}
              />
            </div>
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
              <h3 className="text-red-400 font-semibold mb-2">409 Conflict</h3>
              <p className="text-gray-100 text-sm mb-2">
                Content with the same hash has already been registered.
              </p>
              <CodeBlockGlass 
                code={`{
  "error": {
    "code": 409,
    "message": "Conflict",
    "details": "Content with this hash is already registered",
    "existing_content": {
      "id": "cnt_existing123",
      "registered_at": "2024-11-15T10:00:00Z"
    }
  }
}`}
              />
            </div>
          </div>
        </GlassCard>
      </section>
    </div>
  );
}

