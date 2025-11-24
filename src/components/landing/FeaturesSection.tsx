import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Fingerprint,
    Lock,
    Zap,
    ShieldCheck,
    Activity,
    Search,
    X,
    ArrowRight,
} from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { cn } from "@/lib/utils";

const FEATURES = [
    {
        id: "perceptual-hashing",
        icon: Fingerprint,
        title: "Perceptual Hashing",
        shortDesc: "Detect near-duplicate and manipulated media with AI.",
        longDesc:
            "Unlike traditional cryptographic hashes (like SHA-256) that change completely with a single bit flip, our perceptual hashing (pHash) technology generates a fingerprint based on the visual content. This allows us to detect resized, cropped, or slightly color-graded versions of the same image, as well as identify malicious manipulations.",
        tags: ["AI Analysis", "Content ID", "Robust"],
        gradient: "from-blue-500/20 to-cyan-500/20",
        border: "group-hover:border-blue-500/50",
    },
    {
        id: "immutable-record",
        icon: Lock,
        title: "Immutable Record",
        shortDesc: "Every signature is permanently stored on Lisk L2.",
        longDesc:
            "We leverage the Lisk Layer 2 blockchain to create an unalterable timestamp and proof of existence for every piece of content. Once a signature is minted, it cannot be changed, deleted, or censored, providing a mathematically verifiable chain of custody from the moment of creation.",
        tags: ["Blockchain", "Lisk L2", "Security"],
        gradient: "from-purple-500/20 to-pink-500/20",
        border: "group-hover:border-purple-500/50",
    },
    {
        id: "verification-api",
        icon: Zap,
        title: "Verification API",
        shortDesc: "Enterprise-grade API for bulk checking at scale.",
        longDesc:
            "Built for platforms that handle millions of uploads. Our high-performance REST and GraphQL APIs allow social media networks, news organizations, and marketplaces to automatically verify content authenticity in real-time before it's published to their users.",
        tags: ["Developer Tools", "High Performance", "Scalable"],
        gradient: "from-amber-500/20 to-orange-500/20",
        border: "group-hover:border-amber-500/50",
    },
    {
        id: "publisher-identity",
        icon: ShieldCheck,
        title: "Publisher Identity",
        shortDesc: "Verified publishers ensure content legitimacy.",
        longDesc:
            "Trust the source, not just the content. SIGNET links media signatures to verified on-chain identities (DID). This allows viewers to instantly see if a video actually came from the BBC, CNN, or a government official, effectively neutralizing impersonation attacks.",
        tags: ["Identity", "DID", "Trust"],
        gradient: "from-emerald-500/20 to-green-500/20",
        border: "group-hover:border-emerald-500/50",
    },
    {
        id: "anti-deepfake",
        icon: Activity,
        title: "Anti-Deepfake Defense",
        shortDesc: "Identify synthetic media instantly.",
        longDesc:
            "Our multi-layered defense system combines metadata analysis, provenance tracking, and AI detection models to flag potentially synthetic content. We provide a 'Trust Score' for every piece of media, giving users context about its origin and integrity.",
        tags: ["AI Safety", "Deepfake Detection", "Protection"],
        gradient: "from-red-500/20 to-rose-500/20",
        border: "group-hover:border-red-500/50",
    },
    {
        id: "public-portal",
        icon: Search,
        title: "Public Portal",
        shortDesc: "Anyone can verify content without an account.",
        longDesc:
            "Transparency is key to trust. Our public verification portal allows journalists, researchers, and the general public to upload a file or paste a URL to instantly check its history, origin, and authenticity status—no login or subscription required.",
        tags: ["Open Access", "Transparency", "Free"],
        gradient: "from-indigo-500/20 to-violet-500/20",
        border: "group-hover:border-indigo-500/50",
    },
];

export function FeaturesSection() {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    // Close modal on escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setSelectedId(null);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <section id="features" className="py-24 relative z-10">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 text-center md:text-left"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
                        Powerful Features
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Everything you need to secure digital trust.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {FEATURES.map((feature) => (
                        <motion.div
                            key={feature.id}
                            layoutId={`card-${feature.id}`}
                            onClick={() => setSelectedId(feature.id)}
                            className={cn(
                                "relative group cursor-pointer rounded-3xl overflow-hidden",
                                "border border-white/[0.1] dark:border-white/[0.08] bg-white/[0.05] dark:bg-white/[0.02] backdrop-blur-[12px]",
                                "hover:bg-white/[0.08] dark:hover:bg-white/[0.05] hover:border-white/[0.15] dark:hover:border-white/[0.12]",
                                "transition-colors duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.15)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
                            )}
                            whileHover={{ y: -5 }}
                        >
                            {/* Gradient Background Effect */}
                            <div
                                className={cn(
                                    "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br",
                                    feature.gradient
                                )}
                            />

                            <div className="relative p-8 h-full flex flex-col">
                                <div
                                    className={cn(
                                        "w-12 h-12 rounded-xl flex items-center justify-center mb-6",
                                        "bg-white/[0.05] dark:bg-white/5 border border-white/[0.1] dark:border-white/[0.08]",
                                        "group-hover:scale-110 transition-transform duration-500",
                                        feature.border
                                    )}
                                >
                                    <feature.icon className="w-6 h-6 text-foreground" />
                                </div>

                                <motion.h3
                                    layoutId={`title-${feature.id}`}
                                    className="text-xl font-semibold mb-3 text-foreground"
                                >
                                    {feature.title}
                                </motion.h3>

                                <motion.p
                                    layoutId={`desc-${feature.id}`}
                                    className="text-muted-foreground text-sm leading-relaxed mb-6"
                                >
                                    {feature.shortDesc}
                                </motion.p>

                                <div className="mt-auto flex items-center text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                                    Learn more <ArrowRight className="w-4 h-4 ml-2" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <AnimatePresence>
                    {selectedId && (
                        <>
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedId(null)}
                                className="fixed inset-0 bg-background/60 dark:bg-black/60 backdrop-blur-sm z-50"
                            />

                            {/* Modal */}
                            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                                {FEATURES.map(
                                    (feature) =>
                                        feature.id === selectedId && (
                                            <motion.div
                                                key={feature.id}
                                                layoutId={`card-${feature.id}`}
                                                className="w-full max-w-5xl bg-white/[0.05] dark:bg-[#0A0A0A] backdrop-blur-[12px] border border-white/[0.1] dark:border-white/[0.08] rounded-3xl overflow-hidden shadow-2xl pointer-events-auto relative"
                                            >
                                                {/* Close Button */}
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedId(null);
                                                    }}
                                                    className="absolute top-4 right-4 p-2 rounded-full bg-white/5 dark:bg-white/5 hover:bg-white/10 dark:hover:bg-white/10 transition-colors z-10"
                                                >
                                                    <X className="w-5 h-5 text-foreground" />
                                                </button>

                                                <div className="grid md:grid-cols-2 h-full">
                                                    {/* Left: Visual/Icon */}
                                                    <div
                                                        className={cn(
                                                            "p-8 flex items-center justify-center relative overflow-hidden",
                                                            "bg-gradient-to-br",
                                                            feature.gradient
                                                        )}
                                                    >
                                                        <feature.icon className="w-32 h-32 text-foreground drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" />

                                                        {/* Decorative circles */}
                                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-foreground/20 rounded-full opacity-20 scale-150" />
                                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-foreground/20 rounded-full opacity-30 scale-125" />
                                                    </div>

                                                    {/* Right: Content */}
                                                    <div className="p-8 flex flex-col justify-center bg-background dark:bg-[#0A0A0A]">
                                                        <motion.h3
                                                            layoutId={`title-${feature.id}`}
                                                            className="text-3xl font-bold mb-4 text-foreground"
                                                        >
                                                            {feature.title}
                                                        </motion.h3>

                                                        <div className="flex flex-wrap gap-2 mb-6">
                                                            {feature.tags.map((tag, i) => (
                                                                <span
                                                                    key={i}
                                                                    className="px-3 py-1 text-xs font-medium rounded-full bg-white/[0.05] dark:bg-white/5 border border-white/[0.1] dark:border-white/[0.08] text-muted-foreground"
                                                                >
                                                                    {tag}
                                                                </span>
                                                            ))}
                                                        </div>

                                                        <motion.p
                                                            layoutId={`desc-${feature.id}`}
                                                            className="text-muted-foreground leading-relaxed mb-8"
                                                        >
                                                            {feature.longDesc}
                                                        </motion.p>

                                                        <button
                                                            onClick={() => setSelectedId(null)}
                                                            className="w-full py-3 rounded-xl bg-foreground text-background font-semibold hover:opacity-90 transition-opacity"
                                                        >
                                                            Got it
                                                        </button>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )
                                )}
                            </div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
