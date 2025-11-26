import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { GlowButton } from "@/components/ui/glow-button";
import {
    Check,
    ArrowRight,
    CheckCircle,
    XCircle,
    Clock,
    Shield,
    Zap,
    Building2,
    Users
} from "lucide-react";
import { Link } from "wouter";

const CheckItem = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <li className={`flex items-start gap-2 text-sm text-muted-foreground ${className}`}>
        <CheckCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5 drop-shadow-[0_0_5px_rgba(59,130,246,0.5)]" />
        <span className="flex-1">{children}</span>
    </li>
);

const StatusItem = ({ label, value }: { label: string; value: string }) => (
    <div className="flex justify-between items-center text-sm py-1 border-b border-border last:border-0">
        <span className="text-muted-foreground">{label}</span>
        <span className="text-foreground font-medium">{value}</span>
    </div>
);

interface PricingSectionProps {
    onConnect?: () => void;
}

export const PricingSection = ({ onConnect }: PricingSectionProps) => {
    const plans = [
        {
            name: "FREE",
            badge: "Launch Edition",
            status: "Available Now",
            description: "For early adopters, journalists, photographers, and researchers.",
            price: "Free",
            period: "Forever",
            icon: Users,
            features: [
                "Manual content registration (dashboard)",
                "Generate perceptual hash (pHash)",
                "Lisk blockchain fingerprinting",
                "View history & proof TX hash",
                "Unlimited verification portal",
                "API access (Limited quota)",
                "Email Support"
            ],
            limits: [
                { label: "Registration Quota", value: "10,000 / mo" },
                { label: "API Verify Requests", value: "50,000 / mo" },
                { label: "Publisher Wallet", value: "1" },
                { label: "Compute Priority", value: "Normal" }
            ],
            cta: "Connect Wallet",
            action: onConnect,
            highlight: true,
            color: "blue"
        },
        {
            name: "BUSINESS",
            badge: "Coming Soon",
            status: "Waitlist",
            description: "For regional media, creative agencies, and startups.",
            price: "Scale",
            period: "Custom",
            icon: Zap,
            features: [
                "500k API requests / month",
                "100k Content registrations / month",
                "Up to 10 Publisher Wallets",
                "Dashboard analytics & insights",
                "High Priority Compute",
                "SLA Support & Onboarding"
            ],
            limits: [],
            cta: "Join Waitlist",
            action: () => window.open("mailto:sales@signet.com?subject=Business%20Plan%20Inquiry", "_blank"),
            highlight: false,
            color: "purple"
        },
        {
            name: "ENTERPRISE",
            badge: "Coming Soon",
            status: "Contact Sales",
            description: "For national media, government, and security operations.",
            price: "Custom",
            period: "Contact",
            icon: Building2,
            features: [
                "Unlimited verification & registration",
                "Dedicated blockchain indexer node",
                "Private endpoints & secure tunnel",
                "On-premise / air-gapped option",
                "24/7 SLA Priority Support",
                "Custom ML model tuning",
                "Legal forensics compliance"
            ],
            limits: [],
            cta: "Contact Sales",
            action: () => window.open("mailto:sales@signet.com?subject=Enterprise%20Plan%20Inquiry", "_blank"),
            highlight: false,
            color: "rose"
        }
    ];

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
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
                        Choose Your Plan
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Start for free with our Launch Edition, or scale up for enterprise-grade verification and security needs.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                    {plans.map((plan, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="h-full"
                        >
                            <GlassCard
                                className={`relative flex flex-col h-full p-6 ${plan.highlight
                                    ? "border-blue-500/20 dark:border-blue-500/30 shadow-[0_0_40px_rgba(59,130,246,0.1)] dark:shadow-[0_0_40px_rgba(59,130,246,0.15)] bg-blue-500/5 dark:bg-blue-900/10"
                                    : "hover:border-white/[0.15] dark:hover:border-white/20"
                                    }`}
                            >
                                {plan.badge && (
                                    <div className={`absolute top-0 right-0 px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-bl-xl rounded-tr-[20px] border-l border-b ${plan.color === 'blue' ? 'bg-blue-600/80 dark:bg-blue-600/80 border-blue-400/30 text-white dark:text-white' :
                                        plan.color === 'purple' ? 'bg-purple-600/80 dark:bg-purple-600/80 border-purple-400/30 text-white dark:text-white' :
                                            'bg-rose-600/80 dark:bg-rose-600/80 border-rose-400/30 text-white dark:text-white'
                                        }`}>
                                        {plan.badge}
                                    </div>
                                )}

                                <div className="mb-6">
                                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${plan.color === 'blue' ? 'bg-blue-500/20 text-blue-400' :
                                        plan.color === 'purple' ? 'bg-purple-500/20 text-purple-400' :
                                            'bg-rose-500/20 text-rose-400'
                                        }`}>
                                        <plan.icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold text-foreground mb-2">
                                        {plan.name}
                                    </h3>
                                    <p className="text-sm text-muted-foreground min-h-[40px]">
                                        {plan.description}
                                    </p>
                                </div>

                                <div className="mb-6 pb-6 border-b border-white/[0.08] dark:border-white/[0.08]">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-3xl font-bold text-foreground">
                                            {plan.price}
                                        </span>
                                        {plan.period && <span className="text-muted-foreground text-sm">/ {plan.period}</span>}
                                    </div>
                                </div>

                                <div className="flex-1 space-y-6">
                                    <div>
                                        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                                            Features
                                        </h4>
                                        <ul className="space-y-3">
                                            {plan.features.map((feat, j) => (
                                                <CheckItem key={j}>{feat}</CheckItem>
                                            ))}
                                        </ul>
                                    </div>

                                    {plan.limits.length > 0 && (
                                        <div>
                                            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                                                Limits
                                            </h4>
                                            <div className="bg-white/[0.05] dark:bg-white/5 rounded-lg p-3 space-y-1 border border-white/[0.05] dark:border-white/[0.05]">
                                                {plan.limits.map((limit, k) => (
                                                    <StatusItem key={k} label={limit.label} value={limit.value} />
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-8">
                                    <GlowButton
                                        variant={plan.highlight ? "primary" : "secondary"}
                                        className="w-full justify-center"
                                        onClick={plan.action}
                                        disabled={!plan.highlight && !plan.action}
                                    >
                                        {plan.cta}
                                    </GlowButton>
                                </div>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="text-center"
                >
                    <Link href="/pricing">
                        <span className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group text-sm cursor-pointer">
                            See full pricing details
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </Link>

                </motion.div>
            </div>
        </section>
    );
};
