// src/admin/pages/EditProduct.js
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebase";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    type: "",
    category: "",
    image: null,
  });

  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", id);
        const snap = await getDoc(docRef);

        if (snap.exists()) {
          const data = snap.data();
          setFormData({
            name: data.name,
            description: data.description,
            price: data.price,
            type: data.type,
            category: data.category,
            image: null,
          });
          setPreviewUrl(data.imageUrl);
        } else {
          console.error("Product not found");
        }
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      setFormData((prev) => ({ ...prev, image: file }));
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = previewUrl;

      if (formData.image) {
        const imageRef = ref(storage, `productImages/${crypto.randomUUID()}`);
        await uploadBytes(imageRef, formData.image);
        imageUrl = await getDownloadURL(imageRef);
      }

      await updateDoc(doc(db, "products", id), {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        type: formData.type,
        category: formData.category,
        imageUrl,
      });

      alert("Product updated successfully.");
      navigate("/admin"); // redirect back
    } catch (err) {
      console.error("Error updating product:", err);
      alert("Failed to update product.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-orange-100 p-8 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 w-full border rounded-md px-4 py-2"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            required
            className="mt-1 w-full border rounded-md px-4 py-2"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Price (₪)</label>
          <input
            type="number"
            name="price"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            required
            className="mt-1 w-full border rounded-md px-4 py-2"
          />
        </div>

        {/* Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            className="mt-1 w-full border rounded-md px-4 py-2"
          >
            <option value="">Select Type</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="bird">Bird</option>
            <option value="rodent">Rodent</option>
          </select>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="mt-1 w-full border rounded-md px-4 py-2"
          >
            <option value="">Select Category</option>
            <option value="cage">Cage</option>
            <option value="food">Food</option>
            <option value="accessory">Accessory</option>
          </select>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-orange-500 file:text-white hover:file:bg-orange-600"
          />
          {previewUrl && (
            <div className="mt-4 flex flex-col items-start gap-3">
              <img
                src={previewUrl}
                alt="Preview"
                className="h-40 w-40 object-cover rounded-md shadow"
              />
              <button
                type="button"
                onClick={() => {
                  setFormData((prev) => ({ ...prev, image: null }));
                  setPreviewUrl(null);
                }}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded-md"
              >
                Remove Image
              </button>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md font-semibold"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditProduct;
