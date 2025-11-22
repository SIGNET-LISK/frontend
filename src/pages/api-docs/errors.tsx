import { GlassCard } from "@/components/ui/glass-card";
import { CodeBlockGlass } from "@/components/ui/code-block-glass";
import { AlertCircle } from "lucide-react";

export default function Errors() {
  const errorCodes = [
    {
      code: 400,
      message: "Bad Request",
      meaning: "Parameters missing or invalid",
      color: "yellow",
      example: {
        error: {
          code: 400,
          message: "Bad Request",
          details: "Missing required parameter: 'url' or 'file'"
        }
      }
    },
    {
      code: 401,
      message: "Unauthorized",
      meaning: "API key invalid or missing",
      color: "red",
      example: {
        error: {
          code: 401,
          message: "Unauthorized",
          details: "Invalid or missing API key"
        }
      }
    },
    {
      code: 403,
      message: "Forbidden",
      meaning: "Account banned or insufficient permissions",
      color: "red",
      example: {
        error: {
          code: 403,
          message: "Forbidden",
          details: "Publisher account required for content registration"
        }
      }
    },
    {
      code: 404,
      message: "Not Found",
      meaning: "No match for hash or resource not found",
      color: "orange",
      example: {
        error: {
          code: 404,
          message: "Not Found",
          details: "Publisher with wallet address 0x7f3a...2b1c not found"
        }
      }
    },
    {
      code: 409,
      message: "Conflict",
      meaning: "Content already registered",
      color: "yellow",
      example: {
        error: {
          code: 409,
          message: "Conflict",
          details: "Content with this hash is already registered",
          existing_content: {
            id: "cnt_existing123",
            registered_at: "2024-11-15T10:00:00Z"
          }
        }
      }
    },
    {
      code: 413,
      message: "Payload Too Large",
      meaning: "File size exceeds maximum limit",
      color: "orange",
      example: {
        error: {
          code: 413,
          message: "Payload Too Large",
          details: "File size exceeds 50MB limit"
        }
      }
    },
    {
      code: 422,
      message: "Unprocessable Entity",
      meaning: "File format not supported or corrupted",
      color: "yellow",
      example: {
        error: {
          code: 422,
          message: "Unprocessable Entity",
          details: "File format not supported. Supported formats: jpg, png, mp4, mp3"
        }
      }
    },
    {
      code: 429,
      message: "Too Many Requests",
      meaning: "Rate limit exceeded",
      color: "orange",
      example: {
        error: {
          code: 429,
          message: "Too Many Requests",
          details: "Rate limit exceeded",
          retry_after: 45,
          limit: 100,
          remaining: 0
        }
      }
    },
    {
      code: 500,
      message: "Internal Server Error",
      meaning: "Unexpected internal error",
      color: "red",
      example: {
        error: {
          code: 500,
          message: "Internal Server Error",
          details: "An unexpected error occurred. Please try again later."
        }
      }
    },
    {
      code: 503,
      message: "Service Unavailable",
      meaning: "Service temporarily unavailable",
      color: "orange",
      example: {
        error: {
          code: 503,
          message: "Service Unavailable",
          details: "Service is temporarily unavailable. Please try again later."
        }
      }
    }
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, string> = {
      red: "text-red-300 bg-red-500/10 border-red-500/20",
      yellow: "text-yellow-300 bg-yellow-500/10 border-yellow-500/20",
      orange: "text-orange-300 bg-orange-500/10 border-orange-500/20",
    };
    return colors[color] || colors.red;
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <section className="space-y-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 flex items-center gap-3 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            <AlertCircle className="w-10 h-10 text-blue-400" />
            Error Codes
          </h1>
          <p className="text-xl text-gray-100 leading-relaxed">
            Reference guide for all error codes returned by the SIGNET API. 
            Use this to understand and handle errors in your integration.
          </p>
        </div>
      </section>

      <div className="w-full h-px bg-white/5" />

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">Error Response Format</h2>
        <GlassCard>
          <p className="text-gray-100 mb-4">
            All errors follow a consistent response format:
          </p>
          <CodeBlockGlass 
            title="Error Response Structure"
            code={`{
  "error": {
    "code": 401,
    "message": "Unauthorized",
    "details": "Invalid or missing API key"
  }
}`}
          />
        </GlassCard>
      </section>

      <div className="w-full h-px bg-white/5" />

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">Error Codes Reference</h2>
        <div className="space-y-4">
          {errorCodes.map((error) => (
            <GlassCard key={error.code} className="p-0 overflow-hidden">
              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`px-3 py-1 rounded text-sm font-bold ${getColorClasses(error.color)}`}>
                    {error.code}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1">{error.message}</h3>
                    <p className="text-gray-100 text-sm">{error.meaning}</p>
                  </div>
                </div>
                <CodeBlockGlass 
                  code={JSON.stringify(error.example, null, 2)}
                />
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      <div className="w-full h-px bg-white/5" />

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">Error Handling Best Practices</h2>
        <GlassCard>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">1. Check Status Codes</h3>
              <p className="text-gray-100 text-sm mb-3">
                Always check the HTTP status code before processing the response body.
              </p>
              <CodeBlockGlass 
                title="JavaScript Example"
                code={`const response = await fetch('https://api.signet.com/v1/verify', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer sk_live_...',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ url: 'https://example.com/media.jpg' })
});

if (!response.ok) {
  const error = await response.json();
  console.error('Error:', error.error.code, error.error.message);
  
  // Handle specific error codes
  if (error.error.code === 429) {
    // Rate limit exceeded
    const retryAfter = error.error.retry_after;
    // Wait and retry
  } else if (error.error.code === 401) {
    // Invalid API key
    // Check API key configuration
  }
} else {
  const result = await response.json();
  // Process successful response
}`}
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">2. Implement Retry Logic</h3>
              <p className="text-gray-100 text-sm mb-3">
                For transient errors (429, 500, 503), implement exponential backoff retry logic.
              </p>
              <CodeBlockGlass 
                title="Retry with Exponential Backoff"
                code={`async function verifyWithRetry(url, maxRetries = 3) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetch('https://api.signet.com/v1/verify', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer sk_live_...',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url })
      });
      
      if (response.ok) {
        return await response.json();
      }
      
      const error = await response.json();
      
      // Retry on rate limit or server errors
      if ([429, 500, 503].includes(error.error.code) && attempt < maxRetries - 1) {
        const delay = Math.pow(2, attempt) * 1000; // Exponential backoff
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      
      throw new Error(error.error.message);
    } catch (error) {
      if (attempt === maxRetries - 1) throw error;
    }
  }
}`}
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">3. Log Errors Appropriately</h3>
              <p className="text-gray-100 text-sm">
                Log errors with sufficient context for debugging, but avoid logging sensitive 
                information like API keys.
              </p>
            </div>
          </div>
        </GlassCard>
      </section>

      <div className="w-full h-px bg-white/5" />

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">Common Error Scenarios</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <GlassCard>
            <h3 className="text-lg font-semibold text-white mb-2">Invalid API Key</h3>
            <p className="text-gray-100 text-sm mb-2">
              Check that your API key is correctly set and hasn't been revoked.
            </p>
            <p className="text-xs text-gray-300">
              Error Code: 401
            </p>
          </GlassCard>
          <GlassCard>
            <h3 className="text-lg font-semibold text-white mb-2">Rate Limit Exceeded</h3>
            <p className="text-gray-100 text-sm mb-2">
              Implement retry logic with exponential backoff or upgrade your plan.
            </p>
            <p className="text-xs text-gray-300">
              Error Code: 429
            </p>
          </GlassCard>
          <GlassCard>
            <h3 className="text-lg font-semibold text-white mb-2">File Too Large</h3>
            <p className="text-gray-100 text-sm mb-2">
              Compress or resize your file to meet the 50MB limit.
            </p>
            <p className="text-xs text-gray-300">
              Error Code: 413
            </p>
          </GlassCard>
          <GlassCard>
            <h3 className="text-lg font-semibold text-white mb-2">Unsupported Format</h3>
            <p className="text-gray-100 text-sm mb-2">
              Ensure your file is in a supported format (jpg, png, mp4, mp3, etc.).
            </p>
            <p className="text-xs text-gray-300">
              Error Code: 422
            </p>
          </GlassCard>
        </div>
      </section>
    </div>
  );
}

