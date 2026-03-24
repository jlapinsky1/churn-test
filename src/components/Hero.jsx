import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative text-center px-6 pt-24 pb-16 overflow-hidden">
      {/* Red/amber war-room glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[280px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(220,38,38,0.12) 0%, rgba(245,158,11,0.06) 50%, transparent 75%)',
          filter: 'blur(50px)',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Alert badge */}
        <div
          className="inline-flex items-center gap-2 px-3 py-1 mb-8 text-xs font-semibold tracking-widest uppercase"
          style={{
            background: 'rgba(220,38,38,0.1)',
            border: '1px solid rgba(220,38,38,0.35)',
            borderRadius: '4px',
            color: '#f87171',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
          NRR Protection · CFO / CRO Intelligence
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight max-w-3xl mx-auto">
          Stop the Bleeding.{' '}
          <span
            className="text-transparent bg-clip-text"
            style={{ backgroundImage: 'linear-gradient(90deg, #fbbf24, #f97316)' }}
          >
            Protect Your NRR.
          </span>
        </h1>

        <p className="mt-6 text-base md:text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: '#9ca3af' }}>
          In a zero-growth economy, your support inbox is your most valuable financial
          asset. See how much revenue is currently leaking through your{' '}
          <span style={{ color: '#fbbf24', fontStyle: 'italic' }}>"Silent Churn" gap.</span>
        </p>
      </motion.div>
    </section>
  )
}
