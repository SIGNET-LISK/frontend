import { GlassCard } from "@/components/ui/glass-card";
import { CodeBlockGlass } from "@/components/ui/code-block-glass";
import { Globe } from "lucide-react";

export default function Publisher() {
  return (
    <div className="space-y-8 max-w-4xl">
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded text-xs font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
            GET
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white-100 flex items-center gap-3 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            <Globe className="w-10 h-10 text-blue-400" />
            /api/publisher/:wallet
          </h1>
        </div>
        <p className="text-xl text-white-100 leading-relaxed">
          Retrieve detailed information about a specific publisher by their
          wallet address. This endpoint provides publisher metadata,
          verification status, and content statistics.
        </p>
      </section>

      <div className="w-full h-px bg-white/5" />

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white-100 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
          URL Parameters
        </h2>
        <GlassCard className="p-0 overflow-hidden">
          <div className="p-6">
            <h4 className="text-sm font-semibold text-white-100 mb-4 uppercase tracking-wider">
              Path Parameters
            </h4>
            <div className="space-y-4">
              <div className="grid grid-cols-12 gap-4 py-3 border-b border-white/5">
                <div className="col-span-3">
                  <code className="text-blue-300 font-mono text-sm">
                    wallet
                  </code>
                </div>
                <div className="col-span-2">
                  <span className="text-white-100 text-sm">String</span>
                  <span className="text-red-400 text-xs ml-1">(required)</span>
                </div>
                <div className="col-span-7">
                  <span className="text-white-100 text-sm">
                    The wallet address of the publisher (e.g., "0x7f3a...2b1c").
                  </span>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </section>

      <div className="w-full h-px bg-white/5" />

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white-100 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
          Example Request
        </h2>
        <CodeBlockGlass
          title="JavaScript"
          code={`const walletAddress = '0x7f3a...2b1c';

const response = await fetch(
  \`https://api.signet.com/v1/publisher/\${walletAddress}\`,
  {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer sk_live_51Mx...92zA'
    }
  }
);

const publisherData = await response.json();`}
        />
      </section>

      <div className="w-full h-px bg-white/5" />

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white-100 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
          Response Structure
        </h2>
        <CodeBlockGlass
          title="Success Response"
          code={`{
  "wallet": "0x7f3a...2b1c",
  "name": "TechCorp Inc.",
  "verified": true,
  "status": "active",
  "join_date": "2024-01-15T10:00:00Z",
  "statistics": {
    "registered_content_count": 142,
    "total_verifications": 1250,
    "last_activity": "2024-11-20T14:30:00Z"
  },
  "metadata": {
    "website": "https://techcorp.com",
    "description": "Leading technology corporation",
    "logo_url": "https://techcorp.com/logo.png"
  },
  "subscription": {
    "plan": "enterprise",
    "rate_limit": "unlimited",
    "features": ["content_registration", "api_access", "priority_support"]
  }
}`}
        />
      </section>

      <div className="w-full h-px bg-white/5" />

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white-100 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
          Response Fields
        </h2>
        <GlassCard className="p-0 overflow-hidden">
          <div className="p-6">
            <div className="space-y-4">
              <div className="py-2 border-b border-white/5">
                <code className="text-blue-300 font-mono text-sm">wallet</code>
                <span className="text-white-100 text-sm ml-2">String</span>
                <p className="text-white-100 text-sm mt-1">
                  The publisher's wallet address.
                </p>
              </div>
              <div className="py-2 border-b border-white/5">
                <code className="text-blue-300 font-mono text-sm">name</code>
                <span className="text-white-100 text-sm ml-2">String</span>
                <p className="text-white-100 text-sm mt-1">
                  The publisher's display name or organization name.
                </p>
              </div>
              <div className="py-2 border-b border-white/5">
                <code className="text-blue-300 font-mono text-sm">
                  verified
                </code>
                <span className="text-white-100 text-sm ml-2">Boolean</span>
                <p className="text-white-100 text-sm mt-1">
                  Whether the publisher has completed identity verification.
                </p>
              </div>
              <div className="py-2 border-b border-white/5">
                <code className="text-blue-300 font-mono text-sm">status</code>
                <span className="text-white-100 text-sm ml-2">String</span>
                <p className="text-white-100 text-sm mt-1">
                  Publisher account status: "active", "suspended", or "banned".
                </p>
              </div>
              <div className="py-2 border-b border-white/5">
                <code className="text-blue-300 font-mono text-sm">
                  join_date
                </code>
                <span className="text-white-100 text-sm ml-2">
                  ISO 8601 DateTime
                </span>
                <p className="text-white-100 text-sm mt-1">
                  When the publisher first registered with SIGNET.
                </p>
              </div>
              <div className="py-2 border-b border-white/5">
                <code className="text-blue-300 font-mono text-sm">
                  statistics
                </code>
                <span className="text-white-100 text-sm ml-2">Object</span>
                <p className="text-white-100 text-sm mt-1">
                  Content and activity statistics for the publisher.
                </p>
              </div>
              <div className="py-2 border-b border-white/5">
                <code className="text-blue-300 font-mono text-sm">
                  subscription
                </code>
                <span className="text-white-100 text-sm ml-2">Object</span>
                <p className="text-white-100 text-sm mt-1">
                  Subscription plan details and available features.
                </p>
              </div>
            </div>
          </div>
        </GlassCard>
      </section>

      <div className="w-full h-px bg-white/5" />

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white-100 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
          Error Cases
        </h2>
        <GlassCard>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
              <h3 className="text-red-400 font-semibold mb-2">404 Not Found</h3>
              <p className="text-white-100 text-sm mb-2">
                No publisher found with the provided wallet address.
              </p>
              <CodeBlockGlass
                code={`{
  "error": {
    "code": 404,
    "message": "Not Found",
    "details": "Publisher with wallet address 0x7f3a...2b1c not found"
  }
}`}
              />
            </div>
            <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
              <h3 className="text-yellow-400 font-semibold mb-2">
                400 Bad Request
              </h3>
              <p className="text-white-100 text-sm mb-2">
                Invalid wallet address format.
              </p>
              <CodeBlockGlass
                code={`{
  "error": {
    "code": 400,
    "message": "Bad Request",
    "details": "Invalid wallet address format"
  }
}`}
              />
            </div>
          </div>
        </GlassCard>
      </section>

      <div className="w-full h-px bg-white/5" />

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white-100 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
          Use Cases
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <GlassCard>
            <h3 className="text-lg font-semibold text-white-100 mb-2">
              Content Verification
            </h3>
            <p className="text-white-100 text-sm">
              Verify the authenticity of content by checking publisher
              information and verification status.
            </p>
          </GlassCard>
          <GlassCard>
            <h3 className="text-lg font-semibold text-white-100 mb-2">
              Publisher Discovery
            </h3>
            <p className="text-white-100 text-sm">
              Look up publisher details to understand who registered specific
              content.
            </p>
          </GlassCard>
          <GlassCard>
            <h3 className="text-lg font-semibold text-white-100 mb-2">
              Analytics
            </h3>
            <p className="text-white-100 text-sm">
              Track publisher activity and content statistics for reporting and
              analysis.
            </p>
          </GlassCard>
          <GlassCard>
            <h3 className="text-lg font-semibold text-white-100 mb-2">
              Trust Verification
            </h3>
            <p className="text-white-100 text-sm">
              Check if a publisher is verified and active before trusting their
              content.
            </p>
          </GlassCard>
        </div>
      </section>
    </div>
  );
}
