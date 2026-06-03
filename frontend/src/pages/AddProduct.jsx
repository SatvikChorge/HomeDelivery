import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import axios from "axios";
import toast from "react-hot-toast";

function AddProduct() {
  const { addProduct } = useProducts();
  const navigate = useNavigate();

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    discountPrice: "",
    image: "",
    description: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleImageUpload(e) {
    const file = e.target.files[0];

    if (!file) return;

    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e) {
  e.preventDefault();

  try {
    if (
      !formData.name ||
      !formData.category ||
      !formData.price ||
      !formData.discountPrice ||
      !imageFile ||
      !formData.description
    ) {
      toast.error("Please fill all fields!");
      return;
    }

    const imageData = new FormData();
    imageData.append("image", imageFile);

    const uploadRes = await axios.post(
      "https://homedelivery-1.onrender.com/api/upload",
      imageData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const productData = {
      ...formData,
      image: uploadRes.data.imageUrl,
    };

    await addProduct(productData);
    navigate("/products");
  } catch (error) {
    console.log("ADD PRODUCT PAGE ERROR:", error.response?.data || error.message);
    toast.error(error.response?.data?.error || "Product upload failed");
  }
}

  return (
    <div className="admin-page">
      <form className="admin-form" onSubmit={handleSubmit}>
        <h1>Add Product</h1>

        <input
          name="name"
          type="text"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          name="category"
          type="text"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
        />

        <input
          name="price"
          type="number"
          placeholder="Original Price"
          value={formData.price}
          onChange={handleChange}
        />

        <input
          name="discountPrice"
          type="number"
          placeholder="Discount Price"
          value={formData.discountPrice}
          onChange={handleChange}
        />

        <input type="file" accept="image/*" onChange={handleImageUpload} />

        {preview && (
          <img src={preview} alt="Preview" className="image-preview" />
        )}

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        ></textarea>

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;