import { useState } from "react";
import { db, storage } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

function AddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    type: "",
    category: "",
    foodType: "", // ✅ Added new field
    image: null,
  });

  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      setFormData({ ...formData, image: file });
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      let imageUrl = "";

      if (formData.image) {
        const imageRef = ref(storage, `productImages/${uuidv4()}`);
        await uploadBytes(imageRef, formData.image);
        imageUrl = await getDownloadURL(imageRef);
      }

      const newProduct = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        type: formData.type,
        category: formData.category,
        foodType: formData.category === "food" ? formData.foodType : null, // ✅ Only add if food
        imageUrl,
        createdAt: new Date(),
      };

      await addDoc(collection(db, "products"), newProduct);

      alert("Product added successfully!");

      setFormData({
        name: "",
        description: "",
        price: "",
        type: "",
        category: "",
        foodType: "",
        image: null,
      });
      setPreviewUrl(null);
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-orange-300 p-8 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Product Name</label>
          <input
            type="text"
            name="name"
            className="mt-1 w-full border rounded-md px-4 py-2 focus:ring-orange-400 focus:border-orange-400"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            rows="3"
            className="mt-1 w-full border rounded-md px-4 py-2 focus:ring-orange-400 focus:border-orange-400"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Price (₪)</label>
          <input
            type="number"
            name="price"
            step="0.01"
            className="mt-1 w-full border rounded-md px-4 py-2 focus:ring-orange-400 focus:border-orange-400"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        {/* Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Type</label>
          <select
            name="type"
            className="mt-1 w-full border rounded-md px-4 py-2 bg-white focus:ring-orange-400 focus:border-orange-400"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="">Select pet type</option>
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
            className="mt-1 w-full border rounded-md px-4 py-2 bg-white focus:ring-orange-400 focus:border-orange-400"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="cage">Cage</option>
            <option value="food">Food</option>
            <option value="accessory">Accessory</option>
          </select>
        </div>

        {/* Food Type - Only if category is "food" */}
        {formData.category === "food" && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Food Type</label>
            <select
              name="foodType"
              className="mt-1 w-full border rounded-md px-4 py-2 bg-white focus:ring-orange-400 focus:border-orange-400"
              value={formData.foodType}
              onChange={handleChange}
              required
            >
              <option value="">Select Food Type</option>
              <option value="dry">Dry</option>
              <option value="wet">Wet</option>
            </select>
          </div>
        )}

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-orange-500 file:text-white hover:file:bg-orange-600"
            onChange={handleChange}
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
                  setFormData({ ...formData, image: null });
                  setPreviewUrl(null);
                }}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded-md transition"
              >
                Remove Image
              </button>
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className={`w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md font-semibold transition ${
            uploading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
