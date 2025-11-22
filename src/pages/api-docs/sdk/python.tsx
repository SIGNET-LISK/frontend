import { GlassCard } from "@/components/ui/glass-card";
import { CodeBlockGlass } from "@/components/ui/code-block-glass";
import { Code } from "lucide-react";

export default function PythonSDK() {
  return (
    <div className="space-y-8 max-w-4xl">
      <section className="space-y-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 flex items-center gap-3 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            <Code className="w-10 h-10 text-blue-400" />
            Python SDK
          </h1>
          <p className="text-xl text-gray-100 leading-relaxed">
            The official SIGNET Python SDK provides a simple and intuitive interface for 
            integrating content verification and registration into your Python applications.
          </p>
        </div>
      </section>

      <div className="w-full h-px bg-white/5" />

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">Installation</h2>
        <CodeBlockGlass 
          title="pip"
          code={`pip install signet-sdk`}
        />
        <CodeBlockGlass 
          title="pipenv"
          code={`pipenv install signet-sdk`}
        />
        <CodeBlockGlass 
          title="poetry"
          code={`poetry add signet-sdk`}
        />
      </section>

      <div className="w-full h-px bg-white/5" />

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">Setup</h2>
        <CodeBlockGlass 
          title="Initialize the Client"
          code={`from signet import SignetClient
import os

client = SignetClient(
    api_key=os.getenv('SIGNET_API_KEY'),
    base_url='https://api.signet.com/v1'  # Optional, defaults to production
)`}
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
            code={`# Verify a local file
with open('media.jpg', 'rb') as file:
    result = client.verify.file(
        file=file,
        mode='deep'  # Optional: 'fast' or 'deep'
    )

if result.match:
    print(f"Content verified! Similarity: {result.similarity_score}%")
    print(f"Publisher: {result.content.publisher.name}")
    print(f"TX Hash: {result.blockchain_proof.tx_hash}")
else:
    print("No match found")`}
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Using URL</h3>
          <CodeBlockGlass 
            title="Verify URL"
            code={`result = client.verify.url(
    url='https://example.com/media.jpg',
    mode='fast'
)

if result.match:
    print('Content verified!')
    print(f'Publisher: {result.content.publisher.name}')
    print(f'Block Height: {result.blockchain_proof.block_height}')
else:
    print('No match found')`}
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
            code={`# Register a local file
with open('media.jpg', 'rb') as file:
    result = client.register.file(
        file=file,
        title='My Content Title',
        description='Optional description of the content'
    )

print('Registration successful!')
print(f'Content ID: {result.content.id}')
print(f'Transaction Hash: {result.blockchain.tx_hash}')
print(f'Block Height: {result.blockchain.block_height}')`}
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Register with Hash</h3>
          <CodeBlockGlass 
            title="Register with Pre-calculated Hash"
            code={`result = client.register.hash(
    content_hash='ph:a1b2c3d4e5f6...',
    title='My Content Title',
    description='Optional description'
)

print(f'Registered with TX: {result.blockchain.tx_hash}')`}
          />
        </div>
      </section>

      <div className="w-full h-px bg-white/5" />

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">Get Publisher Data</h2>
        <CodeBlockGlass 
          title="Get Publisher"
          code={`publisher = client.publisher.get('0x7f3a...2b1c')

print(f'Publisher Name: {publisher.name}')
print(f'Verified: {publisher.verified}')
print(f'Status: {publisher.status}')
print(f'Content Count: {publisher.statistics.registered_content_count}')`}
        />
      </section>

      <div className="w-full h-px bg-white/5" />

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">Error Handling</h2>
        <CodeBlockGlass 
          title="Error Handling"
          code={`from signet import SignetClient, SignetError

try:
    result = client.verify.url('https://example.com/media.jpg')
except SignetError as e:
    print(f'SIGNET Error: {e.code} - {e.message}')
    
    if e.code == 429:
        print(f'Rate limit exceeded. Retry after: {e.retry_after} seconds')
    elif e.code == 401:
        print('Invalid API key')
    elif e.code == 422:
        print('Invalid file format')
except Exception as e:
    print(f'Unexpected error: {e}')`}
        />
      </section>

      <div className="w-full h-px bg-white/5" />

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">Advanced Usage</h2>
        
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Custom Configuration</h3>
          <CodeBlockGlass 
            title="Custom Headers and Timeout"
            code={`client = SignetClient(
    api_key=os.getenv('SIGNET_API_KEY'),
    headers={
        'X-Custom-Header': 'value'
    },
    timeout=30  # seconds
)`}
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Retry Logic</h3>
          <CodeBlockGlass 
            title="Automatic Retry"
            code={`from signet import SignetClient, RetryConfig

retry_config = RetryConfig(
    max_attempts=3,
    delay=1.0,  # seconds
    backoff_factor=2.0
)

client = SignetClient(
    api_key=os.getenv('SIGNET_API_KEY'),
    retry=retry_config
)`}
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Async Support</h3>
          <CodeBlockGlass 
            title="Async/Await"
            code={`import asyncio
from signet import AsyncSignetClient

async def main():
    client = AsyncSignetClient(api_key=os.getenv('SIGNET_API_KEY'))
    
    result = await client.verify.url('https://example.com/media.jpg')
    print(f'Match: {result.match}')

asyncio.run(main())`}
          />
        </div>
      </section>

      <div className="w-full h-px bg-white/5" />

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">Type Hints</h2>
        <GlassCard>
          <p className="text-gray-100 mb-4">
            The SDK includes full type hints for better IDE support and type checking.
          </p>
          <CodeBlockGlass 
            title="Type Hints Example"
            code={`from signet import SignetClient, VerifyResult, RegisterResult
from typing import Optional

client = SignetClient(api_key=os.getenv('SIGNET_API_KEY'))

def verify_content(url: str) -> VerifyResult:
    return client.verify.url(url)

result: VerifyResult = verify_content('https://example.com/media.jpg')

if result.match:
    # Type checker knows result.content exists when match is True
    publisher_name: str = result.content.publisher.name`}
          />
        </GlassCard>
      </section>
    </div>
  );
}

