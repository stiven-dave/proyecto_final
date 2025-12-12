import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const BOX_CONTENTS = {
  'Nube Love': [
    { id: 1, type: 'Mascarilla', name: 'Mascarilla Hidratante', price: 12000, colorClass: 'card-blue', image: '/images/mascarilla.png' },
    { id: 2, type: 'Bálsamo', name: 'Bálsamo Labial Soft', price: 8000, colorClass: 'card-pink', image: '/images/balsamo.png' }
  ],
  'Nube Fresh': [
    { id: 3, type: 'Iluminador', name: 'Iluminador Líquido Gold', price: 25000, colorClass: 'card-blue', image: '/images/iluminador.png' },
    { id: 4, type: 'Gloss', name: 'Lip Gloss Shine', price: 15000, colorClass: 'card-pink', image: '/images/gloss.png' }
  ],
  'Nube Glam': [
    { id: 5, type: 'Paleta', name: 'Paleta Sombras Nude', price: 45000, colorClass: 'card-blue', image: '/images/paleta.png' },
    { id: 6, type: 'Serum', name: 'Serum Facial Glow', price: 35000, colorClass: 'card-pink', image: '/images/serum.png' }
  ],
  'Nube Color': [
    { id: 7, type: 'Sombras', name: 'Sombras Vibrantes', price: 38000, colorClass: 'card-blue', image: '/images/paleta.png' },
    { id: 8, type: 'Labial', name: 'Labial Intenso', price: 22000, colorClass: 'card-pink', image: '/images/gloss.png' }
  ]
};

const SKIN_TYPES = [
  { name: 'Seca', image: '/images/piel_seca.png' },
  { name: 'Mixta', image: '/images/piel_mixta.png' },
  { name: 'Grasa', image: '/images/piel_grasa.png' },
  { name: 'Sensible', image: '/images/piel_sensible.png' }
];

const formatPrice = (price) => {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(price);
};

export default function CreateBox({ onAddToCart }) {
  const [boxType, setBoxType] = useState('Nube Fresh');
  const [skinType, setSkinType] = useState('Seca');


  const [excludedProductIds, setExcludedProductsIds] = useState([]); // [NEW] Track removed products

  const currentProducts = BOX_CONTENTS[boxType] || BOX_CONTENTS['Nube Love'];

  // [NEW] Filter active products
  const activeProducts = currentProducts.filter(p => !excludedProductIds.includes(p.id));

  // [NEW] Calculate price based on ACTIVE products
  const boxBasePrice = activeProducts.reduce((sum, item) => sum + item.price, 0);


  const totalPrice = boxBasePrice;

  // [NEW] Toggle product selection
  const toggleProduct = (productId) => {
    setExcludedProductsIds(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId); // Restore
      } else {
        // [Validation] Don't allow removing the last product
        const remaining = currentProducts.length - prev.length;
        if (remaining <= 1) {
          alert("Debes mantener al menos un producto en la caja.");
          return prev;
        }
        return [...prev, productId]; // Remove
      }
    });
  };

  // [NEW] Reset exclusions when box type changes
  React.useEffect(() => {
    setExcludedProductsIds([]);
  }, [boxType]);

  const handleAddBoxToCart = () => {
    if (onAddToCart) {
      onAddToCart({
        name: `Caja ${boxType} (${skinType})`,
        products: activeProducts.length, // [NEW] Use active count
        price: formatPrice(totalPrice),
        rawPrice: totalPrice
      });
    }
  };

  return (
    <div className="create-box-page">
      <div className="create-box-container">
        {/* Sidebar de Configuración */}
        <aside className="config-sidebar">
          <h2>Arma tu caja</h2>
          <p className="sidebar-subtitle">Elige opciones y mira la vista previa</p>

          <div className="option-group">
            <h3>Tipo de caja</h3>
            <div className="chips-container">
              {Object.keys(BOX_CONTENTS).map(type => {
                return (
                  <button
                    key={type}
                    className={`option-chip box-type-chip ${boxType === type ? 'active' : ''}`}
                    onClick={() => setBoxType(type)}
                  >
                    <span className="box-type-text">
                      <span className="box-type-name">{type}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="option-group">
            <h3>Tipo de piel</h3>
            <div className="chips-container">
              {SKIN_TYPES.map(type => (
                <button
                  key={type.name}
                  className={`option-chip box-type-chip ${skinType === type.name ? 'active' : ''}`}
                  onClick={() => setSkinType(type.name)}
                >
                  <span className="box-type-text">
                    <span className="box-type-name">{type.name}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>




        </aside>

        {/* Área Principal de Vista Previa */}
        <main className="preview-section">
          <div className="preview-header">
            <h2>Vista previa de tu Caja</h2>
            <p>Estos son los productos recomendados según tus elecciones</p>
          </div>

          <div className="preview-cards">
            {currentProducts.map(product => {
              const excluded = excludedProductIds.includes(product.id);
              return (
                <div
                  key={product.id}
                  className={`preview-card ${product.colorClass}`}
                  onClick={() => toggleProduct(product.id)}
                  style={{
                    cursor: 'pointer',
                    opacity: excluded ? 0.4 : 1,
                    filter: excluded ? 'grayscale(80%)' : 'none',
                    transition: 'all 0.3s ease'
                  }}
                  title={excluded ? "Click para agregar" : "Click para quitar"}
                >
                  <div style={{ position: 'absolute', top: 10, right: 10, fontSize: '1.2rem' }}>
                    {excluded ? '❌' : '✅'}
                  </div>
                  <h3>{product.type}</h3>
                  <div className="card-details">
                    <p className="card-product-name">{product.name}</p>
                    <p className="card-recommendation">Recomendado para: {skinType.toLowerCase()}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="box-summary-action" style={{ marginTop: '2rem', textAlign: 'center' }}>
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              Total: {formatPrice(totalPrice)}
            </p>
            <button
              className="btn-crear-caja"
              onClick={handleAddBoxToCart}
              style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}
            >
              Agregar Caja al Carrito
            </button>
          </div>

          <div className="features-section">
            <h3>Por qué nos eligen</h3>
            <ul>
              <li>Productos testeados y seguros</li>
              <li>Empaque ecológico y bonito</li>
              <li>Guía personalizada en cada caja</li>
              <li>Envíos en 48-72 horas (según zona)</li>
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
}
