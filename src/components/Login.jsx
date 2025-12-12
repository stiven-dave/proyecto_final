import { useState } from 'react'
import { API_ENDPOINTS } from '../config/api'

export default function Login({ onLogin, onSwitchToRegister, onClose }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      setError('Por favor completa todos los campos')
      return
    }

    if (!email.includes('@')) {
      setError('Por favor ingresa un email válido')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch(API_ENDPOINTS.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          correo: email,
          password: password
        })
      })

      // Leer el body una sola vez
      const raw = await response.text()
      let data

      try {
        data = JSON.parse(raw)
      } catch (e) {
        console.error("EL SERVIDOR DEVOLVIÓ HTML EN VEZ DE JSON:", raw)
        throw new Error("El backend devolvió HTML o texto inválido.")
      }

      if (data.success) {
        const userData = {
          email: data.user.email,
          name: data.user.name,
          id: data.user.id
        }

        console.log('Login exitoso:', userData)
        onLogin(userData)

        setEmail('')
        setPassword('')
      } else {
        setError(data.message || 'Error al iniciar sesión')
      }

    } catch (err) {
      console.error('Error en login:', err)
      setError('Error de conexión. Verifica que el servidor PHP esté ejecutándose.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <button type="button" className="close-btn" onClick={onClose}>✕</button>

        <div className="login-header">
          <img src="/logo-circle.jpg" alt="Perfect Glow Logo" className="login-logo-circle" />
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <p className="login-error">{error}</p>}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? 'Iniciando sesión...' : 'Inicia sesión'}
          </button>

          <p className="login-footer">
            ¿No tienes cuenta? <a href="#signup" onClick={(e) => { e.preventDefault(); onSwitchToRegister(); }}>Regístrate</a>
          </p>
        </form>
      </div>
    </div>
  )
}
