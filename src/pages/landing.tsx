import { Link } from "wouter";
import { motion, useTransform, useMotionValue } from "framer-motion";
import { GlowButton } from "@/components/ui/glow-button";
import { GlassCard } from "@/components/ui/glass-card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowRight,
  ShieldCheck,
  Lock,
  Upload,
  Search,
  Fingerprint,
  Zap,
  CheckCircle,
  Activity,
  Scale,
  Building2,
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useAccount } from "wagmi";
import { useAppKit } from "@reown/appkit/react";
import abstractShapes from "@/assets/img/signet-logo.svg";
import LiquidEther from "@/components/LiquidEther";
import BlurText from "@/components/BlurText";
import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { RotatingCards } from "@/components/landing/RotatingCards";
import { PhoneVerification } from "@/components/illustrations/phone-verification";

const handleAnimationComplete = () => {
  console.log("Animation completed!");
};

const FEATURES = [
  {
    icon: Fingerprint,
    title: "Perceptual Hashing",
    desc: "Detect near-duplicate and manipulated media with AI-powered analysis.",
  },
  {
    icon: Lock,
    title: "Immutable Record",
    desc: "Every signature is permanently stored on Lisk L2 blockchain.",
  },
  {
    icon: Zap,
    title: "Verification API",
    desc: "Enterprise-grade API for bulk or automated checking at scale.",
  },
  {
    icon: ShieldCheck,
    title: "Publisher Identity",
    desc: "Verified publishers ensure content legitimacy and origin tracking.",
  },
  {
    icon: Activity,
    title: "Anti-Deepfake Defense",
    desc: "Identify synthetic or altered media instantly to stop misinformation.",
  },
  {
    icon: Search,
    title: "Public Portal",
    desc: "Anyone can verify any content instantly without an account.",
  },
];

const BENEFITS = [
  {
    icon: ShieldCheck,
    title: "Protect Brand Reputation",
    desc: "Prevent misinformation from damaging trust.",
  },
  {
    icon: Scale,
    title: "Legal & Compliance Ready",
    desc: "Immutable proofs for audits, legal cases, and reporting.",
  },
  {
    icon: Building2,
    title: "Built for Enterprise",
    desc: "Scalable for media, government, law firms, and investigators.",
  },
];

const PRICING_PLANS = [
  {
    name: "Pro",
    price: "$9.99",
    period: "/mo",
    features: [
      "Up to 10,000 verifications/month",
      "Priority hashing performance",
      "API access",
      "TX proof explorer",
    ],
    cta: "Connect Wallet",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    features: [
      "Unlimited verifications",
      "Dedicated API throughput",
      "SLA + enterprise support",
      "Private on-chain indexing",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

const FAQ_ITEMS = [
  {
    q: "What is perceptual hashing?",
    a: "A hashing technique that detects visually similar content by generating a unique digital fingerprint based on the visual features of an image or video, rather than its file data.",
  },
  {
    q: "Why blockchain?",
    a: "Once stored on the blockchain, fingerprints cannot be modified, deleted, or tampered with, providing an immutable and verifiable record of authenticity.",
  },
  {
    q: "Who is SIGNET for?",
    a: "SIGNET is designed for media outlets, enterprises, governments, legal investigators, and content creators who need to verify the authenticity of digital assets.",
  },
  {
    q: "Is verification public?",
    a: "Yes, the verification portal is open to the public, allowing anyone to check content authenticity against our blockchain records instantly.",
  },
];

// Floating particles component
const FloatingParticles = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
    >
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white/[0.03]"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Helper function to format address
const formatAddress = (address: string) => {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const scrollY = useMotionValue(0);
  const isInitialMount = useRef(true);
  const { isConnected, address } = useAccount();
  const { open } = useAppKit();
  const heroGap = useTransform(scrollY, [0, 300], [8, 64]); // 8px (very tight) to 64px (gap-16)
  const heroPaddingTop = useTransform(scrollY, [0, 300], [120, 128]); // 120px (below navbar) to 128px (py-32)
  const heroPaddingBottom = useTransform(scrollY, [0, 300], [20, 40]); // 20px (tight) to 40px (closer to next section)
  const [showDescription, setShowDescription] = useState(false);
  const [logoPosition, setLogoPosition] = useState<"top" | "bottom">("top");

  const handleConnectWallet = () => {
    if (isConnected) {
      // If connected, navigate to dashboard
      window.location.href = "/dashboard";
    } else {
      // If not connected, open wallet modal
      open();
    }
  };

  useEffect(() => {
    // Initialize scrollY value
    scrollY.set(window.scrollY);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Skip state updates on initial mount
      if (isInitialMount.current) {
        isInitialMount.current = false;
        return;
      }

      setScrolled(currentScrollY > 20);

      // Animate on scroll: logo pulled down, description fades in
      if (currentScrollY > 0 && !showDescription) {
        setShowDescription(true);
        setLogoPosition("bottom");
      } else if (currentScrollY === 0 && showDescription) {
        setShowDescription(false);
        setLogoPosition("top");
      }

      scrollY.set(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    // Set initial mount to false after a short delay to allow components to render
    const timer = setTimeout(() => {
      isInitialMount.current = false;
    }, 100);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, [scrollY, showDescription]);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden font-sans selection:bg-blue-500/30">
      {/* LiquidEther Background - Full Page Animation */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <LiquidEther
          colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>

      {/* Overlay gradient for text readability */}
      <div
        className="fixed inset-0 pointer-events-none bg-gradient-to-b from-black/80 via-black/40 to-black/80"
        style={{ zIndex: 1 }}
      />

      {/* Floating Particles */}
      <FloatingParticles />

      {/* Animated gradient orbs */}
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 2 }}
      >
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Navbar */}
      <LandingNavbar scrolled={scrolled} />

      {/* Hero Section */}
      <motion.section
        className="relative px-4 md:px-6 lg:px-8 overflow-hidden z-10"
        style={{
          paddingTop: heroPaddingTop,
          paddingBottom: heroPaddingBottom,
        }}
      >
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            className="flex flex-col items-center"
            style={{
              gap: heroGap,
            }}
          >
            {/* Title content - centered */}
            <motion.div
              className="text-center w-full"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col items-center w-full"
              >
                <BlurText
                  text="Protect the Truth"
                  delay={150}
                  animateBy="words"
                  direction="top"
                  onAnimationComplete={handleAnimationComplete}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight justify-center"
                />

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight mt-4 text-center">
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                    Verify Digital Content.
                  </span>
                </h1>
              </motion.div>
            </motion.div>

            {/* Container for overlapping logo and description with connected cards */}
            <div className="relative w-full flex items-center justify-center min-h-[600px] overflow-visible">
              {/* Description - behind logo (lower z-index), positioned closer to title */}
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-start pt-4 gap-6 w-full z-10"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: showDescription ? 1 : 0,
                }}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                }}
              >
                {/* Horizontal container for PhoneVerification and text */}
                <div className="flex flex-row items-center justify-center gap-6 md:gap-8 lg:gap-12 w-full max-w-6xl px-4">
                  <div className="w-48 md:w-56 lg:w-64 h-auto flex-shrink-0">
                    <PhoneVerification />
                  </div>
                  <div className="flex flex-col gap-4">
                    <p className="text-base md:text-lg lg:text-xl text-gray-300 max-w-xl leading-relaxed text-left">
                      An AI-powered, blockchain-backed platform to authenticate
                      images, videos, and documents — stopping deepfakes and
                      misinformation at the source.
                    </p>
                    <motion.div
                      className="flex items-center justify-start gap-4"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: showDescription ? 1 : 0,
                      }}
                      transition={{
                        duration: 0.5,
                        ease: "easeInOut",
                      }}
                    >
                      <Link href="/verify">
                        <GlowButton className="h-12 md:h-14 px-6 md:px-8 text-base md:text-lg group">
                          Verify Content Now
                          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </GlowButton>
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Logo with connected cards - on top (higher z-index) */}
              <motion.div
                className="relative flex items-center justify-center w-full z-20"
                initial={false}
                animate={logoPosition === "top" ? { y: 0 } : { y: 800 }}
                transition={
                  logoPosition === "top"
                    ? {
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                        bounce: 0.4,
                      }
                    : {
                        duration: 0.6,
                        ease: "easeInOut",
                      }
                }
              >
                {/* Container for logo and connected cards */}
                <div className="relative w-full max-w-5xl py-8 lg:py-12">
                  {/* SVG Lines for connections - behind cards */}
                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none z-10"
                    style={{ overflow: "visible" }}
                    viewBox="0 0 1200 800"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    {/* Line from logo center (middle-top) to top-left card */}
                    <motion.path
                      d="M 600 71 L 50 70"
                      stroke="url(#gradient1)"
                      strokeWidth="2.5"
                      strokeDasharray="6,4"
                      strokeLinecap="round"
                      fill="none"
                      filter="url(#glow)"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{
                        duration: 1.2,
                        delay: 0.5,
                        ease: "easeInOut",
                      }}
                    />
                    {/* Line from logo center (middle-top) to top-right card */}
                    <motion.path
                      d="M 700 60 L 1000 61"
                      stroke="url(#gradient2)"
                      strokeWidth="2.5"
                      strokeDasharray="6,4"
                      strokeLinecap="round"
                      fill="none"
                      filter="url(#glow)"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{
                        duration: 1.2,
                        delay: 0.7,
                        ease: "easeInOut",
                      }}
                    />
                    {/* Line from logo center (middle-top) to bottom card */}
                    <motion.path
                      d="M 605 500 L 600 10"
                      stroke="url(#gradient3)"
                      strokeWidth="2.5"
                      strokeDasharray="6,4"
                      strokeLinecap="round"
                      fill="none"
                      filter="url(#glow)"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{
                        duration: 1.2,
                        delay: 0.9,
                        ease: "easeInOut",
                      }}
                    />
                    {/* Gradient definitions with glow effect */}
                    <defs>
                      <linearGradient
                        id="gradient1"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop
                          offset="0%"
                          stopColor="#5227FF"
                          stopOpacity="0.8"
                        />
                        <stop
                          offset="50%"
                          stopColor="#7C3AED"
                          stopOpacity="0.7"
                        />
                        <stop
                          offset="100%"
                          stopColor="#FF9FFC"
                          stopOpacity="0.8"
                        />
                      </linearGradient>
                      <linearGradient
                        id="gradient2"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop
                          offset="0%"
                          stopColor="#5227FF"
                          stopOpacity="0.8"
                        />
                        <stop
                          offset="50%"
                          stopColor="#8B5CF6"
                          stopOpacity="0.7"
                        />
                        <stop
                          offset="100%"
                          stopColor="#B19EEF"
                          stopOpacity="0.8"
                        />
                      </linearGradient>
                      <linearGradient
                        id="gradient3"
                        x1="0%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          stopColor="#5227FF"
                          stopOpacity="0.8"
                        />
                        <stop
                          offset="50%"
                          stopColor="#A855F7"
                          stopOpacity="0.7"
                        />
                        <stop
                          offset="100%"
                          stopColor="#FF9FFC"
                          stopOpacity="0.8"
                        />
                      </linearGradient>
                      {/* Glow filter */}
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                          <feMergeNode in="coloredBlur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>
                  </svg>

                  {/* Connected Cards - arranged around logo */}
                  {[
                    {
                      title: "Upload & Hash",
                      desc: "Content is processed using perceptual hashing (pHash).",
                      icon: Upload,
                      position: "top-left",
                    },
                    {
                      title: "Fingerprint on Chain",
                      desc: "The hash is stored immutably on Lisk L2.",
                      icon: Fingerprint,
                      position: "top-right",
                    },
                    {
                      title: "Instant Verification",
                      desc: "Compare any content against on-chain fingerprints.",
                      icon: ShieldCheck,
                      position: "bottom-left",
                    },
                  ].map((step, i) => (
                    <motion.div
                      key={i}
                      className={`absolute ${
                        step.position === "top-left"
                          ? "top-0 left-0 lg:top-[-50px] lg:left-[-50px]"
                          : step.position === "top-right"
                          ? "top-0 right-0 lg:top-[-50px] lg:right-[-50px]"
                          : "bottom-0 left-1/2 -translate-x-1/2 lg:bottom-5"
                      } z-10 w-[200px] sm:w-[220px] lg:w-[400px] hidden md:block`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.3 + i * 0.2 }}
                    >
                      <GlassCard className="group h-full">
                        <div className="flex items-start gap-4">
                          {/* Icon on the left */}
                          <div className="w-12 h-12 flex-shrink-0 bg-gradient-to-br from-blue-500/[0.15] to-purple-500/[0.15] rounded-xl flex items-center justify-center border border-white/[0.08] shadow-[0_0_20px_rgba(100,130,255,0.1)] group-hover:scale-110 group-hover:border-white/[0.15] transition-all duration-500">
                            <step.icon className="w-6 h-6 text-white group-hover:text-blue-300 transition-colors" />
                          </div>

                          {/* Content on the right */}
                          <div className="flex-1 min-w-0">
                            <h3 className="text-base lg:text-lg font-semibold mb-1 text-left">
                              {step.title}
                            </h3>
                            <p className="text-gray-400 text-xs lg:text-sm leading-relaxed text-left">
                              {step.desc}
                            </p>
                          </div>
                        </div>
                      </GlassCard>
                    </motion.div>
                  ))}

                  {/* Logo container - smaller size, no background card, centered */}
                  <div
                    className="relative w-full max-w-xs mx-auto flex items-center justify-center z-20"
                    style={{ transform: "translateY(-130px)" }}
                  >
                    <motion.div
                      className="relative w-full h-[200px] sm:h-[220px] lg:h-[240px] opacity-100 pointer-events-none"
                      style={{
                        backgroundImage: `url(${abstractShapes})`,
                        backgroundSize: "70%",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                      }}
                      animate={{
                        y: [0, -10, 0],
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* How It Works */}
      <section className="mt-[-120px] pb-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              How SIGNET Works
            </h2>
            <p className="text-gray-400">
              Three simple steps to guarantee authenticity.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Upload & Hash",
                desc: "Content is processed using perceptual hashing (pHash).",
                icon: Upload,
              },
              {
                title: "Fingerprint on Chain",
                desc: "The hash is stored immutably on Lisk L2.",
                icon: Fingerprint,
              },
              {
                title: "Instant Verification",
                desc: "Compare any content against on-chain fingerprints.",
                icon: ShieldCheck,
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
              >
                <GlassCard className="text-center group h-full">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500/[0.15] to-purple-500/[0.15] rounded-2xl flex items-center justify-center mb-6 border border-white/[0.08] shadow-[0_0_20px_rgba(100,130,255,0.1)] group-hover:scale-110 group-hover:border-white/[0.15] transition-all duration-500">
                    <step.icon className="w-10 h-10 text-white group-hover:text-blue-300 transition-colors" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{step.desc}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center md:text-left"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Powerful Features
            </h2>
            <p className="text-gray-400 text-lg">
              Everything you need to secure digital trust.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <GlassCard className="group h-full">
                  <div className="w-12 h-12 bg-white/[0.03] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-500 border border-white/[0.08] group-hover:bg-blue-500/[0.08] group-hover:border-blue-500/[0.2]">
                    <feature.icon className="w-6 h-6 text-blue-300 group-hover:text-blue-400 transition-colors" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-blue-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Why SIGNET?</h2>
            <p className="text-gray-400">Built for trust in the digital age.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BENEFITS.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
              >
                <GlassCard className="relative overflow-hidden group p-8 h-full">
                  <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500 transform group-hover:scale-125 group-hover:rotate-12">
                    <benefit.icon className="w-32 h-32" />
                  </div>
                  <div className="relative z-10">
                    <div className="p-3 w-fit rounded-xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/[0.08] mb-6 group-hover:border-white/[0.12] transition-all duration-500">
                      <benefit.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{benefit.title}</h3>
                    <p className="text-gray-400">{benefit.desc}</p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
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
              Simple Pricing
            </h2>
            <p className="text-gray-400">
              Choose the plan that fits your verification needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {PRICING_PLANS.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
              >
                <GlassCard
                  className={`relative flex flex-col h-full ${
                    plan.popular
                      ? "border-blue-500/[0.2] shadow-[0_0_40px_rgba(59,130,246,0.12)] bg-blue-900/[0.05]"
                      : ""
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 px-4 py-1 bg-blue-600/[0.8] backdrop-blur-[8px] text-xs font-bold uppercase tracking-wider rounded-bl-2xl rounded-tr-[30px] shadow-[0_0_15px_rgba(37,99,235,0.4)] border border-blue-500/[0.3]">
                      Popular
                    </div>
                  )}
                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-gray-400 mb-2">
                      {plan.name} Plan
                    </h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-bold text-white text-glow">
                        {plan.price}
                      </span>
                      <span className="text-gray-500">{plan.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8 flex-1">
                    {plan.features.map((feat, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-3 text-sm text-gray-300"
                      >
                        <CheckCircle className="w-5 h-5 text-blue-500 shrink-0 drop-shadow-[0_0_5px_rgba(59,130,246,0.5)]" />
                        {feat}
                      </li>
                    ))}
                  </ul>

                  <GlowButton
                    variant={plan.popular ? "primary" : "secondary"}
                    className="w-full justify-center"
                    onClick={handleConnectWallet}
                  >
                    {plan.cta}
                  </GlowButton>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 relative z-10">
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[4px] pointer-events-none" />
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-400">
              Everything you need to know about SIGNET.
            </p>
          </motion.div>

          <Accordion type="single" collapsible className="space-y-4">
            {FAQ_ITEMS.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <GlassCard className="py-0 px-6 group">
                  <AccordionItem value={`item-${i}`} className="border-none">
                    <AccordionTrigger className="text-lg font-medium py-6 hover:text-blue-300 transition-colors text-left group-hover:bg-white/[0.02] rounded-lg -mx-2 px-2">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-400 pb-6 leading-relaxed">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                </GlassCard>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </section>
      {/* Footer */}
      <LandingFooter />
    </div>
  );
}
