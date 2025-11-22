import { GlassCard } from "@/components/ui/glass-card";
import { CodeBlockGlass } from "@/components/ui/code-block-glass";
import { Code } from "lucide-react";

export default function JavaScriptSDK() {
  return (
    <div className="space-y-8 max-w-4xl">
      <section className="space-y-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 flex items-center gap-3 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            <Code className="w-10 h-10 text-blue-400" />
            JavaScript SDK
          </h1>
          <p className="text-xl text-gray-100 leading-relaxed">
            The official SIGNET JavaScript SDK makes it easy to integrate content verification 
            and registration into your Node.js or browser-based applications.
          </p>
        </div>
      </section>

      <div className="w-full h-px bg-white/5" />

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">Installation</h2>
        <CodeBlockGlass 
          title="npm"
          code={`npm install @signet/sdk`}
        />
        <CodeBlockGlass 
          title="yarn"
          code={`yarn add @signet/sdk`}
        />
        <CodeBlockGlass 
          title="pnpm"
          code={`pnpm add @signet/sdk`}
        />
      </section>

      <div className="w-full h-px bg-white/5" />

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">Setup</h2>
        <CodeBlockGlass 
          title="Initialize the Client"
          code={`import { SignetClient } from '@signet/sdk';

const client = new SignetClient({
  apiKey: process.env.SIGNET_API_KEY,
  baseURL: 'https://api.signet.com/v1' // Optional, defaults to production
});`}
        />
      </section>

      <div className="w-full h-px bg-white/5" />

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">Verify Content</h2>
        <p className="text-gray-100">
          Verify if a media file or URL matches a registered on-chain fingerprint.
        </p>
        
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Using File Upload</h3>
          <CodeBlockGlass 
            title="Verify File"
            code={`// Browser
const fileInput = document.querySelector('input[type="file"]');
const file = fileInput.files[0];

const result = await client.verify.file(file, {
  mode: 'deep' // Optional: 'fast' or 'deep'
});

console.log(result.match); // true/false
console.log(result.similarity_score); // 0-100
console.log(result.content); // Content details if matched`}
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Using URL</h3>
          <CodeBlockGlass 
            title="Verify URL"
            code={`const result = await client.verify.url('https://example.com/media.jpg', {
  mode: 'fast'
});

if (result.match) {
  console.log('Content verified!');
  console.log('Publisher:', result.content.publisher.name);
  console.log('TX Hash:', result.blockchain_proof.tx_hash);
} else {
  console.log('No match found');
}`}
          />
        </div>
      </section>

      <div className="w-full h-px bg-white/5" />

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">Register Content</h2>
        <p className="text-gray-100">
          Register new content on-chain. Requires Publisher-level account.
        </p>
        
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Register with File</h3>
          <CodeBlockGlass 
            title="Register Content"
            code={`const fileInput = document.querySelector('input[type="file"]');
const file = fileInput.files[0];

const result = await client.register.file(file, {
  title: 'My Content Title',
  description: 'Optional description of the content'
});

console.log('Registration successful!');
console.log('Content ID:', result.content.id);
console.log('Transaction Hash:', result.blockchain.tx_hash);
console.log('Block Height:', result.blockchain.block_height);`}
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Register with Hash</h3>
          <CodeBlockGlass 
            title="Register with Pre-calculated Hash"
            code={`const result = await client.register.hash({
  content_hash: 'ph:a1b2c3d4e5f6...',
  title: 'My Content Title',
  description: 'Optional description'
});`}
          />
        </div>
      </section>

      <div className="w-full h-px bg-white/5" />

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">Get Publisher Data</h2>
        <CodeBlockGlass 
          title="Get Publisher"
          code={`const publisher = await client.publisher.get('0x7f3a...2b1c');

console.log('Publisher Name:', publisher.name);
console.log('Verified:', publisher.verified);
console.log('Status:', publisher.status);
console.log('Content Count:', publisher.statistics.registered_content_count);`}
        />
      </section>

      <div className="w-full h-px bg-white/5" />

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">Error Handling</h2>
        <CodeBlockGlass 
          title="Error Handling"
          code={`import { SignetError } from '@signet/sdk';

try {
  const result = await client.verify.url('https://example.com/media.jpg');
} catch (error) {
  if (error instanceof SignetError) {
    console.error('SIGNET Error:', error.code, error.message);
    
    if (error.code === 429) {
      console.log('Rate limit exceeded. Retry after:', error.retryAfter);
    } else if (error.code === 401) {
      console.log('Invalid API key');
    }
  } else {
    console.error('Unexpected error:', error);
  }
}`}
        />
      </section>

      <div className="w-full h-px bg-white/5" />

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">Advanced Usage</h2>
        
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Custom Headers</h3>
          <CodeBlockGlass 
            title="Custom Configuration"
            code={`const client = new SignetClient({
  apiKey: process.env.SIGNET_API_KEY,
  headers: {
    'X-Custom-Header': 'value'
  },
  timeout: 30000 // 30 seconds
});`}
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Retry Logic</h3>
          <CodeBlockGlass 
            title="Automatic Retry"
            code={`const client = new SignetClient({
  apiKey: process.env.SIGNET_API_KEY,
  retry: {
    attempts: 3,
    delay: 1000, // milliseconds
    onRetry: (error, attempt) => {
      console.log(\`Retry attempt \${attempt}\`);
    }
  }
});`}
          />
        </div>
      </section>

      <div className="w-full h-px bg-white/5" />

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">TypeScript Support</h2>
        <GlassCard>
          <p className="text-gray-100 mb-4">
            The SDK includes full TypeScript definitions for type safety and better developer experience.
          </p>
          <CodeBlockGlass 
            title="TypeScript Example"
            code={`import { SignetClient, VerifyResult, RegisterResult } from '@signet/sdk';

const client = new SignetClient({
  apiKey: process.env.SIGNET_API_KEY!
});

const result: VerifyResult = await client.verify.url('https://example.com/media.jpg');

if (result.match) {
  // TypeScript knows result.content exists when match is true
  console.log(result.content.title);
}`}
          />
        </GlassCard>
      </section>
    </div>
  );
}

