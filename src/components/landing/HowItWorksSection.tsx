import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { Upload, Fingerprint, ShieldCheck } from "lucide-react";
import Stack from "@/components/ui/Stack";

const STEPS = [
    {
        id: 1,
        title: "Upload & Hash",
        desc: "Your content is processed locally using advanced perceptual hashing (pHash) to create a unique digital fingerprint.",
        icon: Upload,
    },
    {
        id: 2,
        title: "Blockchain Timestamp",
        desc: "The fingerprint is cryptographically signed and permanently stored on the Lisk L2 blockchain for immutable proof.",
        icon: Fingerprint,
    },
    {
        id: 3,
        title: "Instant Verification",
        desc: "Anyone can verify the content's authenticity by comparing it against the on-chain record in milliseconds.",
        icon: ShieldCheck,
    },
];

export const HowItWorksSection = () => {
    const cardsData = STEPS.map((step) => {
        const Icon = step.icon;
        return {
            id: step.id,
            content: (
                <GlassCard
                    className="
                    w-full h-full flex flex-col items-center justify-center p-8 relative rounded-3xl
                    bg-white/[0.55] dark:bg-white/[0.05]
                    border border-gray-300 dark:border-white/10
                    backdrop-blur-md shadow-lg
                "
                >
                    {/* Step Number Badge */}
                    <div className="absolute top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold bg-white text-gray-900 dark:bg-white/10 dark:text-white shadow-md">
                        {step.id}
                    </div>

                    {/* Icon */}
                    <div
                        className="
                        w-28 h-28 rounded-3xl flex items-center justify-center mb-8 border border-gray-300 dark:border-white/10
                        bg-white/40 dark:bg-white/10
                        shadow-none
                    "
                    >
                        <Icon className="w-14 h-14 text-gray-900 dark:text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white text-center">
                        {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-base text-gray-700 dark:text-white/80 text-center leading-relaxed px-6">
                        {step.desc}
                    </p>

                    {/* Decorative line */}
                    <div className="mt-6 h-1 w-20 rounded-full bg-gray-600/30 dark:bg-white/30" />
                </GlassCard>
            ),
        };
    }).reverse();

    return (
        <section id="how-it-works" className="pt-12 pb-24 md:pt-16 md:pb-32 relative z-10 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-8"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
                        How SIGNET Works
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Three simple steps to guarantee authenticity and protect your digital assets.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6 order-2 lg:order-1"
                    >
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-lg text-muted-foreground leading-relaxed"
                        >
                            Our three-step process ensures your digital content is protected with cryptographic proof that's impossible to forge or manipulate.
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="text-lg text-muted-foreground leading-relaxed"
                        >
                            From local hashing to blockchain timestamping, every piece of content gets a unique fingerprint that proves authenticity in milliseconds.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="pt-6 border-t border-white/10"
                        >
                            <p className="text-base text-muted-foreground/80 italic">
                                ✨ <span className="font-medium">Drag the interactive cards</span> to explore each step of the process
                            </p>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex items-center justify-center order-1 lg:order-2"
                    >
                        <div className="w-full max-w-md flex items-center justify-center" style={{ minHeight: "540px" }}>
                            <Stack
                                randomRotation
                                sensitivity={160}
                                sendToBackOnClick
                                cardDimensions={{ width: 360, height: 480 }}
                                cardsData={cardsData}
                                animationConfig={{ stiffness: 260, damping: 20 }}
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
