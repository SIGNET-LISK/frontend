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
        gradient: "from-blue-500/20 to-cyan-500/20",
        accentColor: "#60A5FA",
    },
    {
        id: 2,
        title: "Blockchain Timestamp",
        desc: "The fingerprint is cryptographically signed and permanently stored on the Lisk L2 blockchain for immutable proof.",
        icon: Fingerprint,
        color: "purple",
        gradient: "from-purple-500/20 to-pink-500/20",
        accentColor: "#C084FC",
    },
    {
        id: 3,
        title: "Instant Verification",
        desc: "Anyone can verify the content's authenticity by comparing it against the on-chain record in milliseconds.",
        icon: ShieldCheck,
        color: "rose",
        gradient: "from-rose-500/20 to-orange-500/20",
        accentColor: "#FB7185",
    },
];

export const HowItWorksSection = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % STEPS.length);
            setProgress(0);
        }, 5000);

        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) return 100;
                return prev + 2;
            });
        }, 100);

        return () => {
            clearInterval(interval);
            clearInterval(progressInterval);
        };
    }, [activeStep]);

    const handleStepClick = (index: number) => {
        setActiveStep(index);
        setProgress(0);
    };

    return (
        <section id="how-it-works" className="pt-12 pb-24 md:pt-16 md:pb-32 relative z-10 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                        How SIGNET Works
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Three simple steps to guarantee authenticity and protect your digital assets.
                    </p>
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                    {/* Left: Interactive Steps Timeline */}
                    <div className="lg:col-span-5 space-y-6">
                        {STEPS.map((step, index) => {
                            const isActive = activeStep === index;
                            const Icon = step.icon;

                            return (
                                <motion.div
                                    key={step.id}
                                    className="relative"
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <motion.div
                                        className={`relative cursor-pointer group`}
                                        onClick={() => handleStepClick(index)}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <GlassCard
                                            className={`p-6 transition-all duration-500 ${isActive
                                                ? "border-white/30 bg-gradient-to-br " + step.gradient
                                                : "border-white/10 hover:border-white/20"
                                                }`}
                                        >
                                            <div className="flex items-start gap-4">
                                                {/* Step Number & Icon */}
                                                <div className="relative flex-shrink-0">
                                                    <motion.div
                                                        className={`w-16 h-16 rounded-xl flex items-center justify-center border-2 transition-all duration-500 ${isActive
                                                            ? `border-${step.color}-400 bg-${step.color}-500/20`
                                                            : "border-white/10 bg-white/5"
                                                            }`}
                                                        animate={
                                                            isActive
                                                                ? {
                                                                    boxShadow: [
                                                                        `0 0 20px ${step.accentColor}40`,
                                                                        `0 0 40px ${step.accentColor}60`,
                                                                        `0 0 20px ${step.accentColor}40`,
                                                                    ],
                                                                }
                                                                : {}
                                                        }
                                                        transition={{
                                                            duration: 2,
                                                            repeat: isActive ? Infinity : 0,
                                                        }}
                                                    >
                                                        <Icon
                                                            className={`w-8 h-8 transition-colors duration-500 ${isActive ? `text-${step.color}-300` : "text-gray-500"
                                                                }`}
                                                            style={isActive ? { color: step.accentColor } : {}}
                                                        />
                                                    </motion.div>
                                                    {/* Step number badge */}
                                                    <div
                                                        className={`absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 ${isActive
                                                            ? `bg-${step.color}-500 text-white`
                                                            : "bg-white/10 text-gray-500"
                                                            }`}
                                                        style={
                                                            isActive
                                                                ? { backgroundColor: step.accentColor }
                                                                : {}
                                                        }
                                                    >
                                                        {step.id}
                                                    </div>
                                                </div>

                                                {/* Content */}
                                                <div className="flex-1 min-w-0">
                                                    <h3
                                                        className={`text-xl font-bold mb-2 transition-colors duration-300 ${isActive ? "text-white" : "text-gray-400"
                                                            }`}
                                                    >
                                                        {step.title}
                                                    </h3>
                                                    <p
                                                        className={`text-sm leading-relaxed transition-all duration-300 ${isActive
                                                            ? "text-gray-300 opacity-100"
                                                            : "text-gray-500 opacity-70"
                                                            }`}
                                                    >
                                                        {step.desc}
                                                    </p>

                                                    {/* Progress bar for active step */}
                                                    {isActive && (
                                                        <motion.div
                                                            className="mt-4 h-1 bg-white/10 rounded-full overflow-hidden"
                                                            initial={{ opacity: 0 }}
                                                            animate={{ opacity: 1 }}
                                                            exit={{ opacity: 0 }}
                                                        >
                                                            <motion.div
                                                                className="h-full rounded-full"
                                                                style={{
                                                                    width: `${progress}%`,
                                                                    backgroundColor: step.accentColor,
                                                                }}
                                                            />
                                                        </motion.div>
                                                    )}
                                                </div>

                                                {/* Arrow indicator */}
                                                <motion.div
                                                    className="flex-shrink-0"
                                                    animate={
                                                        isActive
                                                            ? {
                                                                x: [0, 5, 0],
                                                                opacity: 1,
                                                            }
                                                            : { opacity: 0.3 }
                                                    }
                                                    transition={{
                                                        x: { duration: 1.5, repeat: Infinity },
                                                        opacity: { duration: 0.3 },
                                                    }}
                                                >
                                                    <ArrowRight
                                                        className="w-5 h-5"
                                                        style={isActive ? { color: step.accentColor } : {}}
                                                    />
                                                </motion.div>
                                            </div>
                                        </GlassCard>

                                        {/* Connecting line to next step */}
                                        {index < STEPS.length - 1 && (
                                            <div className="absolute left-8 top-full h-6 w-0.5 bg-gradient-to-b from-white/20 to-transparent" />
                                        )}
                                    </motion.div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Right: 3D Visual Card */}
                    <div className="lg:col-span-7 relative">
                        <div className="relative h-[500px] md:h-[600px] flex items-center justify-center">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeStep}
                                    initial={{ opacity: 0, rotateY: 90, scale: 0.8 }}
                                    animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                                    exit={{ opacity: 0, rotateY: -90, scale: 0.8 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 260,
                                        damping: 20,
                                    }}
                                    className="absolute inset-0 flex items-center justify-center"
                                    style={{ perspective: 1000 }}
                                >
                                    <GlassCard
                                        className={`w-full max-w-lg aspect-square flex flex-col items-center justify-center p-8 md:p-12 relative overflow-hidden transition-all duration-700 border-2`}
                                        style={{
                                            borderColor: STEPS[activeStep].accentColor + "40",
                                            backgroundColor: STEPS[activeStep].accentColor + "08",
                                        }}
                                    >
                                        {/* Animated Background Gradient */}
                                        <motion.div
                                            className="absolute inset-0 opacity-30 blur-3xl"
                                            style={{
                                                background: `radial-gradient(circle at 50% 50%, ${STEPS[activeStep].accentColor}40, transparent 70%)`,
                                            }}
                                            animate={{
                                                scale: [1, 1.2, 1],
                                                opacity: [0.3, 0.5, 0.3],
                                            }}
                                            transition={{
                                                duration: 3,
                                                repeat: Infinity,
                                                ease: "easeInOut",
                                            }}
                                        />

                                        {/* Floating particles */}
                                        {[...Array(8)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                className="absolute w-2 h-2 rounded-full"
                                                style={{
                                                    backgroundColor: STEPS[activeStep].accentColor,
                                                    top: `${20 + Math.random() * 60}%`,
                                                    left: `${10 + Math.random() * 80}%`,
                                                }}
                                                animate={{
                                                    y: [0, -30, 0],
                                                    opacity: [0.2, 0.8, 0.2],
                                                }}
                                                transition={{
                                                    duration: 2 + Math.random() * 2,
                                                    repeat: Infinity,
                                                    delay: Math.random() * 2,
                                                }}
                                            />
                                        ))}

                                        {/* Large Icon */}
                                        <motion.div
                                            initial={{ scale: 0, rotate: -180 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 200,
                                                delay: 0.2,
                                            }}
                                            className="relative z-10 w-40 h-40 rounded-2xl flex items-center justify-center mb-8 border-4"
                                            style={{
                                                borderColor: STEPS[activeStep].accentColor,
                                                backgroundColor: STEPS[activeStep].accentColor + "20",
                                                boxShadow: `0 0 60px ${STEPS[activeStep].accentColor}40`,
                                            }}
                                        >
                                            {(() => {
                                                const Icon = STEPS[activeStep].icon;
                                                return (
                                                    <Icon
                                                        className="w-20 h-20"
                                                        style={{ color: STEPS[activeStep].accentColor }}
                                                    />
                                                );
                                            })()}
                                        </motion.div>

                                        {/* Step Number Background */}
                                        <div
                                            className="absolute top-8 right-8 text-9xl font-bold opacity-5 select-none"
                                            style={{ color: STEPS[activeStep].accentColor }}
                                        >
                                            0{STEPS[activeStep].id}
                                        </div>

                                        {/* Title */}
                                        <motion.h3
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 }}
                                            className="relative z-10 text-3xl md:text-4xl font-bold text-center mb-4 text-white"
                                        >
                                            {STEPS[activeStep].title}
                                        </motion.h3>

                                        {/* Description */}
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.4 }}
                                            className="relative z-10 text-center text-gray-300 leading-relaxed max-w-md"
                                        >
                                            {STEPS[activeStep].desc}
                                        </motion.p>

                                        {/* Decorative Line */}
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: "80px" }}
                                            transition={{ delay: 0.5, duration: 0.5 }}
                                            className="mt-6 h-1 rounded-full"
                                            style={{ backgroundColor: STEPS[activeStep].accentColor }}
                                        />

                                        {/* Step Dots Indicator */}
                                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                                            {STEPS.map((_, idx) => (
                                                <motion.button
                                                    key={idx}
                                                    onClick={() => handleStepClick(idx)}
                                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${activeStep === idx ? "w-8" : ""
                                                        }`}
                                                    style={{
                                                        backgroundColor:
                                                            activeStep === idx
                                                                ? STEPS[activeStep].accentColor
                                                                : "#ffffff40",
                                                    }}
                                                    whileHover={{ scale: 1.2 }}
                                                    whileTap={{ scale: 0.9 }}
                                                />
                                            ))}
                                        </div>
                                    </GlassCard>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
