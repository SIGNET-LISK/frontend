import { Link } from "wouter";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
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
  Globe, 
  Activity,
  Briefcase,
  Scale,
  Building2
} from "lucide-react";
import { useEffect, useState } from "react";
import generatedImage from '@/assets/img/swirling_holographic_light_streaks_on_dark_background.png';
import abstractShapes from '@/assets/img/shild.png';

const FEATURES = [
  { icon: Fingerprint, title: "Perceptual Hashing", desc: "Detect near-duplicate and manipulated media with AI-powered analysis." },
  { icon: Lock, title: "Immutable Record", desc: "Every signature is permanently stored on Lisk L2 blockchain." },
  { icon: Zap, title: "Verification API", desc: "Enterprise-grade API for bulk or automated checking at scale." },
  { icon: ShieldCheck, title: "Publisher Identity", desc: "Verified publishers ensure content legitimacy and origin tracking." },
  { icon: Activity, title: "Anti-Deepfake Defense", desc: "Identify synthetic or altered media instantly to stop misinformation." },
  { icon: Search, title: "Public Portal", desc: "Anyone can verify any content instantly without an account." }
];

const BENEFITS = [
  { icon: ShieldCheck, title: "Protect Brand Reputation", desc: "Prevent misinformation from damaging trust." },
  { icon: Scale, title: "Legal & Compliance Ready", desc: "Immutable proofs for audits, legal cases, and reporting." },
  { icon: Building2, title: "Built for Enterprise", desc: "Scalable for media, government, law firms, and investigators." }
];

const PRICING_PLANS = [
  {
    name: "Pro",
    price: "$9.99",
    period: "/mo",
    features: ["Up to 10,000 verifications/month", "Priority hashing performance", "API access", "TX proof explorer"],
    cta: "Get Started",
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    features: ["Unlimited verifications", "Dedicated API throughput", "SLA + enterprise support", "Private on-chain indexing"],
    cta: "Contact Sales",
    popular: false
  }
];

const FAQ_ITEMS = [
  { q: "What is perceptual hashing?", a: "A hashing technique that detects visually similar content by generating a unique digital fingerprint based on the visual features of an image or video, rather than its file data." },
  { q: "Why blockchain?", a: "Once stored on the blockchain, fingerprints cannot be modified, deleted, or tampered with, providing an immutable and verifiable record of authenticity." },
  { q: "Who is SIGNET for?", a: "SIGNET is designed for media outlets, enterprises, governments, legal investigators, and content creators who need to verify the authenticity of digital assets." },
  { q: "Is verification public?", a: "Yes, the verification portal is open to the public, allowing anyone to check content authenticity against our blockchain records instantly." }
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
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
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

export default function LandingPage() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const springY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden font-sans selection:bg-blue-500/30">
      {/* Global Background */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `url(${generatedImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.6
        }}
      />
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80 pointer-events-none" />
      
      {/* Floating Particles */}
      <FloatingParticles />

      {/* Animated gradient orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
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
      <motion.nav 
        className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
          scrolled 
            ? 'border-white/[0.08] bg-black/30 backdrop-blur-[12px]' 
            : 'border-white/[0.05] bg-black/20 backdrop-blur-[8px]'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                <span className="font-bold text-white">S</span>
              </div>
            <span className="font-bold text-xl tracking-tight">SIGNET</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <Link href="/verify"><span className="hover:text-white transition-colors cursor-pointer">Verify</span></Link>
            <Link href="/docs"><span className="hover:text-white transition-colors cursor-pointer">API Docs</span></Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <span className="text-sm font-medium text-gray-400 hover:text-white cursor-pointer transition-colors">Dashboard</span>
            </Link>
            <GlowButton className="hidden sm:flex">Get Started</GlowButton>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative py-32 md:py-40 px-4 md:px-6 lg:px-8 overflow-hidden z-10">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

            {/* Left content */}
            <motion.div 
              className="space-y-6 lg:space-y-8 text-center lg:text-left"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
                  Protect the Truth.<br />
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                    Verify Digital Content.
                  </span>
                </h1>
              </motion.div>

              <motion.p 
                className="text-base md:text-lg lg:text-xl text-gray-300 max-w-xl mx-auto lg:mx-0 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                An AI-powered, blockchain-backed platform to authenticate images, videos,
                and documents — stopping deepfakes and misinformation at the source.
              </motion.p>

              <motion.div 
                className="flex items-center justify-center lg:justify-start gap-4 pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Link href="/verify">
                  <GlowButton className="h-12 md:h-14 px-6 md:px-8 text-base md:text-lg group">
                    Verify Content Now
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </GlowButton>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right image with glassmorphism container */}
            <motion.div 
              className="relative flex items-center justify-center lg:justify-end"
              initial={{ opacity: 0, scale: 0.9, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="relative w-full max-w-lg lg:max-w-full">
                {/* Glassmorphism container */}
                <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-[8px] rounded-[32px] border border-white/[0.08] z-0" />
                
                <motion.div 
                  className="relative z-10 w-full h-[500px] sm:h-[550px] lg:h-[600px] opacity-100 pointer-events-none"
                  style={{
                    backgroundImage: `url(${abstractShapes})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center'
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
            </motion.div>

          </div>
        </div>
      </section>


      {/* How It Works */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">How SIGNET Works</h2>
            <p className="text-gray-400">Three simple steps to guarantee authenticity.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Upload & Hash", desc: "Content is processed using perceptual hashing (pHash).", icon: Upload },
              { title: "Fingerprint on Chain", desc: "The hash is stored immutably on Lisk L2.", icon: Fingerprint },
              { title: "Instant Verification", desc: "Compare any content against on-chain fingerprints.", icon: ShieldCheck }
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
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Powerful Features</h2>
            <p className="text-gray-400 text-lg">Everything you need to secure digital trust.</p>
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
                  <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-blue-300 transition-colors">{feature.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
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
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Simple Pricing</h2>
            <p className="text-gray-400">Choose the plan that fits your verification needs.</p>
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
                  className={`relative flex flex-col h-full ${plan.popular ? 'border-blue-500/[0.2] shadow-[0_0_40px_rgba(59,130,246,0.12)] bg-blue-900/[0.05]' : ''}`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 px-4 py-1 bg-blue-600/[0.8] backdrop-blur-[8px] text-xs font-bold uppercase tracking-wider rounded-bl-2xl rounded-tr-[30px] shadow-[0_0_15px_rgba(37,99,235,0.4)] border border-blue-500/[0.3]">
                      Popular
                    </div>
                  )}
                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-gray-400 mb-2">{plan.name} Plan</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-bold text-white text-glow">{plan.price}</span>
                      <span className="text-gray-500">{plan.period}</span>
                    </div>
                  </div>
                  
                  <ul className="space-y-4 mb-8 flex-1">
                    {plan.features.map((feat, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm text-gray-300">
                        <CheckCircle className="w-5 h-5 text-blue-500 shrink-0 drop-shadow-[0_0_5px_rgba(59,130,246,0.5)]" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                  
                  <GlowButton variant={plan.popular ? "primary" : "secondary"} className="w-full justify-center">
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
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-400">Everything you need to know about SIGNET.</p>
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
      <footer className="border-t border-white/[0.08] bg-black/40 backdrop-blur-[8px] pt-20 pb-10 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                  <span className="font-bold text-white">S</span>
                </div>
                <span className="font-bold text-xl">SIGNET</span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                The standard for digital trust. Verify content authenticity on the blockchain.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-6">Product</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><a href="#features" className="hover:text-blue-400 transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-blue-400 transition-colors">Pricing</a></li>
                <li><Link href="/dashboard"><span className="hover:text-blue-400 transition-colors cursor-pointer">Dashboard</span></Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6">Resources</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><Link href="/verify"><span className="hover:text-blue-400 transition-colors cursor-pointer">Verification Portal</span></Link></li>
                <li><Link href="/docs"><span className="hover:text-blue-400 transition-colors cursor-pointer">API Docs</span></Link></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Support</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6">Company</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><a href="#" className="hover:text-blue-400 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm">© 2025 SIGNET. All rights reserved.</p>
            <div className="flex gap-6">
              {[Globe, Activity, Upload].map((Icon, i) => (
                <Icon key={i} className="w-5 h-5 text-gray-600 hover:text-white cursor-pointer transition-colors hover:scale-110" />
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
