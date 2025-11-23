import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { GlowButton } from "@/components/ui/glow-button";
import {
    Check,
    Lock,
    ArrowRight
} from "lucide-react";
import { Link } from "wouter";

const CheckItem = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <li className={`flex items-start gap-2 text-sm text-gray-300 ${className}`}>
        <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
        <span>{children}</span>
    </li>
);

const LimitItem = ({ label, value }: { label: string; value: string }) => (
    <div className="flex justify-between items-center text-sm py-1 border-b border-white/[0.05] last:border-0">
        <span className="text-gray-400">{label}</span>
        <span className="text-white font-medium">{value}</span>
    </div>
);

export const PricingSection = () => {
    return (
        <section id="pricing" className="py-24 relative z-10">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        SIGNET Pricing
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Transparent pricing for everyone. From individual creators to global enterprises.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    {/* FREE PLAN */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="h-full"
                    >
                        <GlassCard className="h-full flex flex-col relative overflow-hidden border-t-4 border-t-green-500">
                            <div className="absolute top-0 right-0 bg-green-500/20 text-green-300 text-xs font-bold px-3 py-1 rounded-bl-lg backdrop-blur-md">
                                AVAILABLE NOW
                            </div>

                            <div className="mb-6">
                                <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                                    Free <span className="text-sm font-normal text-gray-400">(Launch Edition)</span>
                                </h3>
                                <div className="text-3xl font-bold text-green-400">$0 <span className="text-sm text-gray-400 font-normal">/ month</span></div>
                                <p className="text-sm text-gray-400 mt-2">For early adopters & individuals.</p>
                            </div>

                            <div className="space-y-6 flex-1">
                                <div>
                                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Best For</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {["Journalists", "Photographers", "Researchers", "Students"].map((tag) => (
                                            <span key={tag} className="text-xs bg-white/[0.05] text-gray-300 px-2 py-1 rounded border border-white/[0.05]">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Features</h4>
                                    <ul className="space-y-2">
                                        <CheckItem>Manual content registration</CheckItem>
                                        <CheckItem>Generate perceptual hash (pHash)</CheckItem>
                                        <CheckItem>Lisk blockchain registration</CheckItem>
                                        <CheckItem>History & proof TX hash</CheckItem>
                                        <CheckItem>Unlimited verification portal</CheckItem>
                                        <CheckItem>API access (Limited quota)</CheckItem>
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Limits</h4>
                                    <div className="bg-white/[0.03] rounded-lg p-3 space-y-1">
                                        <LimitItem label="Registration Quota" value="10,000 / mo" />
                                        <LimitItem label="API Verify Requests" value="50,000 / mo" />
                                        <LimitItem label="Publisher Wallet" value="1" />
                                        <LimitItem label="Compute Priority" value="Normal" />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-white/[0.05]">
                                <Link href="/register">
                                    <GlowButton className="w-full bg-green-500/20 hover:bg-green-500/30 text-green-300 border-green-500/50">
                                        Get Started Free
                                    </GlowButton>
                                </Link>
                                <p className="text-xs text-center text-gray-500 mt-3">
                                    Accelerate adoption & prove value.
                                </p>
                            </div>
                        </GlassCard>
                    </motion.div>

                    {/* BUSINESS PLAN */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="h-full"
                    >
                        <GlassCard className="h-full flex flex-col relative overflow-hidden border-t-4 border-t-blue-500 opacity-90">
                            <div className="absolute top-0 right-0 bg-blue-500/20 text-blue-300 text-xs font-bold px-3 py-1 rounded-bl-lg backdrop-blur-md flex items-center gap-1">
                                <Lock className="w-3 h-3" /> COMING SOON
                            </div>

                            <div className="mb-6">
                                <h3 className="text-2xl font-bold text-white mb-2">Business</h3>
                                <div className="text-xl font-bold text-gray-400">Waitlist</div>
                                <p className="text-sm text-gray-400 mt-2">For agencies & regional media.</p>
                            </div>

                            <div className="space-y-6 flex-1">
                                <div>
                                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Best For</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {["Regional Media", "Creative Agencies", "Local TV", "Startups"].map((tag) => (
                                            <span key={tag} className="text-xs bg-white/[0.05] text-gray-300 px-2 py-1 rounded border border-white/[0.05]">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Key Benefits</h4>
                                    <ul className="space-y-2">
                                        <CheckItem>Dashboard analytics & insights</CheckItem>
                                        <CheckItem>Priority compute (High)</CheckItem>
                                        <CheckItem>SLA support & onboarding</CheckItem>
                                        <CheckItem>Multi-wallet support (Up to 10)</CheckItem>
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Expanded Limits</h4>
                                    <div className="bg-white/[0.03] rounded-lg p-3 space-y-1">
                                        <LimitItem label="Registration Quota" value="100,000 / mo" />
                                        <LimitItem label="API Verify Requests" value="500,000 / mo" />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-white/[0.05]">
                                <button className="w-full py-3 px-4 rounded-lg bg-white/[0.05] text-gray-400 border border-white/[0.1] hover:bg-white/[0.1] transition-colors text-sm font-medium cursor-not-allowed">
                                    Join Waitlist
                                </button>
                            </div>
                        </GlassCard>
                    </motion.div>

                    {/* ENTERPRISE PLAN */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="h-full"
                    >
                        <GlassCard className="h-full flex flex-col relative overflow-hidden border-t-4 border-t-red-500 opacity-90">
                            <div className="absolute top-0 right-0 bg-red-500/20 text-red-300 text-xs font-bold px-3 py-1 rounded-bl-lg backdrop-blur-md flex items-center gap-1">
                                <Lock className="w-3 h-3" /> COMING SOON
                            </div>

                            <div className="mb-6">
                                <h3 className="text-2xl font-bold text-white mb-2">Enterprise</h3>
                                <div className="text-xl font-bold text-gray-400">Custom</div>
                                <p className="text-sm text-gray-400 mt-2">For national media & government.</p>
                            </div>

                            <div className="space-y-6 flex-1">
                                <div>
                                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Best For</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {["National Media", "Government", "Law Firms", "Security Ops"].map((tag) => (
                                            <span key={tag} className="text-xs bg-white/[0.05] text-gray-300 px-2 py-1 rounded border border-white/[0.05]">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Exclusive Features</h4>
                                    <ul className="space-y-2">
                                        <CheckItem>Unlimited verification & registration</CheckItem>
                                        <CheckItem>Dedicated blockchain indexer node</CheckItem>
                                        <CheckItem>Private endpoints & secure tunnel</CheckItem>
                                        <CheckItem>On-premise / air-gapped option</CheckItem>
                                        <CheckItem>SLA 24/7 priority support</CheckItem>
                                        <CheckItem>Custom similarity ML model tuning</CheckItem>
                                        <CheckItem>Legal forensics compliance</CheckItem>
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-white/[0.05]">
                                <button className="w-full py-3 px-4 rounded-lg bg-white/[0.05] text-gray-400 border border-white/[0.1] hover:bg-white/[0.1] transition-colors text-sm font-medium cursor-not-allowed">
                                    Contact Sales
                                </button>
                            </div>
                        </GlassCard>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="flex justify-center"
                >
                    <Link href="/pricing">
                        <button className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors px-6 py-3 rounded-full border border-white/[0.1] hover:border-white/[0.3] bg-white/[0.02] hover:bg-white/[0.05]">
                            See Full Pricing Details
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};
