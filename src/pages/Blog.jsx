export default function Blog() {
  return (
    <div className="blog-page">
      
      {/* Encabezado */}
      <div className="blog-hero">
        <h1 className="blog-title">Blog de Belleza</h1>
        <p className="blog-subtitle">
          Inspiración, tips y experiencias reales de nuestras clientas.
        </p>
      </div>

      <div className="blog-content">

        {/* Sección Testimonios */}
        <section className="testimonios-section">
          <h2 className="section-title">✨ Testimonios Reales ✨</h2>
          <p className="section-subtitle">
            Mira lo que nuestras clientas opinan después de usar nuestros productos.
          </p>

          {/* Testimonio 1 */}
          <div className="testimonio-card">
            <p className="testimonio-text">
              esto es lo que nos dijon nuestras primera clienta despues de usar nuestros productos
            </p>

            <img
              src="/images/testimonio1.jpg"
              alt="testimonio"
              className="testimonio-img"
            />
          </div>

          {/* Testimonio 2 */}
          <div className="testimonio-card">
            <p className="testimonio-text">
              esto es lo que nos dijon nuestras segunda clienta despues de usar nuestros productos
            </p>

            <img
              src="/images/testimonio2.jpg"
              alt="testimonio"
              className="testimonio-img"
            />
          </div>

          {/* Testimonio 3 */}
          <div className="testimonio-card">
            <p className="testimonio-text">
              esto es lo que nos dijon nuestras tercera clienta despues de usar nuestros productos
            </p>

            <img
              src="/images/testimonio3.jpg"
              alt="testimonio"
              className="testimonio-img"
            />
          </div>

         {/* Testimonio 4 */}
          <div className="testimonio-card">
            <p className="testimonio-text">
              esto es lo que nos dijon nuestras cuarta  clienta despues de usar nuestros productos
            </p>

            <img
              src="/images/testimonio4.jpg"
              alt="testimonio"
              className="testimonio-img"
            />
          </div>

         {/* Testimonio 5 */}
          <div className="testimonio-card">
            <p className="testimonio-text">
              esto es lo que nos dijon nuestras clienta numero cinco despues de usar nuestros productos
            </p>

            <img
              src="/images/testimonio5.jpg"
              alt="testimonio"
              className="testimonio-img"
            />
          </div>

          {/* Testimonio 6 */}
          <div className="testimonio-card">
            <p className="testimonio-text">
              esto es lo que nos dijon nuestras clienta numero seis despues de usar nuestros productos
            </p>

            <img
              src="/images/testimonio6.jpg"
              alt="testimonio"
              className="testimonio-img"
            />
          </div>

        </section>

      </div>
    </div>
  );
}
