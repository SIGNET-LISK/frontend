import { motion } from "framer-motion";

export function VerifyHero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center space-y-4 mb-12"
    >
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
        <span className="bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
          Verify Content Authenticity
        </span>
      </h1>
      <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
        Check if digital content (images, videos, documents) is authentic or has been manipulated. 
        Compare against our blockchain-verified fingerprint registry.
      </p>
    </motion.div>
  );
}

