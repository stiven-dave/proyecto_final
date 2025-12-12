import { useState } from 'react'
import { API_ENDPOINTS } from '../config/api'

export default function Register({ onRegister, onSwitchToLogin, onClose }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!name || !email || !password || !confirmPassword) {
      setError('Por favor completa todos los campos')
      return
    }

    if (!email.includes('@')) {
      setError('Por favor ingresa un email válido')
      return
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    setLoading(true)
    setError('')
    setSuccess('')

    try {
      // Hacer petición al servidor PHP
      const response = await fetch(API_ENDPOINTS.REGISTER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Incluir cookies para sesiones
        body: JSON.stringify({
          nombre: name,
          correo: email,
          password: password
        })
      })

      const data = await response.json()

      if (data.success) {
        setSuccess('¡Cuenta creada exitosamente! Iniciando sesión...')
        
        const userData = {
          email: data.user.email,
          name: data.user.name,
          id: data.user.id
        }

        setTimeout(() => {
          onRegister(userData)
        }, 1500)
      } else {
        setError(data.message || 'Error al registrar')
      }
    } catch (err) {
      console.error('Error en registro:', err)
      setError('Error de conexión. Verifica que el servidor PHP esté ejecutándose.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-box register-box">
        <button
          type="button"
          className="close-btn"
          onClick={onClose}
          aria-label="Cerrar"
          title="Cerrar"
        >
          ✕
        </button>
        <div className="login-header">
          <img src="/logo-circle.jpg" alt="Perfect Glow Logo" className="login-logo-circle" />
        </div>

        <form onSubmit={handleSubmit} className="login-form">

          {error && <p className="login-error">{error}</p>}
          {success && <p className="login-success">{success}</p>}

          <div className="form-group">
            <label htmlFor="name">Nombre completo</label>
            <input
              id="name"
              type="text"
              placeholder="Tu nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
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
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar contraseña</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-input"
            />
          </div>

          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? 'Registrando...' : 'Registrarse'}
          </button>

          <p className="login-footer">
            ¿Ya tienes cuenta? <a href="#login" onClick={(e) => { e.preventDefault(); onSwitchToLogin(); }}>Inicia sesión</a>
          </p>
        </form>
      </div>
    </div>
  )
}
