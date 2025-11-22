import { GlassCard } from "@/components/ui/glass-card";
import { CodeBlockGlass } from "@/components/ui/code-block-glass";
import { Key, Link as LinkIcon } from "lucide-react";
import { Link } from "wouter";

export default function Authentication() {
  return (
    <div className="space-y-8 max-w-4xl">
      <section className="space-y-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 flex items-center gap-3 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            <Key className="w-10 h-10 text-blue-400" />
            Authentication
          </h1>
          <p className="text-xl text-gray-100 leading-relaxed">
            All API requests must be authenticated using a Bearer Token. 
            You can obtain your API key from the{" "}
            <Link href="/dashboard/api" className="text-blue-400 hover:text-blue-300 underline">
              Developer Dashboard
            </Link>.
          </p>
        </div>
      </section>

      <div className="w-full h-px bg-white/5" />

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">Getting Your API Key</h2>
        <GlassCard>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-sm flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Sign Up or Log In</h3>
                <p className="text-gray-100 text-sm">
                  Create an account or log in to your existing SIGNET account.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-sm flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Navigate to API Settings</h3>
                <p className="text-gray-100 text-sm">
                  Go to your Dashboard and click on the "API Usage" section.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-sm flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Generate API Key</h3>
                <p className="text-gray-100 text-sm">
                  Click "Generate API Key" to create a new key. Store it securely and never 
                  expose it in client-side code.
                </p>
              </div>
            </div>
          </div>
        </GlassCard>
      </section>

      <div className="w-full h-px bg-white/5" />

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <LinkIcon className="w-6 h-6 text-blue-400" />
          Sending Your API Key
        </h2>
        <p className="text-gray-100">
          Include your API key in the Authorization header of every request using the Bearer token format.
        </p>
        
        <GlassCard className="p-0 overflow-hidden bg-black/20">
          <CodeBlockGlass 
            title="Header Format"
            code={`Authorization: Bearer <API_KEY>
Content-Type: application/json`}
          />
        </GlassCard>
      </section>

      <div className="w-full h-px bg-white/5" />

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">Example Requests</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">JavaScript</h3>
            <CodeBlockGlass 
              title="JavaScript Example"
              code={`const response = await fetch("https://api.signet.com/v1/verify", {
  method: "POST",
  headers: { 
    "Authorization": "Bearer sk_live_51Mx...92zA",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    url: "https://example.com/media.jpg"
  })
});

const data = await response.json();`}
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Python</h3>
            <CodeBlockGlass 
              title="Python Example"
              code={`import requests

headers = {
    "Authorization": "Bearer sk_live_51Mx...92zA",
    "Content-Type": "application/json"
}

response = requests.post(
    "https://api.signet.com/v1/verify",
    headers=headers,
    json={"url": "https://example.com/media.jpg"}
)

data = response.json()`}
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-3">cURL</h3>
            <CodeBlockGlass 
              title="cURL Example"
              code={`curl -X POST https://api.signet.com/v1/verify \\
  -H "Authorization: Bearer sk_live_51Mx...92zA" \\
  -H "Content-Type: application/json" \\
  -d '{"url": "https://example.com/media.jpg"}'`}
            />
          </div>
        </div>
      </section>

      <div className="w-full h-px bg-white/5" />

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">Authentication Errors</h2>
        <GlassCard>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
              <h3 className="text-red-400 font-semibold mb-2">401 Unauthorized</h3>
              <p className="text-gray-100 text-sm">
                This error occurs when:
              </p>
              <ul className="list-disc list-inside text-gray-100 text-sm mt-2 space-y-1">
                <li>API key is missing from the request</li>
                <li>API key is invalid or has been revoked</li>
                <li>API key format is incorrect</li>
              </ul>
            </div>
            <CodeBlockGlass 
              title="Error Response"
              code={`{
  "error": {
    "code": 401,
    "message": "Unauthorized",
    "details": "Invalid or missing API key"
  }
}`}
            />
          </div>
        </GlassCard>
      </section>

      <div className="w-full h-px bg-white/5" />

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">Security Best Practices</h2>
        <GlassCard>
          <ul className="space-y-3 text-gray-100">
            <li className="flex items-start gap-3">
              <span className="text-blue-400 mt-1">✓</span>
              <span><strong className="text-white">Never expose API keys</strong> in client-side code, public repositories, or logs</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-400 mt-1">✓</span>
              <span><strong className="text-white">Use environment variables</strong> to store API keys securely</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-400 mt-1">✓</span>
              <span><strong className="text-white">Rotate keys regularly</strong> and revoke compromised keys immediately</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-400 mt-1">✓</span>
              <span><strong className="text-white">Use HTTPS only</strong> when making API requests</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-400 mt-1">✓</span>
              <span><strong className="text-white">Implement rate limiting</strong> on your side to prevent abuse</span>
            </li>
          </ul>
        </GlassCard>
      </section>
    </div>
  );
}

