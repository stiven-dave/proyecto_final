export default function Cart({ cartItems, onRemoveItem }) {
  // [FIX] Calculate total using real prices
  const totalAmount = cartItems.reduce((sum, item) => {
    // Ensure rawPrice exists, if not try to parse price string or default to 0
    let price = item.rawPrice;
    if (typeof price !== 'number') {
      price = 0; // Fallback for legacy items without rawPrice
    }
    return sum + price;
  }, 0);

  const total = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(totalAmount);

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('El carrito está vacío')
      return
    }

    // Crear contenido del recibo
    const receiptContent = `
      <html>
        <head>
          <title>Recibo - Perfect Glow</title>
          <style>
            @page {
              margin: 0;
              size: auto;
            }
            body {
              font-family: 'Courier New', Courier, monospace;
              margin: 0;
              padding: 0;
              background-color: #f5f5f5;
              display: flex;
              justify-content: center;
            }
            .receipt-container {
              width: 320px; /* Ancho típico de impresora térmica */
              background: white;
              padding: 15px;
              margin: 20px;
              box-shadow: 0 0 5px rgba(0,0,0,0.1);
              color: #000;
              font-size: 12px;
            }
            .text-center { text-align: center; }
            .text-right { text-align: right; }
            .uppercase { text-transform: uppercase; }
            .bold { font-weight: bold; }
            
            h1 {
              font-size: 18px;
              margin: 5px 0;
            }
            p { margin: 2px 0; }
            
            .divider {
              border-top: 1px dashed #000;
              margin: 10px 0;
            }
            
            .item-row {
              display: flex;
              justify-content: space-between;
              margin-bottom: 5px;
            }
            
            .item-name {
              flex: 1;
              padding-right: 10px;
            }
            
            .total-row {
              display: flex;
              justify-content: space-between;
              font-size: 16px;
              font-weight: bold;
              margin-top: 10px;
            }
            
            .barcode {
              height: 40px;
              width: 90%;
              margin: 20px auto 10px;
              background: repeating-linear-gradient(
                90deg,
                #000 0px,
                #000 2px,
                #fff 2px,
                #fff 4px,
                #000 4px,
                #000 5px,
                #fff 5px,
                #fff 7px
              );
            }
            
            @media print {
              body { background: white; margin: 0; }
              .receipt-container {
                width: 100%;
                margin: 0;
                box-shadow: none;
                padding: 0;
              }
              /* Ocultar elementos de UI del navegador si es posible */
              @page { margin: 0; }
            }
          </style>
        </head>
        <body>
          <div class="receipt-container">
            <div class="text-center">
              <h1 class="uppercase">Perfect Glow</h1>
              <p>Cajas personalizadas</p>
              <p>NIT: 900.123.456-7</p>
              <p>Calle 123 # 45-67, Bogotá</p>
              <p>Tel: (601) 123 4567</p>
            </div>
            
            <div class="divider"></div>
            
            <div>
              <p><strong>FECHA:</strong> ${new Date().toLocaleString('es-CO')}</p>
              <p><strong>TICKET:</strong> #${Math.floor(Math.random() * 10000).toString().padStart(6, '0')}</p>
              <p><strong>CLIENTE:</strong> CONSUMIDOR FINAL</p>
            </div>
            
            <div class="divider"></div>
            
            <div class="items-list">
              <div class="item-row bold">
                <span class="item-name">DESCRIPCION</span>
                <span>VALOR</span>
              </div>
              <div style="border-bottom: 1px dashed #000; margin: 5px 0;"></div>
              
              ${cartItems.map(item => `
                <div class="item-row">
                  <span class="item-name">${item.name.replace(' (10% off)', '')}</span>
                  <span>${item.price}</span>
                </div>
              `).join('')}
            </div>
            
            <div class="divider"></div>
            
            <div class="total-row">
              <span>TOTAL A PAGAR:</span>
              <span>${total}</span>
            </div>
            
            <div class="divider"></div>
            
            <div class="text-center">
              <p>¡GRACIAS POR TU COMPRA!</p>
              <p>Guarda este tirilla para reclamos</p>
              <p>www.perfectglow.com</p>
            </div>
            
            <div class="barcode"></div>
            <div class="text-center" style="font-size: 10px;">
              ${Math.random().toString(36).substring(2, 10).toUpperCase()}
            </div>
          </div>
        </body>
      </html>
    `

    // Abrir ventana de impresión
    const printWindow = window.open('', '', 'width=600,height=700')
    printWindow.document.write(receiptContent)
    printWindow.document.close()

    // Esperar a que cargue y luego imprimir
    setTimeout(() => {
      printWindow.print()
    }, 250)
  }

  return (
    <aside className="cart-sidebar">
      <div className="cart-content">
        <h3 className="cart-title">Carrito</h3>

        {cartItems.length === 0 ? (
          <p className="cart-empty">Tu carrito está vacío</p>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-header">
                    <span className="item-label">Incluye</span>
                    <button
                      className="btn-remove"
                      onClick={() => onRemoveItem(item.id)}
                      title="Eliminar del carrito"
                    >
                      ✕
                    </button>
                  </div>
                  <h4 className="item-name">{item.name}</h4>
                  <p className="item-products">{item.products} productos</p>
                  <p className="item-price">{item.price}</p>
                </div>
              ))}
            </div>

            <div className="cart-total">
              <p className="total-label">Total:</p>
              <p className="total-amount">{total}</p>
            </div>

            <button className="btn-checkout" onClick={handleCheckout}>
              Pagar
            </button>
          </>
        )}
      </div>
    </aside>
  )
}
