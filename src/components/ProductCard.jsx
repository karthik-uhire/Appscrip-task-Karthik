  export default function ProductCard({ product }) {
    return (
      <article className="card" aria-labelledby={`title-${product.id}`}>
        <img
          src={product.image}
          alt={`Image of ${product.title}`}
          width="200"
          height="200"
          loading="lazy"
          className="card-img"
        />
        <div className="card-body">
          <h3 id={`title-${product.id}`} className="product-title">
            {product.title}
          </h3>
          <p className="price">₹{Math.round(product.price * 82)}</p>
        </div>
      </article>
    );
  }
