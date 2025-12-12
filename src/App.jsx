import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import Cart from './components/Cart'
import Login from './components/Login'
import Register from './components/Register'
import CreateBox from './pages/CreateBox'
import ProductCatalog from './pages/ProductCatalog'
import Blog from './pages/Blog'
import { API_ENDPOINTS } from './config/api'


export default function App() {
  const [authPage, setAuthPage] = useState('login') // 'login' o 'register'
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user')
      return savedUser ? JSON.parse(savedUser) : null
    } catch (error) {
      console.error('Error al cargar usuario:', error)
      return null
    }
  })
  const [showAuthModal, setShowAuthModal] = useState(false)

  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState(() => {
    const savedItems = localStorage.getItem('cartItems')
    if (savedItems) {
      try {
        return JSON.parse(savedItems)
      } catch (error) {
        console.error('Error al cargar carrito:', error)
        return [
          { id: 1, name: 'Nube Glow • glam', products: 3, price: '$10.00' },
          { id: 2, name: 'Nube Deluxe • colorido', products: 4, price: '$27.50' }
        ]
      }
    }
    return [
      { id: 1, name: 'Nube Glow • glam', products: 3, price: '$10.00' },
      { id: 2, name: 'Nube Deluxe • colorido', products: 4, price: '$27.50' }
    ]
  })

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    try {
      localStorage.setItem('cartItems', JSON.stringify(cartItems))
    } catch (error) {
      console.error('Error al guardar carrito:', error)
    }
  }, [cartItems])

  // Guardar usuario en localStorage cuando cambie
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user))
        console.log('✓ Usuario guardado en localStorage:', user)
      } else {
        localStorage.removeItem('user')
        console.log('✓ Usuario eliminado de localStorage')
      }
    } catch (error) {
      console.error('✗ Error al guardar usuario:', error)
    }
  }, [user])

  // Sincronizar cambios entre pestañas
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'user') {
        try {
          const updatedUser = e.newValue ? JSON.parse(e.newValue) : null
          setUser(updatedUser)
          console.log('✓ Usuario sincronizado desde otra pestaña:', updatedUser)
        } catch (error) {
          console.error('Error al sincronizar usuario:', error)
        }
      }
      if (e.key === 'cartItems') {
        try {
          const updatedItems = e.newValue ? JSON.parse(e.newValue) : []
          setCartItems(updatedItems)
        } catch (error) {
          console.error('Error al sincronizar carrito:', error)
        }
      }
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const handleLogin = (userData) => {
    try {
      console.log('→ handleLogin recibido:', userData)
      setUser(userData)
      localStorage.setItem('user', JSON.stringify(userData))
      console.log('✓ Usuario guardado en handleLogin:', userData)
    } catch (error) {
      console.error('✗ Error en handleLogin:', error)
    }
  }

  const handleRegister = (userData) => {
    try {
      console.log('→ handleRegister recibido:', userData)
      setUser(userData)
      localStorage.setItem('user', JSON.stringify(userData))
      console.log('✓ Usuario registrado y guardado:', userData)
    } catch (error) {
      console.error('✗ Error en handleRegister:', error)
    }
  }

  const handleLogout = async () => {
    try {
      // Llamar al endpoint de logout en PHP
      await fetch(API_ENDPOINTS.LOGOUT, {
        method: 'POST',
        credentials: 'include'
      }).catch(err => {
        console.warn('Error al cerrar sesión en el servidor:', err)
      })
      
      setUser(null)
      localStorage.removeItem('user')
      console.log('✓ Usuario cerró sesión')
    } catch (error) {
      console.error('✗ Error al cerrar sesión:', error)
      // Aún así, limpiar el estado local
      setUser(null)
      localStorage.removeItem('user')
    }
  }

  const handleRemoveItem = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId))
  }

  const handleAddToCart = (newItem) => {
    // [NEW] Logic for 10% discount on first box
    let finalItem = { ...newItem, id: Date.now() };

    if (cartItems.length === 0) {
      const discountedRawPrice = newItem.rawPrice * 0.9;
      // Format to COP currency
      const formattedPrice = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        maximumFractionDigits: 0
      }).format(discountedRawPrice);

      finalItem = {
        ...finalItem,
        name: `${newItem.name} (10% off)`,
        price: formattedPrice,
        rawPrice: discountedRawPrice,
      };
    }

    setCartItems([...cartItems, finalItem])
    setCartOpen(true) // Open cart to show the new item
  }

  // Render app always; if user not logged show auth modal overlay
  return (
    <Router>
      <div className="app">
        <Header
          cartOpen={cartOpen}
          setCartOpen={setCartOpen}
          itemCount={cartItems.length}
          user={user}
          onLogout={handleLogout}
          onOpenAuth={(page) => { setAuthPage(page || 'login'); setShowAuthModal(true); }}
        />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Hero onOpenCart={() => setCartOpen(true)} />} />
            <Route path="/create-box" element={<CreateBox onAddToCart={handleAddToCart} />} />
            <Route path="/products" element={<ProductCatalog onAddToCart={handleAddToCart} />} />
            <Route path="/blog" element={<Blog />} />
          </Routes>
          {cartOpen && <Cart cartItems={cartItems} onRemoveItem={handleRemoveItem} />}
        </main>

        {/* Show auth modal only when user is not logged AND user requested it */}
        {!user && showAuthModal && (
          <div className="auth-modal-overlay" role="dialog" aria-modal="true" onClick={() => setShowAuthModal(false)}>
            <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
              {authPage === 'login' ? (
                <Login
                  onLogin={(u) => { handleLogin(u); setShowAuthModal(false); }}
                  onSwitchToRegister={() => setAuthPage('register')}
                  onClose={() => setShowAuthModal(false)}
                />
              ) : (
                <Register
                  onRegister={(u) => { handleRegister(u); setShowAuthModal(false); }}
                  onSwitchToLogin={() => setAuthPage('login')}
                  onClose={() => setShowAuthModal(false)}
                />
              )}
            </div>
          </div>
        )}


      </div>
    </Router>
  )
}
