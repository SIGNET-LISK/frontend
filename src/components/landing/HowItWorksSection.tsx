import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { Upload, Fingerprint, ShieldCheck, ArrowRight } from "lucide-react";

const STEPS = [
    {
        id: 1,
        title: "Upload & Hash",
        desc: "Your content is processed locally using advanced perceptual hashing (pHash) to create a unique digital fingerprint.",
        icon: Upload,
        color: "blue",
    },
    {
        id: 2,
        title: "Blockchain Timestamp",
        desc: "The fingerprint is cryptographically signed and permanently stored on the Lisk L2 blockchain for immutable proof.",
        icon: Fingerprint,
        color: "purple",
    },
    {
        id: 3,
        title: "Instant Verification",
        desc: "Anyone can verify the content's authenticity by comparing it against the on-chain record in milliseconds.",
        icon: ShieldCheck,
        color: "rose",
    },
];

export const HowItWorksSection = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % STEPS.length);
        }, 5000); // Change every 5 seconds

        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    const handleStepClick = (index: number) => {
        setActiveStep(index);
        setIsAutoPlaying(false); // Stop auto-play on interaction
    };

    return (
        <section id="how-it-works" className="py-24 relative z-10 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        How SIGNET Works
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl">
                        Three simple steps to guarantee authenticity and protect your digital assets.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                    {/* Left Column: Text & Steps */}
                    <div className="space-y-8">
                        {STEPS.map((step, index) => (
                            <motion.div
                                key={step.id}
                                className={`relative pl-8 cursor-pointer group transition-all duration-300 ${activeStep === index ? "opacity-100" : "opacity-40 hover:opacity-70"
                                    }`}
                                onClick={() => handleStepClick(index)}
                                whileHover={{ x: 10 }}
                            >
                                {/* Vertical Line */}
                                <div
                                    className={`absolute left-0 top-0 bottom-0 w-1 rounded-full transition-colors duration-500 ${activeStep === index
                                        ? step.color === "blue"
                                            ? "bg-blue-500"
                                            : step.color === "purple"
                                                ? "bg-purple-500"
                                                : "bg-rose-500"
                                        : "bg-white/10"
                                        }`}
                                />

                                <h3 className={`text-2xl font-bold mb-2 transition-colors duration-300 ${activeStep === index ? "text-white" : "text-gray-300"
                                    }`}>
                                    {step.title}
                                </h3>
                                <p className="text-gray-400 leading-relaxed">
                                    {step.desc}
                                </p>

                                {activeStep === index && (
                                    <motion.div
                                        layoutId="active-indicator"
                                        className="mt-4 flex items-center gap-2 text-sm font-medium"
                                        style={{
                                            color: step.color === "blue" ? "#60A5FA" : step.color === "purple" ? "#C084FC" : "#FB7185"
                                        }}
                                    >
                                        Learn more <ArrowRight className="w-4 h-4" />
                                    </motion.div>
                                )}
                            </motion.div>
                        ))}
                    </div>

                    {/* Right Column: 3D Rotating Card Animation */}
                    <div className="relative h-[400px] md:h-[500px] flex items-center justify-center perspective-1000">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeStep}
                                initial={{ opacity: 0, rotateY: -90, x: 100 }}
                                animate={{ opacity: 1, rotateY: 0, x: 0 }}
                                exit={{ opacity: 0, rotateY: 90, x: -100 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 200,
                                    damping: 20,
                                    duration: 0.5
                                }}
                                className="absolute inset-0 flex items-center justify-center"
                                style={{ perspective: 1000 }}
                            >
                                <GlassCard className={`w-full max-w-md aspect-square flex flex-col items-center justify-center p-8 md:p-12 relative overflow-hidden ${STEPS[activeStep].color === "blue"
                                    ? "border-blue-500/30 bg-blue-900/10"
                                    : STEPS[activeStep].color === "purple"
                                        ? "border-purple-500/30 bg-purple-900/10"
                                        : "border-rose-500/30 bg-rose-900/10"
                                    }`}>

                                    {/* Background Glow */}
                                    <div className={`absolute inset-0 opacity-20 blur-3xl transition-colors duration-500 ${STEPS[activeStep].color === "blue"
                                        ? "bg-blue-500"
                                        : STEPS[activeStep].color === "purple"
                                            ? "bg-purple-500"
                                            : "bg-rose-500"
                                        }`} />

                                    {/* Icon Circle */}
                                    <motion.div
                                        initial={{ scale: 0, rotate: -180 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        transition={{ delay: 0.2, type: "spring" }}
                                        className={`relative z-10 w-32 h-32 rounded-full flex items-center justify-center mb-8 border-2 ${STEPS[activeStep].color === "blue"
                                            ? "border-blue-400 bg-blue-500/20 text-blue-300"
                                            : STEPS[activeStep].color === "purple"
                                                ? "border-purple-400 bg-purple-500/20 text-purple-300"
                                                : "border-rose-400 bg-rose-500/20 text-rose-300"
                                            }`}
                                    >
                                        {(() => {
                                            const Icon = STEPS[activeStep].icon;
                                            return <Icon className="w-16 h-16" />;
                                        })()}
                                    </motion.div>

                                    {/* Step Number */}
                                    <div className="absolute top-6 right-6 text-8xl font-bold text-white/5 select-none">
                                        0{STEPS[activeStep].id}
                                    </div>

                                    <motion.h3
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="relative z-10 text-2xl md:text-3xl font-bold text-center mb-4"
                                    >
                                        {STEPS[activeStep].title}
                                    </motion.h3>

                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: "60px" }}
                                        transition={{ delay: 0.4, duration: 0.5 }}
                                        className={`h-1 rounded-full ${STEPS[activeStep].color === "blue"
                                            ? "bg-blue-500"
                                            : STEPS[activeStep].color === "purple"
                                                ? "bg-purple-500"
                                                : "bg-rose-500"
                                            }`}
                                    />
                                </GlassCard>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};
