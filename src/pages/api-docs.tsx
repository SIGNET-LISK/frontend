import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { GlowButton } from "@/components/ui/glow-button";
import { DocsSidebar } from "@/components/docs/DocsSidebar";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { EndpointCard } from "@/components/docs/EndpointCard";
import { Menu, X, BookOpen, Key, Code, Gauge, Terminal, AlertCircle, ArrowRight } from "lucide-react";
import LiquidEther from "@/components/LiquidEther";
import abstractShapes from "@/assets/img/signet-logo.svg";

export default function APIDocs() {
  const [activeSection, setActiveSection] = useState("introduction");
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "introduction",
        "authentication",
        "endpoint-verify",
        "endpoint-register",
        "endpoint-publisher",
        "endpoint-content",
        "rate-limits",
        "sdk-examples",
        "error-codes",
      ];

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden font-sans selection:bg-blue-500/30">
      {/* LiquidEther Background */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <LiquidEther
          colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>

      {/* Overlay gradient */}
      <div
        className="fixed inset-0 pointer-events-none bg-gradient-to-b from-black/80 via-black/40 to-black/80"
        style={{ zIndex: 1 }}
      />

      {/* Navbar */}
      <motion.nav
        className="fixed top-4 left-4 right-4 z-50 rounded-full border border-white/[0.08] bg-black/30 backdrop-blur-[12px] shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)]">
              <img src={abstractShapes} alt="SIGNET" className="w-full h-full object-cover" />
            </div>
            <span className="font-bold text-xl tracking-tight">
              SIGNET <span className="text-gray-500 font-normal ml-2 text-sm">API Docs</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <Link href="/">
              <span className="hover:text-white transition-colors cursor-pointer">Home</span>
            </Link>
            <Link href="/verify">
              <span className="hover:text-white transition-colors cursor-pointer">Verify</span>
            </Link>
            <Link href="/dashboard">
              <span className="hover:text-white transition-colors cursor-pointer">Dashboard</span>
            </Link>
            <span className="text-white">Docs</span>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/dashboard/api">
              <GlowButton className="hidden sm:flex h-9 px-4 text-sm">Get API Key</GlowButton>
            </Link>
            <button
              className="md:hidden p-2 text-gray-400 hover:text-white"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
            >
              {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto relative z-10 pt-24">
        {/* Sidebar */}
        <DocsSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          isMobileOpen={isMobileOpen}
          onMobileClose={() => setIsMobileOpen(false)}
        />

        {/* Content */}
        <main className="flex-1 lg:ml-8 px-6 lg:px-10 pb-20 space-y-16">
          {/* Introduction */}
          <section id="introduction" className="scroll-mt-32 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                SIGNET API Documentation
              </h1>
              <p className="text-xl text-gray-400 leading-relaxed max-w-3xl">
                Integrate trust and authenticity verification directly into your applications.
                SIGNET provides powerful APIs to authenticate media, verify digital content, and
                interact with the on-chain fingerprint registry.
              </p>
            </motion.div>

            <GlassCard className="p-8 space-y-6 border-blue-500/20">
              <h2 className="text-2xl font-bold text-white">What is SIGNET API?</h2>
              <p className="text-gray-300 leading-relaxed">
                SIGNET API enables developers and enterprises to programmatically verify the
                authenticity of digital content using perceptual hashing and blockchain technology.
                Every verification is backed by immutable records on the Lisk L2 blockchain.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-white">Core Functions</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-blue-400 mt-1 shrink-0" />
                      <span>Verify content authenticity against on-chain fingerprints</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-blue-400 mt-1 shrink-0" />
                      <span>Register new content fingerprints to blockchain</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-blue-400 mt-1 shrink-0" />
                      <span>Retrieve publisher and content metadata</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-white">Technology Stack</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-purple-400 mt-1 shrink-0" />
                      <span>Perceptual Hashing (pHash) for content fingerprinting</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-purple-400 mt-1 shrink-0" />
                      <span>Lisk L2 blockchain for immutable storage</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-purple-400 mt-1 shrink-0" />
                      <span>RESTful API architecture</span>
                    </li>
                  </ul>
                </div>
              </div>
            </GlassCard>
          </section>

          {/* Authentication */}
          <section id="authentication" className="scroll-mt-32 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
                <Key className="w-8 h-8 text-blue-400" />
                Authentication
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                All API requests must be authenticated using a Bearer Token. You can obtain your
                API key from the{" "}
                <Link href="/dashboard/api" className="text-blue-400 hover:underline">
                  Developer Dashboard
                </Link>
                .
              </p>
            </motion.div>

            <GlassCard className="p-8 space-y-6 border-blue-500/20">
              <h3 className="text-xl font-semibold text-white">Header Format</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-400 mb-2">Include these headers in every request:</p>
                  <CodeBlock
                    code={`Authorization: Bearer <API_KEY>
Content-Type: application/json`}
                    language="http"
                  />
                </div>
              </div>

              <h3 className="text-xl font-semibold text-white mt-8">Example Requests</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-400 mb-2">JavaScript</p>
                  <CodeBlock
                    code={`const response = await fetch('https://api.signet.com/v1/verify', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer sk_live_51Mx...92zA',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    url: 'https://example.com/image.jpg'
  })
});

const data = await response.json();`}
                    language="javascript"
                  />
                </div>

                <div>
                  <p className="text-sm text-gray-400 mb-2">Python</p>
                  <CodeBlock
                    code={`import requests

headers = {
    'Authorization': 'Bearer sk_live_51Mx...92zA',
    'Content-Type': 'application/json'
}

response = requests.post(
    'https://api.signet.com/v1/verify',
    headers=headers,
    json={'url': 'https://example.com/image.jpg'}
)

data = response.json()`}
                    language="python"
                  />
                </div>

                <div>
                  <p className="text-sm text-gray-400 mb-2">cURL</p>
                  <CodeBlock
                    code={`curl -X POST https://api.signet.com/v1/verify \\
  -H "Authorization: Bearer sk_live_51Mx...92zA" \\
  -H "Content-Type: application/json" \\
  -d '{"url": "https://example.com/image.jpg"}'`}
                    language="bash"
                  />
                </div>
              </div>
            </GlassCard>
          </section>

          {/* Endpoints */}
          <section id="endpoints" className="scroll-mt-32 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
                <Code className="w-8 h-8 text-blue-400" />
                Endpoints
              </h2>
            </motion.div>

            {/* Verify Endpoint */}
            <div id="endpoint-verify" className="scroll-mt-32">
              <EndpointCard
                method="POST"
                path="/api/verify"
                description="Verify if a given media file or URL matches a registered on-chain fingerprint. The API calculates the perceptual hash and queries the Lisk blockchain registry."
                parameters={[
                  {
                    name: "file",
                    type: "Binary (Multipart)",
                    required: false,
                    description: "The media file to verify (max 50MB). Supports JPG, PNG, MP4, PDF, DOCX, MP3, WAV.",
                  },
                  {
                    name: "url",
                    type: "String",
                    required: false,
                    description: "Alternatively, provide a direct URL to the media. System will fetch and process it.",
                  },
                  {
                    name: "mode",
                    type: "String",
                    required: false,
                    description: "Verification mode: 'fast' (default) or 'deep' for more thorough analysis.",
                  },
                ]}
                requestExample={`const formData = new FormData();
formData.append('file', fileInput.files[0]);

const response = await fetch('https://api.signet.com/v1/verify', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer sk_live_51Mx...92zA'
  },
  body: formData
});`}
                responseExample={`{
  "match": true,
  "similarity_score": 98.5,
  "hamming_distance": 2,
  "content": {
    "id": "cnt_8f7a2b3c",
    "title": "Breaking News: Technology Update",
    "description": "Official press release",
    "content_type": "Image/JPEG",
    "registered_at": "2024-11-20T14:32:15Z",
    "publisher": {
      "name": "Kompas Media Group",
      "wallet": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
      "verified": true
    }
  },
  "blockchain_proof": {
    "network": "Lisk L2",
    "tx_hash": "0x7f3a2b1c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e",
    "block_height": "1234567",
    "timestamp": "2024-11-20T14:32:15Z",
    "contract_id": "0xSignetContract..."
  }
}`}
                errorExamples={[
                  { code: 400, message: "Bad Request - Missing file or url parameter" },
                  { code: 401, message: "Unauthorized - Invalid API key" },
                  { code: 422, message: "Unprocessable Entity - Unsupported file format" },
                  { code: 429, message: "Rate Limit Exceeded" },
                ]}
              />
            </div>

            {/* Register Endpoint */}
            <div id="endpoint-register" className="scroll-mt-32">
              <EndpointCard
                method="POST"
                path="/api/register"
                description="Register a new content fingerprint on-chain. Requires Publisher-level permissions. Used by dashboard and enterprise clients to document original content."
                parameters={[
                  {
                    name: "file",
                    type: "Binary (Multipart)",
                    required: false,
                    description: "The media file to register. System will calculate pHash automatically.",
                  },
                  {
                    name: "content_hash",
                    type: "String",
                    required: false,
                    description: "Pre-calculated perceptual hash. Required if file is not provided.",
                  },
                  {
                    name: "title",
                    type: "String",
                    required: true,
                    description: "Title of the content being registered.",
                  },
                  {
                    name: "description",
                    type: "String",
                    required: false,
                    description: "Optional description or metadata about the content.",
                  },
                ]}
                requestExample={`const formData = new FormData();
formData.append('file', fileInput.files[0]);
formData.append('title', 'Q3 Financial Report');
formData.append('description', 'Official quarterly financial report');

const response = await fetch('https://api.signet.com/v1/register', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer sk_live_51Mx...92zA'
  },
  body: formData
});`}
                responseExample={`{
  "success": true,
  "tx_hash": "0x8f3a2b1c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e",
  "block_height": "1234568",
  "content_hash": "ph:9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08",
  "registered_at": "2024-11-20T15:45:30Z",
  "explorer_url": "https://sepolia-blockscout.lisk.com/tx/0x8f3a..."
}`}
                errorExamples={[
                  { code: 401, message: "Unauthorized - Invalid API key" },
                  { code: 403, message: "Forbidden - Account does not have publisher permissions" },
                  { code: 400, message: "Bad Request - Missing required parameters" },
                ]}
              />
            </div>

            {/* Publisher Endpoint */}
            <div id="endpoint-publisher" className="scroll-mt-32">
              <EndpointCard
                method="GET"
                path="/api/publisher/:wallet"
                description="Retrieve information about a specific publisher by their wallet address. Returns publisher details, registered content count, and status."
                parameters={[
                  {
                    name: "wallet",
                    type: "String (Path Parameter)",
                    required: true,
                    description: "Wallet address of the publisher (e.g., 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb).",
                  },
                ]}
                requestExample={`const wallet = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb';

const response = await fetch(
  \`https://api.signet.com/v1/publisher/\${wallet}\`,
  {
    headers: {
      'Authorization': 'Bearer sk_live_51Mx...92zA'
    }
  }
);`}
                responseExample={`{
  "wallet": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
  "name": "Kompas Media Group",
  "verified": true,
  "status": "active",
  "registered_content_count": 124,
  "join_date": "2024-01-15T10:00:00Z",
  "last_activity": "2024-11-20T14:32:15Z"
}`}
                errorExamples={[
                  { code: 404, message: "Not Found - Publisher not found" },
                  { code: 401, message: "Unauthorized - Invalid API key" },
                ]}
              />
            </div>

            {/* Content Endpoint */}
            <div id="endpoint-content" className="scroll-mt-32">
              <EndpointCard
                method="GET"
                path="/api/content/:hash"
                description="Retrieve detailed information about a registered content by its perceptual hash. Useful for debugging and verification workflows."
                parameters={[
                  {
                    name: "hash",
                    type: "String (Path Parameter)",
                    required: true,
                    description: "Perceptual hash of the content (e.g., ph:9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08).",
                  },
                ]}
                requestExample={`const hash = 'ph:9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08';

const response = await fetch(
  \`https://api.signet.com/v1/content/\${hash}\`,
  {
    headers: {
      'Authorization': 'Bearer sk_live_51Mx...92zA'
    }
  }
);`}
                responseExample={`{
  "content_hash": "ph:9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08",
  "title": "Breaking News: Technology Update",
  "description": "Official press release",
  "content_type": "Image/JPEG",
  "registered_at": "2024-11-20T14:32:15Z",
  "publisher": {
    "name": "Kompas Media Group",
    "wallet": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    "verified": true
  },
  "blockchain_proof": {
    "tx_hash": "0x7f3a2b1c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e",
    "block_height": "1234567"
  }
}`}
                errorExamples={[
                  { code: 404, message: "Not Found - Content hash not found in registry" },
                  { code: 401, message: "Unauthorized - Invalid API key" },
                ]}
              />
            </div>
          </section>

          {/* Rate Limits */}
          <section id="rate-limits" className="scroll-mt-32 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
                <Gauge className="w-8 h-8 text-blue-400" />
                Rate Limits
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                API rate limits are applied per API key based on your subscription plan. Rate limits
                are measured per minute.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <GlassCard className="p-6 text-center border-white/10">
                <h3 className="text-gray-400 mb-2 text-sm uppercase tracking-wider">Free</h3>
                <p className="text-3xl font-bold text-white mb-1">
                  100 <span className="text-sm font-normal text-gray-500">/ min</span>
                </p>
                <p className="text-xs text-gray-500">Basic usage</p>
              </GlassCard>
              <GlassCard className="p-6 text-center border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.1)]">
                <h3 className="text-blue-300 mb-2 text-sm uppercase tracking-wider">Pro</h3>
                <p className="text-3xl font-bold text-white mb-1">
                  1,000 <span className="text-sm font-normal text-gray-500">/ min</span>
                </p>
                <p className="text-xs text-gray-500">For growing businesses</p>
              </GlassCard>
              <GlassCard className="p-6 text-center border-purple-500/30">
                <h3 className="text-purple-300 mb-2 text-sm uppercase tracking-wider">Enterprise</h3>
                <p className="text-3xl font-bold text-white mb-1">Unlimited</p>
                <p className="text-xs text-gray-500">Custom SLA available</p>
              </GlassCard>
            </div>

            <GlassCard className="p-6 border-yellow-500/20 bg-yellow-500/5">
              <p className="text-yellow-200 text-sm">
                <strong>Rate Limit Exceeded:</strong> When you exceed your rate limit, the API will
                return a <code className="bg-black/40 px-1.5 py-0.5 rounded">429 Too Many Requests</code>{" "}
                status code. Consider upgrading your plan or implementing request queuing.
              </p>
            </GlassCard>
          </section>

          {/* SDK Examples */}
          <section id="sdk-examples" className="scroll-mt-32 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
                <Terminal className="w-8 h-8 text-blue-400" />
                SDK Examples
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Official SDKs make it easy to integrate SIGNET into your applications. Choose your
                preferred language below.
              </p>
            </motion.div>

            <GlassCard className="p-8 space-y-6 border-blue-500/20">
              <h3 className="text-2xl font-semibold text-white">JavaScript SDK</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-400 mb-2">Installation</p>
                  <CodeBlock code="npm install @signet/sdk" language="bash" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-2">Setup Client</p>
                  <CodeBlock
                    code={`import { SignetClient } from '@signet/sdk';

const client = new SignetClient({
  apiKey: 'sk_live_51Mx...92zA'
});`}
                    language="javascript"
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-2">Verify Content</p>
                  <CodeBlock
                    code={`// Verify by file
const result = await client.verify.file(fileInput.files[0]);

// Verify by URL
const result = await client.verify.url('https://example.com/image.jpg');

console.log(result.match); // true/false
console.log(result.similarity_score); // 98.5`}
                    language="javascript"
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-2">Register Content</p>
                  <CodeBlock
                    code={`const result = await client.register({
  file: fileInput.files[0],
  title: 'My Content',
  description: 'Content description'
});

console.log(result.tx_hash); // Transaction hash`}
                    language="javascript"
                  />
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-8 space-y-6 border-purple-500/20">
              <h3 className="text-2xl font-semibold text-white">Python SDK</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-400 mb-2">Installation</p>
                  <CodeBlock code="pip install signet-sdk" language="bash" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-2">Setup Client</p>
                  <CodeBlock
                    code={`from signet import SignetClient

client = SignetClient(api_key='sk_live_51Mx...92zA')`}
                    language="python"
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-2">Verify Content</p>
                  <CodeBlock
                    code={`# Verify by file
with open('image.jpg', 'rb') as f:
    result = client.verify.file(f)

# Verify by URL
result = client.verify.url('https://example.com/image.jpg')

print(result.match)  # True/False
print(result.similarity_score)  # 98.5`}
                    language="python"
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-2">Register Content</p>
                  <CodeBlock
                    code={`with open('content.pdf', 'rb') as f:
    result = client.register(
        file=f,
        title='My Content',
        description='Content description'
    )

print(result.tx_hash)  # Transaction hash`}
                    language="python"
                  />
                </div>
              </div>
            </GlassCard>
          </section>

          {/* Error Codes */}
          <section id="error-codes" className="scroll-mt-32 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
                <AlertCircle className="w-8 h-8 text-blue-400" />
                Error Codes
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Reference table for all API error codes and their meanings. Use this for debugging
                and error handling in your applications.
              </p>
            </motion.div>

            <GlassCard className="p-0 overflow-hidden border-blue-500/20">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white/5 border-b border-white/10">
                      <th className="p-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Code
                      </th>
                      <th className="p-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Message
                      </th>
                      <th className="p-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Meaning
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="p-4">
                        <code className="text-red-300 font-mono font-bold">400</code>
                      </td>
                      <td className="p-4 text-white font-medium">Bad Request</td>
                      <td className="p-4 text-gray-400">
                        Parameters missing or invalid. Check your request body and parameters.
                      </td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="p-4">
                        <code className="text-red-300 font-mono font-bold">401</code>
                      </td>
                      <td className="p-4 text-white font-medium">Unauthorized</td>
                      <td className="p-4 text-gray-400">
                        API key invalid or missing. Verify your Authorization header.
                      </td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="p-4">
                        <code className="text-orange-300 font-mono font-bold">403</code>
                      </td>
                      <td className="p-4 text-white font-medium">Forbidden</td>
                      <td className="p-4 text-gray-400">
                        Account banned or lacks required permissions for this operation.
                      </td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="p-4">
                        <code className="text-yellow-300 font-mono font-bold">404</code>
                      </td>
                      <td className="p-4 text-white font-medium">Not Found</td>
                      <td className="p-4 text-gray-400">
                        No match found for the provided hash or resource does not exist.
                      </td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="p-4">
                        <code className="text-yellow-300 font-mono font-bold">429</code>
                      </td>
                      <td className="p-4 text-white font-medium">Rate Limit</td>
                      <td className="p-4 text-gray-400">
                        Too many requests. You have exceeded your rate limit. Retry after the
                        specified time.
                      </td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="p-4">
                        <code className="text-red-300 font-mono font-bold">500</code>
                      </td>
                      <td className="p-4 text-white font-medium">Server Error</td>
                      <td className="p-4 text-gray-400">
                        Internal server error. Please try again later or contact support.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </GlassCard>
          </section>
        </main>
      </div>
    </div>
  );
}
