import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SECTIONS } from "./sections";

interface TableOfContentsProps {
  onItemClick?: () => void;
}

export function TableOfContents({ onItemClick }: TableOfContentsProps) {
  const [location] = useLocation();

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 h-screen w-[280px] flex flex-col z-40 overflow-hidden",
        // Glassmorphism dengan spesifikasi yang diminta
        "bg-[rgba(20,20,20,0.4)] backdrop-blur-[28px]",
        "border-r border-white/[0.12]",
        "shadow-[0_0_20px_rgba(150,180,255,0.25)]"
      )}
      style={{
        backgroundColor: 'rgba(20, 20, 20, 0.4)',
        backdropFilter: 'blur(28px)',
        WebkitBackdropFilter: 'blur(28px)',
      }}
    >
      {/* Spacer untuk navbar */}
      <div className="h-20 flex-shrink-0" />
      
      {/* Navigation items - No scroll, items fit in available space */}
      <div className="flex-1 overflow-hidden pt-6 px-6 pb-6">
        <div className="space-y-1 h-full flex flex-col">
          <h3 className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-4 px-3 flex-shrink-0">
            Table of Contents
          </h3>
          <div className="flex-1 space-y-1 overflow-hidden">
            {SECTIONS.map((section) => {
              const Icon = section.icon;
              const isActive = location === section.href || location.startsWith(section.href);
              
              return (
                <Link key={section.id} href={section.href}>
                  <motion.button
                    whileHover={{ x: 4 }}
                    className={cn(
                      "w-full text-left px-3 py-2 text-sm rounded-lg transition-all duration-200",
                      "flex items-center gap-3 group",
                      "border-l-2",
                      isActive
                        ? "text-white bg-white/10 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                        : "text-gray-200 hover:text-white hover:bg-white/5 border-transparent hover:border-blue-500/50"
                    )}
                    onClick={onItemClick}
                  >
                    <Icon className={cn(
                      "w-4 h-4 transition-colors flex-shrink-0",
                      isActive ? "text-blue-400" : "text-gray-300 group-hover:text-blue-400"
                    )} />
                    <span className="truncate">{section.label}</span>
                  </motion.button>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}

