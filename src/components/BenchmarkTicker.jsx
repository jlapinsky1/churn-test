import { motion } from 'framer-motion'

const benchmarks = [
  { label: 'Market Average Gross Churn', value: '14.2%', status: 'warn' },
  { label: 'Enterprise SaaS Median', value: '8.5%', status: 'ok' },
  { label: 'SMB SaaS Median', value: '22.1%', status: 'danger' },
  { label: 'Top-Quartile SaaS (NRR > 120%)', value: '< 5%', status: 'ok' },
  { label: 'Silent Churn (undetected signals)', value: '~25% of total', status: 'warn' },
  { label: 'Avg Months Before Churn Signal Detected', value: '4.2 mo', status: 'danger' },
  { label: 'Revenue Saved w/ 90-Day Early Warning', value: 'Up to 31%', status: 'ok' },
]

const statusColor = {
  ok: '#4ade80',
  warn: '#fbbf24',
  danger: '#f87171',
}

// Duplicate for seamless scroll loop
const items = [...benchmarks, ...benchmarks]

export default function BenchmarkTicker() {
  return (
    <div className="max-w-2xl mx-auto px-6 mb-16 mt-2">
      <div
        style={{
          background: '#0d0d0d',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '10px',
          overflow: 'hidden',
        }}
      >
        {/* Header bar */}
        <div
          className="flex items-center gap-2 px-4 py-2.5"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#6b7280' }}>
            Live Industry Benchmarks · SaaS Churn Intelligence
          </span>
        </div>

        {/* Scrolling ticker */}
        <div className="overflow-hidden py-3 px-1">
          <motion.div
            className="flex gap-6 whitespace-nowrap"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              repeat: Infinity,
              duration: 28,
              ease: 'linear',
            }}
          >
            {items.map((item, i) => (
              <div key={i} className="inline-flex items-center gap-2 shrink-0 px-3">
                <span className="text-xs" style={{ color: '#4b5563' }}>
                  {item.label}:
                </span>
                <span className="text-xs font-bold" style={{ color: statusColor[item.status] }}>
                  {item.value}
                </span>
                <span className="text-xs" style={{ color: '#1f2937' }}>·</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
