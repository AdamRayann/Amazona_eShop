import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const snapshot = await getDocs(collection(db, "products"));
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(data);
    };

    fetchProducts();
  }, []);

  const toggleArchive = async (id, currentStatus) => {
    await updateDoc(doc(db, "products", id), { archived: !currentStatus });
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, archived: !currentStatus } : p
      )
    );
  };

  const toggleStock = async (id, currentStatus) => {
    await updateDoc(doc(db, "products", id), { inStock: !currentStatus });
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, inStock: !currentStatus } : p
      )
    );
  };

  const deleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteDoc(doc(db, "products", id));
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Manage Products</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-orange-100 rounded shadow">
          <thead className="bg-orange-500 text-white">
            <tr>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Price (₪)</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
              <tr key={prod.id} className="border-b hover:bg-gray-50">
                <td className="p-3">
                  <img
                    src={prod.imageUrl}
                    alt={prod.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="p-3 font-medium">{prod.name}</td>
                <td className="p-3">{prod.type}</td>
                <td className="p-3">{prod.category}</td>
                <td className="p-3">{prod.price?.toFixed(2)}</td>
                <td className="p-3">
                  {prod.archived
                    ? "Archived"
                    : prod.inStock === false
                    ? "Out of Stock"
                    : "Active"}
                </td>
                <td className="p-3 space-x-2">
                  <Link
                    to={`/admin/edit/${prod.id}`}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-sm"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteProduct(prod.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => toggleArchive(prod.id, prod.archived)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded text-sm"
                  >
                    {prod.archived ? "Unarchive" : "Archive"}
                  </button>
                  <button
                    onClick={() => toggleStock(prod.id, prod.inStock)}
                    className="bg-gray-700 hover:bg-gray-800 text-white px-2 py-1 rounded text-sm"
                  >
                    {prod.inStock === false ? "In Stock" : "Out of Stock"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductList;
