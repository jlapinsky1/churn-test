import { motion } from 'framer-motion'

function fmt(num) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(num)
}

function StatCard({ label, value, accent }) {
  return (
    <div
      className="rounded-xl p-5 flex flex-col gap-1"
      style={{
        background: accent ? 'rgba(124,58,237,0.12)' : 'rgba(255,255,255,0.04)',
        border: `1px solid ${accent ? 'rgba(124,58,237,0.3)' : 'rgba(255,255,255,0.08)'}`,
      }}
    >
      <span className="text-xs text-gray-500 font-medium uppercase tracking-widest">
        {label}
      </span>
      <span
        className="text-2xl font-bold"
        style={{ color: accent ? '#a78bfa' : '#e5e7eb' }}
      >
        {value}
      </span>
    </div>
  )
}

export default function Results({ totalLost, recoverable, churn, tickets }) {
  const signalStrength = tickets
    ? Math.min(100, Math.round((tickets / 500) * 70 + 30))
    : null

  return (
    <motion.div
      key="results"
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="max-w-2xl mx-auto px-6 mt-8"
    >
      {/* Main result card */}
      <div
        className="rounded-2xl p-8 mb-4 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(109,40,217,0.08) 100%)',
          border: '1px solid rgba(124,58,237,0.35)',
        }}
      >
        {/* Background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at top left, rgba(124,58,237,0.12) 0%, transparent 60%)',
          }}
        />

        <div className="relative z-10">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xs font-semibold text-violet-400 uppercase tracking-widest mb-4"
          >
            Revenue Recovery Estimate
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="text-2xl md:text-3xl font-bold text-white leading-snug mb-4"
          >
            Your Support Data is Hiding{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-purple-200">
              {fmt(recoverable)}
            </span>{' '}
            in At-Risk Revenue.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-sm text-gray-400 leading-relaxed"
          >
            Based on 15 years of support-to-churn correlations, roughly 25% of
            your annual churn ({fmt(totalLost)}) is preventable if flagged 90
            days earlier.
            {tickets && signalStrength !== null && (
              <span className="block mt-2 text-violet-400/80">
                With {Number(tickets).toLocaleString()} monthly support tickets,
                your churn signal coverage is estimated at{' '}
                <strong className="text-violet-300">{signalStrength}%</strong>.
              </span>
            )}
          </motion.p>
        </div>
      </div>

      {/* Stat cards */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.4 }}
        className="grid grid-cols-2 gap-3"
      >
        <StatCard label="Annual Revenue Lost to Churn" value={fmt(totalLost)} />
        <StatCard label="Recoverable w/ Early Detection" value={fmt(recoverable)} accent />
        <StatCard label="Churn Rate" value={`${churn}%`} />
        <StatCard
          label="Support Signal"
          value={tickets ? `${Number(tickets).toLocaleString()} tickets/mo` : 'Not set'}
        />
      </motion.div>
    </motion.div>
  )
}
