import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { GlowButton } from "@/components/ui/glow-button";
import {
    CheckCircle,
    Building2,
    Users,
    ArrowRight
} from "lucide-react";
import { Link } from "wouter";

const CheckItem = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <li className={`flex items-start gap-3 text-sm text-muted-foreground ${className}`}>
        <CheckCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5 drop-shadow-[0_0_5px_rgba(59,130,246,0.5)]" />
        <span className="flex-1 leading-tight">{children}</span>
    </li>
);

interface PricingSectionProps {
    onConnect?: () => void;
}

export const PricingSection = ({ onConnect }: PricingSectionProps) => {
    const plans = [
        {
            name: "STARTER",
            badge: "Live Now",
            status: "Available Now",
            description: "Essential tools for content creators and journalists.",
            price: "Free",
            period: "Forever",
            icon: Users,
            features: [
                "Content Registration & Hashing",
                "Lisk Blockchain Store Hashing",
                "Unlimited Verification Portal",
                "Community Support"
            ],
            cta: "Start Verifying",
            action: onConnect,
            highlight: true,
            color: "blue"
        },
        {
            name: "ENTERPRISE",
            badge: "Coming Soon",
            status: "Contact Sales",
            description: "Custom solutions for large-scale organizations.",
            price: "Custom",
            period: "Contact",
            icon: Building2,
            features: [
                "Unlimited Scale & Throughput",
                "Dedicated Blockchain Nodes",
                "On-Premise Deployment",
                "Custom SLA & Compliance",
                "24/7 Dedicated Support"
            ],
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
                        Simple, Transparent Pricing
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        Start for free. Upgrade as you grow.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12">
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
                                className={`relative flex flex-col h-full p-8 ${plan.highlight
                                    ? "border-blue-500/20 dark:border-blue-500/30 shadow-[0_0_40px_rgba(59,130,246,0.1)] dark:shadow-[0_0_40px_rgba(59,130,246,0.15)] bg-blue-500/5 dark:bg-blue-900/10"
                                    : "opacity-80 hover:opacity-100 transition-opacity"
                                    }`}
                            >
                                {plan.badge && (
                                    <div className={`absolute top-0 right-0 px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded-bl-2xl rounded-tr-[22px] border-l border-b ${plan.color === 'blue' ? 'bg-blue-600/90 border-blue-400/30 text-white' :
                                        plan.color === 'purple' ? 'bg-purple-600/90 border-purple-400/30 text-white' :
                                            'bg-rose-600/90 border-rose-400/30 text-white'
                                        }`}>
                                        {plan.badge}
                                    </div>
                                )}

                                <div className="mb-8">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${plan.color === 'blue' ? 'bg-blue-500/20 text-blue-400' :
                                        plan.color === 'purple' ? 'bg-purple-500/20 text-purple-400' :
                                            'bg-rose-500/20 text-rose-400'
                                        }`}>
                                        <plan.icon className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-foreground mb-2">
                                        {plan.name}
                                    </h3>
                                    <p className="text-sm text-muted-foreground min-h-[40px] leading-relaxed">
                                        {plan.description}
                                    </p>
                                </div>

                                <div className="mb-8">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-4xl font-bold text-foreground">
                                            {plan.price}
                                        </span>
                                        {plan.period && plan.price !== "Free" && plan.price !== "Custom" && plan.price !== "TBD" && <span className="text-muted-foreground text-sm">/ {plan.period}</span>}
                                    </div>
                                </div>

                                <div className="flex-1 mb-8">
                                    <ul className="space-y-4">
                                        {plan.features.map((feat, j) => (
                                            <CheckItem key={j}>{feat}</CheckItem>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <GlowButton
                                        variant={plan.highlight ? "primary" : "secondary"}
                                        className="w-full justify-center py-6 text-base"
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
                    <Link href="/contact">
                        <span className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group text-sm cursor-pointer">
                            Have more questions? Contact us
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

