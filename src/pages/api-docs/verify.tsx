import { GlassCard } from "@/components/ui/glass-card";
import { CodeBlockGlass } from "@/components/ui/code-block-glass";
import { ShieldCheck } from "lucide-react";

export default function Verify() {
  return (
    <div className="space-y-8 max-w-4xl">
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded text-xs font-bold bg-green-500/20 text-green-400 border border-green-500/30">
            POST
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white-100 flex items-center gap-3 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            <ShieldCheck className="w-10 h-10 text-blue-400" />
            /api/verify
          </h1>
        </div>
        <p className="text-xl text-white-100 leading-relaxed">
          Check if a given media file or URL matches a registered on-chain
          fingerprint. The API calculates the perceptual hash and queries the
          Lisk blockchain registry to find matching content.
        </p>
      </section>

      <div className="w-full h-px bg-white/5" />

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white-100 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
          Request Parameters
        </h2>
        <GlassCard className="p-0 overflow-hidden">
          <div className="p-6">
            <h4 className="text-sm font-semibold text-white-100 mb-4 uppercase tracking-wider">
              Parameters
            </h4>
            <div className="space-y-4">
              <div className="grid grid-cols-12 gap-4 py-3 border-b border-white/5">
                <div className="col-span-3">
                  <code className="text-blue-300 font-mono text-sm">file</code>
                </div>
                <div className="col-span-2">
                  <span className="text-white-100 text-sm">Binary</span>
                </div>
                <div className="col-span-7">
                  <span className="text-white-100 text-sm">
                    The media file to verify (max 50MB). Accepts images, videos,
                    and audio files.
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-12 gap-4 py-3 border-b border-white/5">
                <div className="col-span-3">
                  <code className="text-blue-300 font-mono text-sm">url</code>
                </div>
                <div className="col-span-2">
                  <span className="text-white-100 text-sm">String</span>
                </div>
                <div className="col-span-7">
                  <span className="text-white-100 text-sm">
                    Alternatively, provide a direct URL to the media. The API
                    will fetch and process it.
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-12 gap-4 py-3 border-b border-white/5">
                <div className="col-span-3">
                  <code className="text-blue-300 font-mono text-sm">mode</code>
                </div>
                <div className="col-span-2">
                  <span className="text-white-100 text-sm">String</span>
                  <span className="text-white-100 text-xs ml-1">
                    (optional)
                  </span>
                </div>
                <div className="col-span-7">
                  <span className="text-white-100 text-sm">
                    Verification mode:{" "}
                    <code className="text-blue-300">"fast"</code> (default) or{" "}
                    <code className="text-blue-300">"deep"</code> for more
                    thorough analysis.
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
          Example Requests
        </h2>

        <div>
          <h3 className="text-lg font-semibold text-white-100 mb-3">
            Using File Upload
          </h3>
          <CodeBlockGlass
            title="JavaScript - File Upload"
            code={`const formData = new FormData();
formData.append('file', fileInput.files[0]);
formData.append('mode', 'deep');

const response = await fetch('https://api.signet.com/v1/verify', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer sk_live_51Mx...92zA'
  },
  body: formData
});

const result = await response.json();`}
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white-100 mb-3">
            Using URL
          </h3>
          <CodeBlockGlass
            title="JavaScript - URL"
            code={`const response = await fetch('https://api.signet.com/v1/verify', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer sk_live_51Mx...92zA',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    url: 'https://example.com/media/image.jpg',
    mode: 'fast'
  })
});

const result = await response.json();`}
          />
        </div>
      </section>

      <div className="w-full h-px bg-white/5" />

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white-100 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
          Response Structure
        </h2>

        <div>
          <h3 className="text-lg font-semibold text-white-100 mb-3">
            Success Response (Match Found)
          </h3>
          <CodeBlockGlass
            title="Response Example"
            code={`{
  "match": true,
  "similarity_score": 98.5,
  "hamming_distance": 2,
  "content": {
    "id": "cnt_8f7a2b3c",
    "title": "Press Release Q3",
    "description": "Quarterly press release document",
    "registered_at": "2024-11-20T14:30:00Z",
    "publisher": {
      "wallet": "0x7f3a...2b1c",
      "name": "TechCorp Inc.",
      "verified": true
    }
  },
  "blockchain_proof": {
    "network": "Lisk L2",
    "tx_hash": "0x7f3a...2b1c",
    "block_height": 12849302,
    "timestamp": "2024-11-20T14:30:00Z"
  },
  "metadata": {
    "file_type": "image/jpeg",
    "file_size": 2456789,
    "dimensions": {
      "width": 1920,
      "height": 1080
    }
  }
}`}
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white-100 mb-3">
            Success Response (No Match)
          </h3>
          <CodeBlockGlass
            title="No Match Response"
            code={`{
  "match": false,
  "similarity_score": 0,
  "message": "No matching content found in registry"
}`}
          />
        </div>
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
                <code className="text-blue-300 font-mono text-sm">match</code>
                <span className="text-white-100 text-sm ml-2">Boolean</span>
                <p className="text-white-100 text-sm mt-1">
                  Whether the content matches a registered fingerprint.
                </p>
              </div>
              <div className="py-2 border-b border-white/5">
                <code className="text-blue-300 font-mono text-sm">
                  similarity_score
                </code>
                <span className="text-white-100 text-sm ml-2">
                  Number (0-100)
                </span>
                <p className="text-white-100 text-sm mt-1">
                  Percentage similarity between the submitted content and the
                  matched fingerprint.
                </p>
              </div>
              <div className="py-2 border-b border-white/5">
                <code className="text-blue-300 font-mono text-sm">
                  hamming_distance
                </code>
                <span className="text-white-100 text-sm ml-2">Number</span>
                <p className="text-white-100 text-sm mt-1">
                  Hamming distance between hashes (lower is more similar).
                </p>
              </div>
              <div className="py-2 border-b border-white/5">
                <code className="text-blue-300 font-mono text-sm">content</code>
                <span className="text-white-100 text-sm ml-2">Object</span>
                <p className="text-white-100 text-sm mt-1">
                  Details about the matched content and its publisher (only
                  present if match is true).
                </p>
              </div>
              <div className="py-2 border-b border-white/5">
                <code className="text-blue-300 font-mono text-sm">
                  blockchain_proof
                </code>
                <span className="text-white-100 text-sm ml-2">Object</span>
                <p className="text-white-100 text-sm mt-1">
                  Blockchain transaction details proving the registration (only
                  present if match is true).
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
              <h3 className="text-red-400 font-semibold mb-2">
                422 Unprocessable Entity
              </h3>
              <p className="text-white-100 text-sm mb-2">
                The file format is not supported or the file is corrupted.
              </p>
              <CodeBlockGlass
                code={`{
  "error": {
    "code": 422,
    "message": "Unprocessable Entity",
    "details": "File format not supported"
  }
}`}
              />
            </div>
            <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
              <h3 className="text-yellow-400 font-semibold mb-2">
                413 Payload Too Large
              </h3>
              <p className="text-white-100 text-sm mb-2">
                The file exceeds the maximum size limit (50MB).
              </p>
              <CodeBlockGlass
                code={`{
  "error": {
    "code": 413,
    "message": "Payload Too Large",
    "details": "File size exceeds 50MB limit"
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
