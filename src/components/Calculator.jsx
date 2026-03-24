import { motion } from 'framer-motion'

function formatCurrency(val) {
  if (!val) return ''
  const num = parseFloat(val.toString().replace(/[^0-9.]/g, ''))
  if (isNaN(num)) return ''
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(num)
}

// Churn rate color: green → amber → red
function churnColor(churn) {
  if (churn <= 8) return '#4ade80'
  if (churn <= 15) return '#fbbf24'
  if (churn <= 25) return '#f97316'
  return '#ef4444'
}

export default function Calculator({ values, onChange, onCalculate }) {
  const { arr, churn, tickets } = values
  const sliderColor = churnColor(churn)

  function handleArrChange(e) {
    const raw = e.target.value.replace(/[^0-9]/g, '')
    onChange({ arr: raw })
  }

  function handleArrBlur(e) {
    const raw = e.target.value.replace(/[^0-9]/g, '')
    if (raw) e.target.value = formatCurrency(raw)
  }

  function handleArrFocus(e) {
    e.target.value = arr || ''
  }

  const inputBase = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
      className="max-w-2xl mx-auto px-6"
    >
      <div
        style={{
          background: '#111111',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '12px',
        }}
        className="p-8"
      >
        <div className="flex items-center gap-3 mb-8">
          <div style={{ width: 3, height: 20, background: '#f97316', borderRadius: 2 }} />
          <h2 className="text-white font-semibold text-xl">Exposure Assessment</h2>
        </div>

        {/* ARR */}
        <div className="mb-8">
          <label className="block text-sm font-medium mb-2" style={{ color: '#9ca3af' }}>
            Annual Recurring Revenue (ARR)
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm" style={{ color: '#6b7280' }}>$</span>
            <input
              type="text"
              inputMode="numeric"
              placeholder="5,000,000"
              defaultValue={arr ? formatCurrency(arr) : ''}
              onChange={handleArrChange}
              onBlur={handleArrBlur}
              onFocus={handleArrFocus}
              className="w-full pl-8 pr-4 py-3.5 text-white text-sm outline-none transition-all"
              style={{ ...inputBase, borderRadius: '8px' }}
              onFocusCapture={(e) => {
                e.target.style.borderColor = 'rgba(251,191,36,0.5)'
                e.target.style.boxShadow = '0 0 0 3px rgba(251,191,36,0.08)'
              }}
              onBlurCapture={(e) => {
                e.target.style.borderColor = 'rgba(255,255,255,0.1)'
                e.target.style.boxShadow = 'none'
              }}
            />
          </div>
        </div>

        {/* Churn slider */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <label className="text-sm font-medium" style={{ color: '#9ca3af' }}>
              Annual Gross Churn Rate
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={0}
                max={50}
                step={0.5}
                value={churn}
                onChange={(e) => onChange({ churn: Math.min(50, Math.max(0, parseFloat(e.target.value) || 0)) })}
                className="w-16 text-center py-1 px-2 text-white text-sm outline-none font-semibold"
                style={{
                  background: 'rgba(239,68,68,0.1)',
                  border: `1px solid ${sliderColor}66`,
                  borderRadius: '6px',
                  color: sliderColor,
                }}
              />
              <span className="text-sm font-medium" style={{ color: sliderColor }}>%</span>
            </div>
          </div>
          <input
            type="range"
            min={0}
            max={50}
            step={0.5}
            value={churn}
            onChange={(e) => onChange({ churn: parseFloat(e.target.value) })}
            style={{
              background: `linear-gradient(to right, ${sliderColor} ${(churn / 50) * 100}%, #2a2a2a ${(churn / 50) * 100}%)`,
            }}
          />
          <div className="flex justify-between text-xs mt-1.5" style={{ color: '#4b5563' }}>
            <span>Healthy (0%)</span>
            <span style={{ color: '#fbbf24' }}>Market Avg (14%)</span>
            <span style={{ color: '#ef4444' }}>Critical (50%)</span>
          </div>
        </div>

        {/* Support tickets */}
        <div className="mb-10">
          <label className="block text-sm font-medium mb-2" style={{ color: '#9ca3af' }}>
            Monthly Support Ticket Volume
            <span className="ml-2 text-xs font-normal" style={{ color: '#4b5563' }}>
              (calibrates your Silent Churn Signal™)
            </span>
          </label>
          <input
            type="number"
            inputMode="numeric"
            placeholder="e.g. 450"
            value={tickets}
            onChange={(e) => onChange({ tickets: e.target.value })}
            className="w-full px-4 py-3.5 text-white text-sm outline-none transition-all"
            style={{ ...inputBase, borderRadius: '8px' }}
            onFocus={(e) => {
              e.target.style.borderColor = 'rgba(251,191,36,0.5)'
              e.target.style.boxShadow = '0 0 0 3px rgba(251,191,36,0.08)'
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(255,255,255,0.1)'
              e.target.style.boxShadow = 'none'
            }}
          />
        </div>

        <button
          onClick={onCalculate}
          disabled={!arr || !churn}
          className="w-full py-4 font-bold text-sm text-white transition-all duration-200"
          style={{
            background: arr && churn
              ? '#7f1d1d'
              : 'rgba(255,255,255,0.06)',
            color: arr && churn ? '#fff' : 'rgba(255,255,255,0.25)',
            cursor: arr && churn ? 'pointer' : 'not-allowed',
            boxShadow: arr && churn ? '0 4px 20px rgba(127,29,29,0.5)' : 'none',
            borderRadius: '8px',
            letterSpacing: '0.02em',
          }}
        >
          {arr && churn ? 'CALCULATE MY EXPOSURE' : 'Enter ARR and Churn Rate to Continue'}
        </button>
      </div>
    </motion.div>
  )
}
