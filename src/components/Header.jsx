import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Header({ cartOpen, setCartOpen, itemCount, user, onLogout, onOpenAuth }) {
  // Modal state removed

  return (
    <>
      <header className="header">
        <div className="header-container">
          <div className="logo-section">
            <Link to="/">
              <img
                src="/logo.jpg"
                alt="Perfect Glow Logo"
                className="logo-image"
              />
            </Link>
            <div>
              <h1 className="brand-name">perfect Glow</h1>
              <p className="brand-subtitle">Cajas personalizadas • Belleza y cuidado</p>
            </div>
          </div>

          <nav className="nav-menu">
            <Link to="/" className="nav-link">Inicio</Link>
            <Link to="/products" className="nav-link">Productos</Link>
            <Link to="/create-box" className="nav-link">Cajas</Link>
            <Link to="/blog" className="nav-link">Blog</Link>
            <button
              className={`cart-icon-button ${cartOpen ? 'active' : ''}`}
              onClick={() => setCartOpen(!cartOpen)}
              title="Carrito de compra"
            >
              🛒
              {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
            </button>
          </nav>

          <div className="header-actions">
            {!user && (
              <button
                className="btn-login-header"
                onClick={() => onOpenAuth && onOpenAuth('login')}
              >
                Iniciar sesión
              </button>
            )}

            {user && (
              <div className="user-info">
                <span className="user-name">👤 {user.email}</span>
                <button
                  className="btn-logout"
                  onClick={onLogout}
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  )
}
