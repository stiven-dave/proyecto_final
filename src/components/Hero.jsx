import { Link } from 'react-router-dom'

export default function Hero({ onOpenCart }) {
  return (
    <div className="hero">
      <div className="hero-content">
        <div className="hero-left">
          <h2 className="hero-title">Tu belleza, envuelta en una perfeccion ✨</h2>
          <p className="hero-description">
            Arma tu caja personalizada según tu tipo de piel, estilo y aroma favorito. Productos probados, envíos rápidos y una tarjeta con recomendaciones en cada caja.
          </p>

          <div className="hero-buttons">
            <Link to="/create-box" className="btn btn-primary">Crear mi caja</Link>
            <Link to="/products" className="btn btn-secondary">Ver productos</Link>
          </div>

          <div className="offer-badge">
            <span className="offer-label">Oferta</span>
            <span className="offer-text">10% off en tu primera caja</span>
          </div>
        </div>
      </div>

      {/* What We Sell Section */}
      <div className="what-we-sell-section">
        <h2 className="section-title">¿Qué vende Perfect Glow?</h2>
        <p className="section-subtitle">Cajas temáticas de belleza con productos cuidadosamente seleccionados</p>

        <div className="product-categories">
          {/* Skincare Category */}
          <div className="category-card">
            <div className="category-header">
              <span className="category-icon">✨</span>
              <h3 className="category-title">Productos de Skincare</h3>
            </div>
            <ul className="product-list">
              <li>Mascarillas hidratantes</li>
              <li>Cremas faciales</li>
              <li>Sérums</li>
              <li>Parches para ojos</li>
              <li>Mini tónicos</li>
            </ul>
          </div>

          {/* Makeup Category */}
          <div className="category-card">
            <div className="category-header">
              <span className="category-icon">💄</span>
              <h3 className="category-title">Productos de Maquillaje</h3>
            </div>
            <ul className="product-list">
              <li>Labiales</li>
              <li>Delineadores</li>
              <li>Rubores</li>
              <li>Sombras</li>
              <li>Mini iluminadores</li>
            </ul>
          </div>

          {/* Accessories Category */}
          <div className="category-card">
            <div className="category-header">
              <span className="category-icon">🌺</span>
              <h3 className="category-title">Complementos</h3>
            </div>
            <ul className="product-list">
              <li>Scrunchies</li>
              <li>Brochas mini</li>
              <li>Esponjas blender</li>
              <li>Pinzas</li>
              <li>Accesorios estéticos pequeños</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
