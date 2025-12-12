import { useState } from 'react';
import { Link } from 'react-router-dom';

// All available products for individual purchase
const ALL_PRODUCTS = [
    { id: 1, type: 'Mascarilla', name: 'Mascarilla Hidratante', price: 12000, description: 'Hidratación profunda para piel seca', image: '/images/mascarilla.png' },
    { id: 2, type: 'Bálsamo', name: 'Bálsamo Labial Soft', price: 8000, description: 'Labios suaves y protegidos', image: '/images/balsamo.png' },
    { id: 3, type: 'Iluminador', name: 'Iluminador Líquido Gold', price: 25000, description: 'Brillo natural y radiante', image: '/images/iluminador.png' },
    { id: 4, type: 'Gloss', name: 'Lip Gloss Shine', price: 15000, description: 'Brillo intenso y duradero', image: '/images/gloss.png' },
    { id: 5, type: 'Paleta', name: 'Paleta Sombras Nude', price: 45000, description: 'Tonos neutros versátiles', image: '/images/paleta.png' },
    { id: 6, type: 'Serum', name: 'Serum Facial Glow', price: 35000, description: 'Luminosidad y juventud', image: '/images/serum.png' },
    { id: 7, type: 'Sombras', name: 'Sombras Vibrantes', price: 38000, description: 'Colores intensos y pigmentados', image: '/images/paleta.png' },
    { id: 8, type: 'Labial', name: 'Labial Intenso', price: 22000, description: 'Color duradero y mate', image: '/images/gloss.png' },
    { id: 9, type: 'Crema', name: 'Crema Facial Nutritiva', price: 28000, description: 'Nutrición y suavidad', image: '/images/serum.png' },
    { id: 10, type: 'Tónico', name: 'Tónico Refrescante', price: 18000, description: 'Equilibra y refresca', image: '/images/mascarilla.png' },
    { id: 11, type: 'Rubor', name: 'Rubor Natural Glow', price: 20000, description: 'Color natural en tus mejillas', image: '/images/balsamo.png' },
    { id: 12, type: 'Delineador', name: 'Delineador Precision', price: 16000, description: 'Trazo preciso y definido', image: '/images/gloss.png' },
];

const CATEGORIES = ['Todos', 'Mascarilla', 'Bálsamo', 'Iluminador', 'Gloss', 'Paleta', 'Serum', 'Sombras', 'Labial', 'Crema', 'Tónico', 'Rubor', 'Delineador'];

const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(price);
};

export default function ProductCatalog({ onAddToCart }) {
    const [selectedCategory, setSelectedCategory] = useState('Todos');
    const [addedProducts, setAddedProducts] = useState(new Set());

    const filteredProducts = selectedCategory === 'Todos'
        ? ALL_PRODUCTS
        : ALL_PRODUCTS.filter(p => p.type === selectedCategory);

    const handleAddToCart = (product) => {
        if (onAddToCart) {
            onAddToCart({
                name: product.name,
                products: 1, // Individual product
                price: formatPrice(product.price),
                rawPrice: product.price,
                isIndividual: true, // Flag to identify individual products
                productType: product.type
            });

            // Visual feedback
            setAddedProducts(prev => new Set([...prev, product.id]));
            setTimeout(() => {
                setAddedProducts(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(product.id);
                    return newSet;
                });
            }, 2000);
        }
    };

    return (
        <div className="product-catalog-page">
            <div className="catalog-header">
                <h1 className="catalog-title">Productos Individuales</h1>
                <p className="catalog-subtitle">Compra tus productos favoritos por unidad</p>
            </div>

            {/* Category Filters */}
            <div className="category-filters">
                {CATEGORIES.map(category => (
                    <button
                        key={category}
                        className={`category-filter-btn ${selectedCategory === category ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Products Grid */}
            <div className="products-grid">
                {filteredProducts.map(product => {
                    const isAdded = addedProducts.has(product.id);
                    return (
                        <div key={product.id} className="product-card">
                            <div className="product-image-container">
                                <div className="product-image-placeholder">
                                    <span className="product-emoji">
                                        {product.type === 'Mascarilla' && '🧴'}
                                        {product.type === 'Bálsamo' && '💋'}
                                        {product.type === 'Iluminador' && '✨'}
                                        {product.type === 'Gloss' && '💄'}
                                        {product.type === 'Paleta' && '🎨'}
                                        {product.type === 'Serum' && '💧'}
                                        {product.type === 'Sombras' && '🌈'}
                                        {product.type === 'Labial' && '💄'}
                                        {product.type === 'Crema' && '🧴'}
                                        {product.type === 'Tónico' && '💦'}
                                        {product.type === 'Rubor' && '🌸'}
                                        {product.type === 'Delineador' && '✏️'}
                                    </span>
                                </div>
                                <span className="product-type-badge">{product.type}</span>
                            </div>

                            <div className="product-info">
                                <h3 className="product-name">{product.name}</h3>
                                <p className="product-description">{product.description}</p>
                                <p className="product-price">{formatPrice(product.price)}</p>

                                <button
                                    className={`btn-add-product ${isAdded ? 'added' : ''}`}
                                    onClick={() => handleAddToCart(product)}
                                    disabled={isAdded}
                                >
                                    {isAdded ? '✓ Agregado' : 'Agregar al Carrito'}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {filteredProducts.length === 0 && (
                <div className="no-products">
                    <p>No hay productos en esta categoría</p>
                </div>
            )}

            {/* Info Section */}
            <div className="catalog-info-section">
                <h3>¿Por qué comprar productos individuales?</h3>
                <div className="info-grid">
                    <div className="info-item">
                        <span className="info-icon">🎯</span>
                        <h4>Elige lo que necesitas</h4>
                        <p>Compra solo los productos que realmente quieres</p>
                    </div>
                    <div className="info-item">
                        <span className="info-icon">💰</span>
                        <h4>Control de presupuesto</h4>
                        <p>Ajusta tu compra según tu presupuesto</p>
                    </div>
                    <div className="info-item">
                        <span className="info-icon">🚀</span>
                        <h4>Envío rápido</h4>
                        <p>Recibe tus productos en 48-72 horas</p>
                    </div>
                    <div className="info-item">
                        <span className="info-icon">✨</span>
                        <h4>Calidad garantizada</h4>
                        <p>Productos testeados y seguros</p>
                    </div>
                </div>
            </div>

            {/* CTA to boxes */}
            <div className="cta-boxes-section">
                <h3>¿Prefieres una caja personalizada?</h3>
                <p>Ahorra más con nuestras cajas temáticas</p>
                <Link to="/create-box" className="btn-cta-boxes">
                    Crear mi caja personalizada
                </Link>
            </div>
        </div>
    );
}
