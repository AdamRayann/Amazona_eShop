import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import ProductCard from "../components/ProductCard";
import loadingGif from "../assets/images/loading.gif"; // adjust path if needed

function ProductsPage({ addToCart }) {
  const location = useLocation();
  const { t } = useTranslation();
  const params = new URLSearchParams(location.search);
  const initialType = params.get("type");

  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState(initialType || "");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snapshot = await getDocs(collection(db, "products"));
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesType = selectedType ? product.type === selectedType : true;
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    return matchesType && matchesCategory && !product.archived && product.inStock !== false;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <img src={loadingGif} alt="Loading..." className="w-24 h-24" />
      </div>
    );
  }

  return (
    <div className="pt-28 px-4 space-y-8 relative">
      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end"
      >
        <div className="flex flex-col space-y-1">
          <label className="text-orange-500 font-semibold">{t("filter_animal_type")}</label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="border border-orange-300 rounded px-3 py-2"
          >
            <option value="">{t("filter_all_types")}</option>
            <option value="cat">{t("filter_cat")}</option>
            <option value="dog">{t("filter_dog")}</option>
            <option value="bird">{t("filter_bird")}</option>
            <option value="rodent">{t("filter_rodent")}</option>
          </select>
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-orange-500 font-semibold">{t("filter_category")}</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-orange-300 rounded px-3 py-2"
          >
            <option value="">{t("filter_all_categories")}</option>
            <option value="food">{t("filter_food")}</option>
            <option value="cage">{t("filter_cage")}</option>
            <option value="accessory">{t("filter_accessory")}</option>
          </select>
        </div>
      </motion.div>

      {/* Products */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            onClick={() => setSelectedProduct(product)}
            className="cursor-pointer"
          >
            <ProductCard
              product={product}
              addToCart={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setSelectedProduct(null)}
            />
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed z-50 inset-0 flex items-center justify-center p-4"
              onClick={() => setSelectedProduct(null)}
            >
              <div
                className="relative bg-white rounded-lg shadow-lg w-full max-w-4xl p-6 flex flex-col md:flex-row"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl"
                >
                  &times;
                </button>
                <div className="w-full md:w-1/2 h-64 flex items-center justify-center">
                  <img
                    src={selectedProduct.imageUrl}
                    alt={selectedProduct.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="w-full md:w-1/2 flex flex-col justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold mb-2">{selectedProduct.name}</h2>
                    <p className="text-gray-700 mb-2">{selectedProduct.description}</p>
                    <p className="mb-1">
                      <span className="font-semibold">{t("category")}:</span> {selectedProduct.category}
                    </p>
                    <p className="mb-1">
                      <span className="font-semibold">{t("animal_type")}:</span> {selectedProduct.type}
                    </p>
                    <p className="mb-1">
                      <span className="font-semibold">{t("price")}:</span> ₪{selectedProduct.price}
                    </p>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => {
                        addToCart(selectedProduct);
                        setSelectedProduct(null);
                      }}
                      className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
                    >
                      {t("add_to_cart") || "Add to Cart"}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ProductsPage;
