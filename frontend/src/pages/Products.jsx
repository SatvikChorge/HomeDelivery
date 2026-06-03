import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../context/ProductContext";

function Products() {
  const { products } = useProducts();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");

  let filteredProducts = products.filter((product) => {
    const productName = product.name || "";
    const productCategory = product.category || "";

    const matchesSearch =
      productName.toLowerCase().includes(search.toLowerCase()) ||
      productCategory.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || productCategory === category;

    return matchesSearch && matchesCategory;
  });

  if (sort === "low-high") {
    filteredProducts.sort(
      (a, b) => Number(a.discountPrice) - Number(b.discountPrice)
    );
  }

  if (sort === "high-low") {
    filteredProducts.sort(
      (a, b) => Number(b.discountPrice) - Number(a.discountPrice)
    );
  }

  if (sort === "discount") {
    filteredProducts.sort((a, b) => {
      const discountA =
        ((Number(a.price) - Number(a.discountPrice)) / Number(a.price)) * 100;

      const discountB =
        ((Number(b.price) - Number(b.discountPrice)) / Number(b.price)) * 100;

      return discountB - discountA;
    });
  }

  if (sort === "newest") {
    filteredProducts.sort((a, b) => Number(b.id) - Number(a.id));
  }

  return (
    <div className="products-page">
      <h1>Our Products</h1>

      <div className="filter-box">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="All">All Categories</option>
          <option value="Furniture">Furniture</option>
          <option value="Accessories">Accessories</option>
          <option value="Decor">Decor</option>
          <option value="Gifts">Gifts</option>
          <option value="Toys">Toys</option>
        </select>

        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="default">Sort By</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
          <option value="discount">Biggest Discount</option>
          <option value="newest">Newest First</option>
        </select>
      </div>

      {filteredProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;