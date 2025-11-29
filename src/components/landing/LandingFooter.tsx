import { Link } from "wouter";
import { Globe, Activity, Upload } from "lucide-react";
import abstractShapes from "@/assets/img/logos.png";

export function LandingFooter() {
  return (
    <footer className="border-t border-black/[0.1] dark:border-white/[0.08] bg-black/[0.02] dark:bg-black/40 backdrop-blur-[12px] pt-20 pb-10 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                <img src={abstractShapes} alt="SIGNET" className="w-full h-full object-cover rounded-[10px]" />
              </div>
              <span className="font-bold text-xl text-foreground">SIGNET</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              The standard for digital trust. Verify content authenticity on the blockchain.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-6">Product</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li>
                <a href="#features" className="hover:text-blue-400 transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-blue-400 transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <Link href="/dashboard">
                  <span className="hover:text-blue-400 transition-colors cursor-pointer">Dashboard</span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-6">Resources</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li>
                <Link href="/verify">
                  <span className="hover:text-blue-400 transition-colors cursor-pointer">Verification Portal</span>
                </Link>
              </li>
              <li>
                <Link href="/docs">
                  <span className="hover:text-blue-400 transition-colors cursor-pointer">API Docs</span>
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Support
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-black/[0.08] dark:border-white/[0.08] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">© 2025 SIGNET. All rights reserved.</p>
          <div className="flex gap-6">
            {[Globe, Activity, Upload].map((Icon, i) => (
              <Icon
                key={i}
                className="w-5 h-5 text-muted-foreground hover:text-foreground cursor-pointer transition-colors hover:scale-110"
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

