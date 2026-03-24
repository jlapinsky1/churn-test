import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Hero from './components/Hero'
import Calculator from './components/Calculator'
import Results from './components/Results'
import EmailCapture from './components/EmailCapture'
import BenchmarkTicker from './components/BenchmarkTicker'

export default function App() {
  const [values, setValues] = useState({ arr: '', churn: 10, tickets: '' })
  const [results, setResults] = useState(null)

  function handleChange(patch) {
    setValues((prev) => ({ ...prev, ...patch }))
    setResults(null)
  }

  function handleCalculate() {
    const arr = parseFloat(values.arr)
    const churn = parseFloat(values.churn)
    if (!arr || !churn) return

    const totalLost = arr * (churn / 100)
    const recoverable = totalLost * 0.25
    setResults({ totalLost, recoverable })
  }

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh' }}>
      <Hero />
      <Calculator values={values} onChange={handleChange} onCalculate={handleCalculate} />

      <AnimatePresence>
        {results && (
          <>
            <Results
              totalLost={results.totalLost}
              recoverable={results.recoverable}
              churn={values.churn}
              tickets={values.tickets}
            />
            <EmailCapture />
          </>
        )}
      </AnimatePresence>

      <BenchmarkTicker />

      {/* Footer */}
      <div className="text-center pb-12" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '24px' }}>
        <p className="text-xs" style={{ color: '#374151' }}>
          Revenue Protection Intelligence · Data stays local · Built on 15 years of SaaS support signals
        </p>
      </div>
    </div>
  )
}
