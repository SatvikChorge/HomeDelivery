import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { useState } from "react";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, updateProduct } = useProducts();

  const product = products.find((item) => item.id === Number(id));

  const [formData, setFormData] = useState(product);

  if (!product) {
    return <h2 className="page">Product not found</h2>;
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleImageUpload(e) {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData({
        ...formData,
        image: reader.result,
      });
    };

    reader.readAsDataURL(file);
  }

  function handleSubmit(e) {
    e.preventDefault();

    updateProduct(Number(id), formData);
    navigate("/admin/products");
  }

  return (
    <div className="admin-page">
      <form className="admin-form" onSubmit={handleSubmit}>
        <h1>Edit Product</h1>

        <input name="name" value={formData.name} onChange={handleChange} />

        <input name="category" value={formData.category} onChange={handleChange} />

        <input name="price" type="number" value={formData.price} onChange={handleChange} />

        <input name="discountPrice" type="number" value={formData.discountPrice} onChange={handleChange} />

        <input type="file" accept="image/*" onChange={handleImageUpload} />

        {formData.image && (
          <img src={formData.image} alt="Preview" className="image-preview" />
        )}

        <textarea name="description" value={formData.description} onChange={handleChange}></textarea>

        <button type="submit">Update Product</button>
      </form>
    </div>
  );
}

export default EditProduct;