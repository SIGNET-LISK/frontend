import { Hash, ShieldCheck, Globe, Server, Key, Zap, Code, AlertCircle } from "lucide-react";

export const SECTIONS = [
  { id: "introduction", label: "Introduction", icon: Hash, href: "/docs/introduction" },
  { id: "authentication", label: "Authentication", icon: Key, href: "/docs/authentication" },
  { id: "verify", label: "Verify Content", icon: ShieldCheck, href: "/docs/verify" },
  { id: "register", label: "Register Content", icon: Server, href: "/docs/register" },
  { id: "publisher", label: "Get Publisher Data", icon: Globe, href: "/docs/publisher" },
  { id: "rate-limits", label: "Rate Limits", icon: Zap, href: "/docs/rate-limits" },
  { id: "sdk-js", label: "JavaScript SDK", icon: Code, href: "/docs/sdk/javascript" },
  { id: "sdk-python", label: "Python SDK", icon: Code, href: "/docs/sdk/python" },
  { id: "errors", label: "Error Codes", icon: AlertCircle, href: "/docs/errors" },
];

