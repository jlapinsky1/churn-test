import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function EmailCapture() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Enter a valid work email address.')
      return
    }
    console.log('Revenue Protection Audit signup:', email)
    setSubmitted(true)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.65, duration: 0.5 }}
      className="max-w-2xl mx-auto px-6 mt-6 mb-8"
    >
      <div
        style={{
          background: '#111111',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '12px',
        }}
        className="p-8"
      >
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h3 className="text-white font-bold text-xl mb-1">
                Claim Your Revenue Protection Audit
              </h3>
              <p className="text-sm mb-6" style={{ color: '#6b7280' }}>
                Get a personalized breakdown of where Silent Churn is eroding your NRR—
                and a 90-day intervention playbook.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-4">
                <input
                  type="email"
                  placeholder="cfo@yourcompany.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError('') }}
                  className="flex-1 px-4 py-3.5 text-white text-sm outline-none"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: error ? '1px solid rgba(239,68,68,0.6)' : '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                  }}
                  onFocus={(e) => {
                    if (!error) {
                      e.target.style.borderColor = 'rgba(245,158,11,0.5)'
                      e.target.style.boxShadow = '0 0 0 3px rgba(245,158,11,0.07)'
                    }
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = error ? 'rgba(239,68,68,0.6)' : 'rgba(255,255,255,0.1)'
                    e.target.style.boxShadow = 'none'
                  }}
                />
                <button
                  type="submit"
                  className="sm:shrink-0 px-6 py-3.5 font-bold text-sm text-white transition-all duration-200 whitespace-nowrap"
                  style={{
                    background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
                    boxShadow: '0 4px 20px rgba(220,38,38,0.4)',
                    borderRadius: '8px',
                    letterSpacing: '0.01em',
                  }}
                >
                  Claim My Revenue Protection Audit →
                </button>
              </form>

              {error && <p className="mb-3 text-xs text-red-400">{error}</p>}

              {/* Trust badge */}
              <div className="flex items-center gap-2 mt-4">
                <div
                  className="flex items-center justify-center w-6 h-6 shrink-0"
                  style={{
                    background: 'rgba(245,158,11,0.1)',
                    border: '1px solid rgba(245,158,11,0.3)',
                    borderRadius: '4px',
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <span className="text-xs" style={{ color: '#6b7280' }}>
                  Trained on 15 Years of SaaS Support Intelligence. No pitch decks. No spam.
                </span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="text-center py-4"
            >
              <div
                className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4"
                style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.3)' }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Audit Request Received.</h3>
              <p className="text-sm max-w-sm mx-auto" style={{ color: '#9ca3af' }}>
                Expect your personalized Revenue Protection Audit within 48 hours.
                We'll show you exactly where your Silent Churn gap is widest.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
