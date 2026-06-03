import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext";

function ManageProducts() {
  const {
    products,
    deleteProduct,
  } = useProducts();

  return (
    <div className="admin-page">
      <h1>Manage Products</h1>

      <div className="manage-list">
        {products.map((product) => (
          <div
            className="manage-card"
            key={product.id}
          >
            <img
              src={product.image}
              alt={product.name}
            />

            <div>
              <h3>
                {product.name}
              </h3>

              <p>
                {product.category}
              </p>

              <p>
                ₹
                {
                  product.discountPrice
                }
              </p>
            </div>

            <div>
              <Link
                to={`/admin/edit/${product.id}`}
              >
                <button>
                  Edit
                </button>
              </Link>

              <button
                onClick={() =>
                  deleteProduct(
                    product.id
                  )
                }
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageProducts;