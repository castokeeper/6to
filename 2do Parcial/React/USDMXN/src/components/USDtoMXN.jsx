import { useState } from 'react'
import './USDtoMXN.css'

// Usamos la API pública de exchangerate-api (sin key requerida para este endpoint)
const API_URL = 'https://api.exchangerate-api.com/v4/latest/USD'

export default function USDtoMXN() {
  const [rate, setRate] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(null)
  const [amount, setAmount] = useState(1)

  const fetchRate = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(API_URL)
      if (!res.ok) throw new Error('No se pudo obtener el tipo de cambio')
      const data = await res.json()
      setRate(data.rates.MXN)
      setLastUpdated(new Date().toLocaleString('es-MX', {
        dateStyle: 'full',
        timeStyle: 'short',
      }))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const total = rate ? (amount * rate).toFixed(2) : null

  return (
    <div className="card">
      {/* Header */}
      <div className="card-header">
        <div className="flag-pair">
          <span className="flag">🇺🇸</span>
          <div className="arrow-icon">→</div>
          <span className="flag">🇲🇽</span>
        </div>
        <h1 className="title">Tipo de Cambio</h1>
        <p className="subtitle">Dólar estadounidense a Peso mexicano</p>
      </div>

      {/* Rate display */}
      <div className="rate-display">
        {!rate && !loading && !error && (
          <div className="placeholder-text">
            <span>Presiona el botón para consultar</span>
          </div>
        )}

        {loading && (
          <div className="spinner-wrap">
            <div className="spinner"></div>
            <p className="loading-text">Consultando tipo de cambio...</p>
          </div>
        )}

        {error && (
          <div className="error-box">
            <span className="error-icon">⚠️</span>
            <p>{error}</p>
          </div>
        )}

        {rate && !loading && (
          <>
            <div className="rate-badge">
              <span className="rate-label">1 USD =</span>
              <span className="rate-value">${rate.toFixed(4)}</span>
              <span className="rate-currency">MXN</span>
            </div>

            {/* Converter */}
            <div className="converter">
              <label className="converter-label">Convertir</label>
              <div className="input-row">
                <div className="input-group">
                  <span className="currency-badge">USD</span>
                  <input
                    id="amount-input"
                    type="number"
                    min="0"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="amount-input"
                  />
                </div>
                <span className="equals">=</span>
                <div className="result-box">
                  <span className="currency-badge mxn">MXN</span>
                  <span className="result-value">${total}</span>
                </div>
              </div>
            </div>

            <p className="updated-at">
              🕒 Actualizado: {lastUpdated}
            </p>
          </>
        )}
      </div>

      {/* Button */}
      <button
        id="fetch-rate-btn"
        className={`fetch-btn ${loading ? 'loading' : ''}`}
        onClick={fetchRate}
        disabled={loading}
      >
        {loading ? (
          <span>Consultando...</span>
        ) : (
          <span>💱 Consultar tipo de cambio hoy</span>
        )}
      </button>
    </div>
  )
}
