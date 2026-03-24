import { motion } from 'framer-motion'

function fmt(num) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(num)
}

function StatCard({ label, value, danger, warn, accent }) {
  const borderColor = danger
    ? 'rgba(220,38,38,0.4)'
    : warn
    ? 'rgba(245,158,11,0.35)'
    : accent
    ? 'rgba(74,222,128,0.3)'
    : 'rgba(255,255,255,0.08)'

  const bg = danger
    ? 'rgba(220,38,38,0.08)'
    : warn
    ? 'rgba(245,158,11,0.07)'
    : accent
    ? 'rgba(74,222,128,0.07)'
    : 'rgba(255,255,255,0.03)'

  const valueColor = danger
    ? '#f87171'
    : warn
    ? '#fbbf24'
    : accent
    ? '#4ade80'
    : '#e5e7eb'

  return (
    <div
      className="flex flex-col gap-1.5 p-5"
      style={{ background: bg, border: `1px solid ${borderColor}`, borderRadius: '10px' }}
    >
      <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#6b7280' }}>
        {label}
      </span>
      <span className="text-2xl font-bold" style={{ color: valueColor }}>
        {value}
      </span>
    </div>
  )
}

export default function Results({ totalLost, recoverable, churn, tickets }) {
  const valuation = recoverable * 5
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
      {/* BLEEDING REVENUE — danger card */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.15 }}
        className="relative overflow-hidden mb-4 p-6"
        style={{
          background: 'rgba(220,38,38,0.07)',
          border: '1px solid rgba(220,38,38,0.4)',
          borderRadius: '12px',
          borderLeft: '4px solid #dc2626',
        }}
      >
        <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#f87171' }}>
          ⚠ Active Revenue Bleed
        </p>
        <p className="text-4xl md:text-5xl font-black mb-2" style={{ color: '#ef4444' }}>
          {fmt(totalLost)}
        </p>
        <p className="text-sm" style={{ color: '#9ca3af' }}>
          Lost to churn annually at your current {churn}% gross churn rate.
        </p>
      </motion.div>

      {/* MAIN RESULT — survival metric */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.45 }}
        className="relative overflow-hidden mb-4 p-8"
        style={{
          background: 'linear-gradient(135deg, rgba(245,158,11,0.1) 0%, rgba(251,191,36,0.04) 100%)',
          border: '1px solid rgba(245,158,11,0.3)',
          borderRadius: '12px',
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at top left, rgba(245,158,11,0.08) 0%, transparent 60%)',
          }}
        />
        <div className="relative z-10">
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#fbbf24' }}>
            Recovery Signal Detected
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-white leading-snug mb-3">
            Your Support Data is Hiding{' '}
            <span style={{ color: '#fbbf24' }}>{fmt(recoverable)}</span>{' '}
            in At-Risk Revenue.
          </h2>
          <p className="text-sm leading-relaxed mb-5" style={{ color: '#9ca3af' }}>
            Based on 15 years of support-to-churn correlations, roughly 25% of your annual
            churn is preventable if flagged 90 days earlier.
            {tickets && signalStrength !== null && (
              <span className="block mt-2" style={{ color: '#d97706' }}>
                Your {Number(tickets).toLocaleString()} monthly tickets carry an estimated{' '}
                <strong style={{ color: '#fbbf24' }}>{signalStrength}%</strong> Silent Churn Signal™ coverage.
              </span>
            )}
          </p>

          {/* Survival metric */}
          <div
            className="p-4"
            style={{
              background: 'rgba(0,0,0,0.3)',
              border: '1px solid rgba(245,158,11,0.2)',
              borderRadius: '8px',
            }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: '#78716c' }}>
              Survival Metric — Valuation Impact (5× ARR Multiple)
            </p>
            <p className="text-xl font-bold" style={{ color: '#fbbf24' }}>
              Capturing these signals increases your valuation by{' '}
              <span className="text-white">{fmt(valuation)}</span>
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stat grid */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="grid grid-cols-2 gap-3"
      >
        <StatCard label="Revenue Bleeding Annually" value={fmt(totalLost)} danger />
        <StatCard label="Recoverable w/ Early Signal" value={fmt(recoverable)} warn />
        <StatCard label="Valuation Upside (5× ARR)" value={fmt(valuation)} accent />
        <StatCard
          label="Gross Churn Rate"
          value={`${churn}%`}
          danger={churn > 15}
          warn={churn > 8 && churn <= 15}
          accent={churn <= 8}
        />
      </motion.div>
    </motion.div>
  )
}
