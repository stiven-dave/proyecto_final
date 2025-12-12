import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const BOX_CONTENTS = {
  'Nube Love': [
    { id: 1, type: 'Mascarilla', name: 'Mascarilla Hidratante', price: 12000, colorClass: 'card-blue', image: '/images/mascarilla.png' },
    { id: 2, type: 'Bálsamo', name: 'Bálsamo Labial Soft', price: 8000, colorClass: 'card-pink', image: '/images/balsamo.png' },
    { id: 3, type: 'Body Mist', name: 'Body Mist Sweet Love', price: 15000, colorClass: 'card-red', image: '/images/imagen1.webp' },
    { id: 4, type: 'Crema', name: 'Crema Corporal Romantic Glow', price: 15000, colorClass: 'card-purple', image: '/images/imagen2.webp' }
  ],
  'Nube Fresh': [
    { id: 5, type: 'Iluminador', name: 'Iluminador Líquido Gold', price: 10000, colorClass: 'card-blue', image: '/images/iluminador.png' },
    { id: 6, type: 'Gloss', name: 'Lip Gloss Shine', price: 15000, colorClass: 'card-pink', image: '/images/gloss.png' },
    { id: 7, type: 'Facial Mist', name: 'Facial Mist Fresh Boost', price: 5000, colorClass: 'card-green', image: '/images/imagen3.webp' },
    { id: 8, type: 'Gel', name: 'Gel Facial Refrescante', price: 18000, colorClass: 'card-teal', image: '/images/imagen4.jpg' }
  ],
  'Nube Glam': [
    { id: 9, type: 'Paleta', name: 'Paleta Sombras Nude', price: 20000, colorClass: 'card-blue', image: '/images/paleta.png' },
    { id: 10, type: 'Serum', name: 'Serum Facial Glow', price: 15000, colorClass: 'card-pink', image: '/images/serum.png' },
    { id: 11, type: 'Delineador', name: 'Delineador Glam Black', price: 9000, colorClass: 'card-purple', image: '/images/imagen5.webp' },
    { id: 12, type: 'Mini Labial', name: 'Mini Lipstick Glam Touch', price: 7000, colorClass: 'card-red', image: '/images/imagen6.jpg' },
  ],
  'Nube Color': [
    { id: 13, type: 'Sombras', name: 'Sombras Vibrantes', price: 10000, colorClass: 'card-blue', image: '/images/paleta.png' },
    { id: 14, type: 'Labial', name: 'Labial Intenso', price: 8000, colorClass: 'card-pink', image: '/images/gloss.png' },
    { id: 15, type: 'Rubor', name: 'Rubor Color Pop', price: 9000, colorClass: 'card-orange', image: '/images/imagen7.jpg' }
  ],

  'Nube Suave': [
    { id: 16, type: 'Gel de Limpieza', name: 'Gel Facial Suave', price: 10000, colorClass: 'card-blue', image: '/images/imagen8.webp' },
    { id: 17, type: 'Crema Hidratante', name: 'Hidratante Ligera', price: 15000, colorClass: 'card-pink', image: '/images/imagen9.jpg' },
    { id: 18, type: 'Protector Solar', name: 'Bloqueador Diario', price: 18000, colorClass: 'card-blue', image: '/images/imagen10.jpg' },
    { id: 19, type: 'Bálsamo Labial', name: 'Bálsamo Natural', price: 7000, colorClass: 'card-pink', image: '/images/balsamo.png' }
  ],

  'Nube Glow': [
    { id: 20, type: 'Serum', name: 'Serum Iluminador Soft Glow', price: 28000, colorClass: 'card-blue', image: '/images/serum.png' },
    { id: 21, type: 'Iluminador', name: 'Iluminador en Barra Lumi', price: 20000, colorClass: 'card-pink', image: '/images/iluminador.png' },
    { id: 22, type: 'Crema', name: 'Crema Glow Hidratante', price: 18000, colorClass: 'card-blue', image: '/images/imagen2.webp' },
    { id: 23, type: 'Tónico', name: 'Tónico Suavizante', price: 15000, colorClass: 'card-pink', image: '/images/imagen12.webp' },
    { id: 24, type: 'Gloss', name: 'Gloss Glow Transparente', price: 14000, colorClass: 'card-blue', image: '/images/gloss.png' },
    { id: 25, type: 'Mascarilla', name: 'Mascarilla Iluminadora Skin Radiance', price: 16000, colorClass: 'card-pink', image: '/images/mascarilla.png' }
  ],

  'Nube Deluxe': [
    { id: 26, type: 'Serum Premium', name: 'Serum Rejuvenecedor Platinum', price: 42000, colorClass: 'card-blue', image: '/images/serum.png' },
    { id: 27, type: 'Paleta', name: 'Paleta Glam Pro Trends', price: 55000, colorClass: 'card-pink', image: '/images/paleta.png' },
    { id: 28, type: 'Crema', name: 'Crema Anti-Edad Supreme', price: 38000, colorClass: 'card-blue', image: '/images/imagen2.webp' },
    { id: 29, type: 'Accesorio', name: 'Brocha Profesional SoftBlend', price: 25000, colorClass: 'card-pink', image: '/images/imagen13.webp' },
    { id: 30, type: 'Accesorio', name: 'Risk Roller Facial', price: 30000, colorClass: 'card-blue', image: '/images/imagen14.webp' },
    { id: 31, type: 'Mascarilla', name: 'Mascarilla Repair Gold', price: 20000, colorClass: 'card-pink', image: '/images/mascarilla.png' },
    { id: 32, type: 'Labial', name: 'Labial Matte Luxe', price: 22000, colorClass: 'card-blue', image: '/images/imagen14.webp' },
    { id: 33, type: 'Muestra', name: 'Mini Serum Sorpresa', price: 0, colorClass: 'card-pink', image: '/images/serum.png' },
    { id: 34, type: 'Muestra', name: 'Mini Crema Sorpresa', price: 0, colorClass: 'card-blue', image: '/images/imagen4.jpg' }
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

  const [excludedProductIds, setExcludedProductsIds] = useState([]);

  const currentProducts = BOX_CONTENTS[boxType] || BOX_CONTENTS['Nube Love'];

  const activeProducts = currentProducts.filter(p => !excludedProductIds.includes(p.id));

  const boxBasePrice = activeProducts.reduce((sum, item) => sum + item.price, 0);

  const totalPrice = boxBasePrice;

  const toggleProduct = (productId) => {
    setExcludedProductsIds(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else {
        const remaining = currentProducts.length - prev.length;
        if (remaining <= 1) {
          alert("Debes mantener al menos un producto en la caja.");
          return prev;
        }
        return [...prev, productId];
      }
    });
  };

  React.useEffect(() => {
    setExcludedProductsIds([]);
  }, [boxType]);

  const handleAddBoxToCart = () => {
    if (onAddToCart) {
      onAddToCart({
        name: `Caja ${boxType} (${skinType})`,
        products: activeProducts.length,
        price: formatPrice(totalPrice),
        rawPrice: totalPrice
      });
    }
  };

  return (
    <div className="create-box-page">
      <div className="create-box-container">

        <aside className="config-sidebar">
          <h2>Arma tu caja</h2>
          <p className="sidebar-subtitle">Elige opciones y mira la vista previa</p>

          <div className="option-group">
            <h3>Tipo de caja</h3>
            <div className="chips-container">
              {Object.keys(BOX_CONTENTS).map(type => (
                <button
                  key={type}
                  className={`option-chip box-type-chip ${boxType === type ? 'active' : ''}`}
                  onClick={() => setBoxType(type)}
                >
                  <span className="box-type-text">
                    <span className="box-type-name">{type}</span>
                  </span>
                </button>
              ))}
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

        <main className="preview-section">
          <div className="preview-header">
            <h2>Vista previa de tu Caja</h2>
            <p>Estos son los productos recomendados según tus elecciones</p>
          </div>

          {/* TARJETAS DE PRODUCTOS */}
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

                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: '90px',
                      height: '90px',
                      objectFit: 'contain',
                      marginBottom: '0.5rem'
                    }}
                  />

                  <h3>{product.type}</h3>

                  <div className="card-details">
                    <p className="card-product-name" style={{ fontWeight: 'bold' }}>
                      {product.name}
                    </p>
                    <p className="card-recommendation">
                      Recomendado para: {skinType.toLowerCase()}
                    </p>
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
