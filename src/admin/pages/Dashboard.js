// src/admin/pages/Dashboard.js
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

function Dashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snapshot = await getDocs(collection(db, "products"));
        const productsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const totalProducts = products.length;
  const outOfStockCount = products.filter((p) => p.inStock === false).length;
  const archivedCount = products.filter((p) => p.archived).length;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-700">Dashboard Overview</h2>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md shadow font-medium transition"
        >
          Visit the Website
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-orange-100 shadow p-6 rounded-md text-center">
          <h3 className="text-lg font-semibold text-orange-500">Total Products</h3>
          <p className="text-3xl font-bold mt-2">{totalProducts}</p>
        </div>
        <div className="bg-orange-100 shadow p-6 rounded-md text-center">
          <h3 className="text-lg font-semibold text-red-500">Out of Stock</h3>
          <p className="text-3xl font-bold mt-2">{outOfStockCount}</p>
        </div>
        <div className="bg-orange-100 shadow p-6 rounded-md text-center">
          <h3 className="text-lg font-semibold text-gray-500">Archived</h3>
          <p className="text-3xl font-bold mt-2">{archivedCount}</p>
        </div>
      </div>

      <div className="bg-white p-6 shadow rounded-md">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Recent Products</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-orange-100">
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Price</th>
                <th className="py-2 px-4">Stock</th>
                <th className="py-2 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {products.map((prod) => (
                <tr key={prod.id} className="border-t">
                  <td className="py-2 px-4">{prod.name}</td>
                  <td className="py-2 px-4">₪{prod.price}</td>
                  <td className="py-2 px-4">{prod.stock ?? "N/A"}</td>
                  <td className="py-2 px-4">
                    {prod.archived ? (
                      <span className="text-gray-500 font-semibold">Archived</span>
                    ) : prod.inStock === false ? (
                      <span className="text-red-500 font-semibold">Out of Stock</span>
                    ) : (
                      <span className="text-green-600 font-semibold">Active</span>
                    )}
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td className="py-4 px-4 text-center text-gray-500" colSpan={4}>
                    No products to show.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
