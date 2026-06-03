import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../context/ProductContext";

function Home() {
  const { products } = useProducts();
  const featuredProducts = products.slice(0, 3);

  return (
    <div>
      <section className="hero-section">
        <div className="hero-content">
          <h1>NonPerishKart</h1>
          <h2>Durable Products For Everyday Life</h2>
          <p>Discover furniture, accessories, home decor and more.</p>

          <Link to="/products">
            <button>Shop Now</button>
          </Link>
        </div>
      </section>

      <section className="categories">
        <h2>Shop Categories</h2>

        <div className="category-grid">
          <div className="category-card">Furniture</div>
          <div className="category-card">Accessories</div>
          <div className="category-card">Decor</div>
          <div className="category-card">Gifts</div>
        </div>
      </section>

      <section className="featured">
        <h2>Featured Products</h2>

        <div className="grid">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;