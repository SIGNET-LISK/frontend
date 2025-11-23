import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  Key,
  Code,
  CheckCircle2,
  Upload,
  Building2,
  FileText,
  Gauge,
  Terminal,
  AlertCircle,
} from "lucide-react";

type Section = {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  subsections?: string[];
};

const SECTIONS: Section[] = [
  { id: "introduction", label: "Introduction", icon: BookOpen },
  { id: "authentication", label: "Authentication", icon: Key },
  {
    id: "endpoints",
    label: "Endpoints",
    icon: Code,
    subsections: ["verify", "register", "publisher", "content"],
  },
  { id: "rate-limits", label: "Rate Limits", icon: Gauge },
  { id: "sdk-examples", label: "SDK Examples", icon: Terminal },
  { id: "error-codes", label: "Error Codes", icon: AlertCircle },
];

type DocsSidebarProps = {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
};

export function DocsSidebar({ activeSection, onSectionChange, isMobileOpen, onMobileClose }: DocsSidebarProps) {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    onSectionChange(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    if (onMobileClose) onMobileClose();
  };

  return (
    <motion.aside
      initial={{ x: -280, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -280, opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "fixed lg:sticky top-20 lg:top-20 h-[calc(100vh-80px)] w-[280px] flex flex-col z-40 overflow-y-auto custom-scrollbar",
        "bg-black/90 lg:bg-black/20 backdrop-blur-xl border-r border-white/10",
        isSticky && "lg:bg-black/30",
        !isMobileOpen && "hidden lg:flex"
      )}
    >
      <div className="p-6 space-y-1">
        <h3 className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-6 px-3">
          Documentation
        </h3>
        {SECTIONS.map((section) => (
          <div key={section.id} className="space-y-1">
            <button
              onClick={() => scrollToSection(section.id)}
              className={cn(
                "w-full text-left px-3 py-2.5 text-sm rounded-lg transition-all duration-300 flex items-center gap-3 group relative",
                activeSection === section.id
                  ? "text-white bg-blue-500/10 border-l-2 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.2)]"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              )}
            >
              {activeSection === section.id && (
                <motion.div
                  layoutId="activeSection"
                  className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-500 rounded-r"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <section.icon
                className={cn(
                  "w-4 h-4 transition-colors",
                  activeSection === section.id ? "text-blue-400" : "text-gray-500 group-hover:text-blue-400"
                )}
              />
              <span className="font-medium">{section.label}</span>
            </button>
            {section.subsections && activeSection.startsWith("endpoints") && (
              <div className="ml-7 space-y-1 mt-1">
                {section.subsections.map((sub) => (
                  <button
                    key={sub}
                    onClick={() => scrollToSection(`endpoint-${sub}`)}
                    className={cn(
                      "w-full text-left px-3 py-1.5 text-xs rounded transition-all duration-300",
                      activeSection === `endpoint-${sub}`
                        ? "text-blue-400 bg-blue-500/5"
                        : "text-gray-500 hover:text-gray-300 hover:bg-white/3"
                    )}
                  >
                    {sub.charAt(0).toUpperCase() + sub.slice(1)}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.aside>
  );
}

