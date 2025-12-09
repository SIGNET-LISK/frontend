import { Link } from "wouter";
import { motion, useMotionValue } from "framer-motion";
import { GlowButton } from "@/components/ui/glow-button";
import {
  ArrowRight,
  ShieldCheck,
  Scale,
  Building2,
} from "lucide-react";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { useEffect, useState, useRef } from "react";
import { useAccount } from "wagmi";
import { useAppKit } from "@reown/appkit/react";

import LiquidEther from "@/components/LiquidEther";
import BlurText from "@/components/BlurText";
import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { PricingSection } from "@/components/landing/PricingSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { PhoneVerification } from "@/components/illustrations/phone-verification";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { WhitelistSection } from "@/components/landing/WhitelistSection";

const handleAnimationComplete = () => {
  console.log("Animation completed!");
};

const BENEFITS = [
  {
    icon: ShieldCheck,
    title: "Protect Brand Reputation",
    desc: "Prevent misinformation from damaging trust",
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

// Floating particles component
const FloatingParticles = () => {
  const particles = Array.from({ length: 8 }, (_, i) => ({
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
          className="absolute rounded-full bg-foreground/5 dark:bg-white/[0.03]"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.1, 0.3, 0.1],
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

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const scrollY = useMotionValue(0);
  const isInitialMount = useRef(true);
  const { isConnected } = useAccount();
  const { open } = useAppKit();

  // Static values for padding
  const heroPaddingTop = 120;
  const heroPaddingBottom = 40;

  const [showDescription, setShowDescription] = useState(false);


  const handleConnectWallet = () => {
    // ...
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
      } else if (currentScrollY === 0 && showDescription) {
        setShowDescription(false);
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
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden font-sans selection:bg-blue-500/30 dark:selection:bg-blue-500/30">
      {/* LiquidEther Background - Full Page Animation */}
      <div
        className="fixed inset-0 pointer-events-none bg-background"
        style={{ zIndex: 0 }}
      >
        <LiquidEther
          colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
          mouseForce={20}
          cursorSize={50}
          isViscous={false}
          viscous={30}
          iterationsViscous={4}
          iterationsPoisson={4}
          resolution={0.1}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
          className="opacity-60"
        />
      </div>

      {/* Overlay gradient for text readability */}
      <div
        className="fixed inset-0 pointer-events-none bg-gradient-to-b from-background/80 via-background/40 to-background/80 dark:from-black/80 dark:via-black/40 dark:to-black/80"
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
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/10 rounded-full blur-3xl"
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
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/10 rounded-full blur-3xl"
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

      {/* Content wrapper */}
      <div>
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
              {/* Left Column: Text Content */}
              <motion.div
                className="flex flex-col items-start text-left -mt-12 lg:-mt-24"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="mb-6">
                  <BlurText
                    text="Protect the Truth"
                    delay={150}
                    animateBy="words"
                    direction="top"
                    onAnimationComplete={handleAnimationComplete}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-tight"
                  />

                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-tight mt-2">
                    <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                      Verify Digital Content
                    </span>
                  </h1>
                </div>

                <div className="space-y-6 max-w-xl">
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                    Upload & Hash: Content is processed using perceptual hashing (pHash) for instant verification.
                    Compare any content against on-chain fingerprints stored immutably on Lisk L2.
                  </p>

                  <Link href="/verify">
                    <GlowButton className="h-12 md:h-14 px-6 md:px-8 text-base md:text-lg group">
                      <span>Verify Content Now</span>
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </GlowButton>
                  </Link>
                </div>
              </motion.div>

              {/* Right Column: Phone Mockup */}
              <motion.div
                className="relative flex justify-center lg:justify-end"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              >
                {/* Glow effect behind phone */}
                <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full transform scale-75" />

                <motion.div
                  className="relative z-10 w-full max-w-xs transform hover:scale-[1.02] transition-transform duration-500"
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <PhoneVerification />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* How It Works */}
        <HowItWorksSection />

        {/* Features Grid */}
        <FeaturesSection />

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
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
                Why SIGNET?
              </h2>
              <p className="text-muted-foreground">
                Built for trust in the digital age.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {BENEFITS.map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.2 }}
                  className="h-full"
                >
                  <CardSpotlight
                    className="h-full bg-white/5 dark:bg-white/5 border-white/10 backdrop-blur-md p-8 rounded-3xl cursor-pointer"
                    color="#3b82f6"
                  >
                    <div className="relative z-10 h-full flex flex-col">
                      <div className="p-3 w-fit rounded-xl bg-gradient-to-br from-white/[0.05] dark:from-white/[0.05] to-white/[0.02] dark:to-white/[0.02] border border-white/[0.1] dark:border-white/[0.08] mb-6 group-hover:border-white/[0.15] dark:group-hover:border-white/[0.12] transition-all duration-500 shadow-lg backdrop-blur-[8px]">
                        <benefit.icon className="w-8 h-8 text-foreground" />
                      </div>
                      <h3 className="text-2xl font-bold mb-3 text-foreground">
                        {benefit.title}
                      </h3>
                      <p className="text-muted-foreground">{benefit.desc}</p>
                    </div>
                  </CardSpotlight>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <PricingSection onConnect={handleConnectWallet} />

        {/* Whitelist */}
        <WhitelistSection />

        {/* FAQ Section */}
        <FAQSection />

        {/* Footer */}
        <LandingFooter />
      </div >
    </div >
  );
}
