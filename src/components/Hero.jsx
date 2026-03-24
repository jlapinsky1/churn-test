import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative text-center px-6 pt-24 pb-16 overflow-hidden">
      {/* Glow orb */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(124,58,237,0.18) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-400 text-xs font-medium mb-8 tracking-wide uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
          Revenue Intelligence
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight max-w-3xl mx-auto">
          How Much Revenue Is Your{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-300">
            Support Data
          </span>{' '}
          Hiding?
        </h1>

        <p className="mt-6 text-base md:text-lg text-gray-400 max-w-xl mx-auto leading-relaxed">
          Most SaaS companies lose 25% of preventable churn because the signal
          was buried in their support queue. Run the numbers below.
        </p>
      </motion.div>
    </section>
  )
}
