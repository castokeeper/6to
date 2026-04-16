import { useState } from 'react'
import './Convertidor.css'

// API requerida
const API_URL = 'https://open.er-api.com/v6/latest/USD'

export default function Convertidor() {
  // ── Estados requeridos ──────────────────────────────────
  const [tipoCambio, setTipoCambio] = useState(null)
  const [dolares, setDolares]       = useState('')
  const [resultado, setResultado]   = useState(null)

  // ── Estados auxiliares ──────────────────────────────────
  const [cargando, setCargando] = useState(false)
  const [error, setError]       = useState(null)

  // ── Lógica: consulta la API y calcula dolares * tipoCambio
  const convertir = async () => {
    if (dolares === '' || isNaN(dolares) || Number(dolares) < 0) {
      setError('Ingresa una cantidad válida en dólares.')
      return
    }

    setCargando(true)
    setError(null)
    setResultado(null)

    try {
      const respuesta = await fetch(API_URL)
      if (!respuesta.ok) throw new Error('No se pudo obtener el tipo de cambio.')

      const datos = await respuesta.json()
      const tasa = datos.rates.MXN

      setTipoCambio(tasa)
      setResultado(Number(dolares) * tasa)
    } catch (err) {
      setError(err.message)
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className="card">

      {/* ── Header ─────────────────────────────────────── */}
      <div className="card-header">
        <div className="banderas">
          <span className="bandera">🇺🇸</span>
          <span className="flecha">→</span>
          <span className="bandera">🇲🇽</span>
        </div>
        <h1 className="titulo">Convertidor de Divisas</h1>
        <p className="subtitulo">USD a MXN con precio real del mercado</p>
      </div>

      {/* ── Input de dólares ────────────────────────────── */}
      <div className="campo">
        <label htmlFor="dolares-input" className="etiqueta">
          Monto en dólares
        </label>
        <div className="input-contenedor">
          <span className="simbolo">$</span>
          <input
            id="dolares-input"
            type="number"
            min="0"
            step="0.01"
            placeholder="0.00"
            value={dolares}
            onChange={(e) => {
              setDolares(e.target.value)
              setError(null)
              setResultado(null)
            }}
            className="input-dolares"
            onKeyDown={(e) => e.key === 'Enter' && convertir()}
          />
          <span className="moneda-tag">USD</span>
        </div>
      </div>

      {/* ── Botón Calcular ──────────────────────────────── */}
      <button
        id="calcular-btn"
        className={`btn-calcular ${cargando ? 'btn-cargando' : ''}`}
        onClick={convertir}
        disabled={cargando}
      >
        {cargando ? (
          <span className="btn-inner">
            <span className="spinner" />
            Consultando...
          </span>
        ) : (
          <span className="btn-inner">
            💱 Calcular
          </span>
        )}
      </button>

      {/* ── Error ───────────────────────────────────────── */}
      {error && (
        <div className="caja-error" role="alert">
          <span>⚠️</span>
          <p>{error}</p>
        </div>
      )}

      {/* ── Resultado ───────────────────────────────────── */}
      {resultado !== null && !cargando && (
        <div className="caja-resultado">
          <p className="resultado-etiqueta">Resultado</p>
          <p className="resultado-numero">
            $
            {resultado.toLocaleString('es-MX', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
            <span className="resultado-moneda"> MXN</span>
          </p>
          {tipoCambio && (
            <p className="tasa-detalle">
              Tipo de cambio: <strong>1 USD = ${tipoCambio.toFixed(4)} MXN</strong>
            </p>
          )}
        </div>
      )}

    </div>
  )
}
