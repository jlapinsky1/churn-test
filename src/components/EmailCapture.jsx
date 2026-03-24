import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function EmailCapture() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Enter a valid email address.')
      return
    }
    console.log('Beta signup:', email)
    setSubmitted(true)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.65, duration: 0.5 }}
      className="max-w-2xl mx-auto px-6 mt-6 mb-24"
    >
      <div
        className="rounded-2xl p-8"
        style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h3 className="text-white font-semibold text-lg mb-1">
                Get Your Revenue Recovery Blueprint
              </h3>
              <p className="text-gray-500 text-sm mb-6">
                Join the beta and get a personalized analysis of where your churn
                signal is leaking.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setError('')
                  }}
                  className="flex-1 px-4 py-3.5 rounded-xl text-white text-sm outline-none"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: error
                      ? '1px solid rgba(239,68,68,0.6)'
                      : '1px solid rgba(255,255,255,0.1)',
                  }}
                  onFocus={(e) => {
                    if (!error) {
                      e.target.style.borderColor = 'rgba(124,58,237,0.6)'
                      e.target.style.boxShadow = '0 0 0 3px rgba(124,58,237,0.12)'
                    }
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = error
                      ? 'rgba(239,68,68,0.6)'
                      : 'rgba(255,255,255,0.1)'
                    e.target.style.boxShadow = 'none'
                  }}
                />
                <button
                  type="submit"
                  className="sm:shrink-0 px-6 py-3.5 rounded-xl font-semibold text-sm text-white transition-all duration-200 whitespace-nowrap"
                  style={{
                    background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                    boxShadow: '0 4px 20px rgba(124,58,237,0.35)',
                  }}
                >
                  Join the Beta Analysis →
                </button>
              </form>

              {error && (
                <p className="mt-2 text-xs text-red-400">{error}</p>
              )}

              <p className="mt-4 text-xs text-gray-600">
                No spam. No pitch decks. Just data.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="text-center py-4"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4"
                style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)' }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">You're on the list.</h3>
              <p className="text-gray-400 text-sm max-w-sm mx-auto">
                We'll reach out with your personalized Revenue Recovery Blueprint
                within 48 hours.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
