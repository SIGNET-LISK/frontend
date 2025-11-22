import { GlassCard } from "@/components/ui/glass-card";
import { Zap, AlertCircle } from "lucide-react";
import { Link } from "wouter";

export default function RateLimits() {
  return (
    <div className="space-y-8 max-w-4xl">
      <section className="space-y-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 flex items-center gap-3 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            <Zap className="w-10 h-10 text-blue-400" />
            Rate Limits
          </h1>
          <p className="text-xl text-gray-100 leading-relaxed">
            API rate limits are applied per API key based on your subscription plan. 
            These limits help ensure fair usage and system stability for all users.
          </p>
        </div>
      </section>

      <div className="w-full h-px bg-white/5" />

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">Rate Limit Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard className="text-center p-6">
            <h4 className="text-gray-100 mb-2 font-semibold">Free</h4>
            <p className="text-3xl font-bold text-white mb-1">
              100
            </p>
            <p className="text-sm text-gray-300 mb-4">requests / minute</p>
            <ul className="text-left text-sm text-gray-100 space-y-2 mt-4">
              <li className="flex items-center gap-2">
                <span className="text-blue-400">✓</span>
                <span>Basic verification</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-400">✓</span>
                <span>Read-only access</span>
              </li>
            </ul>
          </GlassCard>
          <GlassCard className="text-center p-6 border-blue-500/30 bg-blue-500/5">
            <div className="absolute top-0 right-0 px-3 py-1 bg-blue-600/80 backdrop-blur-[8px] text-xs font-bold uppercase tracking-wider rounded-bl-2xl rounded-tr-[24px]">
              Popular
            </div>
            <h4 className="text-blue-300 mb-2 font-semibold">Pro</h4>
            <p className="text-3xl font-bold text-white mb-1">
              1,000
            </p>
            <p className="text-sm text-gray-300 mb-4">requests / minute</p>
            <ul className="text-left text-sm text-gray-100 space-y-2 mt-4">
              <li className="flex items-center gap-2">
                <span className="text-blue-400">✓</span>
                <span>Content registration</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-400">✓</span>
                <span>Priority support</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-400">✓</span>
                <span>Advanced analytics</span>
              </li>
            </ul>
          </GlassCard>
          <GlassCard className="text-center p-6 border-purple-500/30 bg-purple-500/5">
            <h4 className="text-purple-300 mb-2 font-semibold">Enterprise</h4>
            <p className="text-3xl font-bold text-white mb-1">
              Unlimited
            </p>
            <p className="text-sm text-gray-300 mb-4">requests / minute</p>
            <ul className="text-left text-sm text-gray-100 space-y-2 mt-4">
              <li className="flex items-center gap-2">
                <span className="text-blue-400">✓</span>
                <span>Custom rate limits</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-400">✓</span>
                <span>Dedicated support</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-400">✓</span>
                <span>SLA guarantee</span>
              </li>
            </ul>
          </GlassCard>
        </div>
      </section>

      <div className="w-full h-px bg-white/5" />

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">How Rate Limits Work</h2>
        <GlassCard>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-sm flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Per-Key Limits</h3>
                <p className="text-gray-100 text-sm">
                  Rate limits are applied per API key. Each key has its own independent limit counter.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-sm flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Sliding Window</h3>
                <p className="text-gray-100 text-sm">
                  Limits are calculated using a sliding window algorithm. Requests are counted 
                  over the past minute, not a fixed time period.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-sm flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Per-Endpoint Limits</h3>
                <p className="text-gray-100 text-sm">
                  Some endpoints may have different rate limits. Check the endpoint documentation 
                  for specific limits.
                </p>
              </div>
            </div>
          </div>
        </GlassCard>
      </section>

      <div className="w-full h-px bg-white/5" />

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <AlertCircle className="w-6 h-6 text-blue-400" />
          Rate Limit Exceeded
        </h2>
        <p className="text-gray-100">
          When you exceed your rate limit, the API will return a 429 status code with details 
          about when you can make requests again.
        </p>
        
        <GlassCard>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
              <h3 className="text-red-400 font-semibold mb-2">429 Too Many Requests</h3>
              <p className="text-gray-100 text-sm mb-3">
                This error is returned when you have exceeded your rate limit.
              </p>
              <div className="bg-black/40 rounded-lg p-4">
                <pre className="text-sm font-mono text-blue-100/90">
                  <code>{`{
  "error": {
    "code": 429,
    "message": "Too Many Requests",
    "details": "Rate limit exceeded",
    "retry_after": 45,
    "limit": 100,
    "remaining": 0
  }
}`}</code>
                </pre>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <h3 className="text-blue-400 font-semibold mb-2">Response Headers</h3>
              <p className="text-gray-100 text-sm mb-2">
                The API also includes rate limit information in response headers:
              </p>
              <ul className="text-sm text-gray-100 space-y-1">
                <li><code className="text-blue-300">X-RateLimit-Limit</code> - Your rate limit</li>
                <li><code className="text-blue-300">X-RateLimit-Remaining</code> - Requests remaining</li>
                <li><code className="text-blue-300">X-RateLimit-Reset</code> - When the limit resets (Unix timestamp)</li>
                <li><code className="text-blue-300">Retry-After</code> - Seconds to wait before retrying</li>
              </ul>
            </div>
          </div>
        </GlassCard>
      </section>

      <div className="w-full h-px bg-white/5" />

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">Best Practices</h2>
        <GlassCard>
          <ul className="space-y-3 text-gray-100">
            <li className="flex items-start gap-3">
              <span className="text-blue-400 mt-1">✓</span>
              <span><strong className="text-white">Implement exponential backoff</strong> when you receive a 429 error</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-400 mt-1">✓</span>
              <span><strong className="text-white">Respect the Retry-After header</strong> to avoid unnecessary requests</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-400 mt-1">✓</span>
              <span><strong className="text-white">Monitor your usage</strong> using the rate limit headers in responses</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-400 mt-1">✓</span>
              <span><strong className="text-white">Cache responses</strong> when possible to reduce API calls</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-400 mt-1">✓</span>
              <span><strong className="text-white">Batch requests</strong> when the API supports it</span>
            </li>
          </ul>
        </GlassCard>
      </section>

      <div className="w-full h-px bg-white/5" />

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">Upgrading Your Plan</h2>
        <GlassCard>
          <div className="space-y-4">
            <p className="text-gray-100">
              Need higher rate limits? Upgrade your plan to get more requests per minute and 
              access to additional features.
            </p>
            <Link href="/dashboard/api">
              <button className="px-6 py-3 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg text-blue-300 font-semibold transition-colors">
                Upgrade Plan
              </button>
            </Link>
          </div>
        </GlassCard>
      </section>
    </div>
  );
}

