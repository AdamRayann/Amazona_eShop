import { useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import products from "../data/products";
import ProductCard from "../components/ProductCard";
import { useEffect } from "react";

function ProductsPage({ addToCart }) {
  const location = useLocation();
  const { t } = useTranslation();
  const params = new URLSearchParams(location.search);
  const initialType = params.get("type");

  const [selectedType, setSelectedType] = useState(initialType || "");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = products.filter((product) => {
    const matchesType = selectedType ? product.type === selectedType : true;
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    return matchesType && matchesCategory;
  });
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);
  return (
    <div className="pt-28 px-4 space-y-8 relative">
      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end"
      >
        {/* Animal Type Filter */}
        <div className="flex flex-col space-y-1">
          <label className="text-orange-500 font-semibold">
            {t("filter_animal_type")}
          </label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="border border-orange-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            <option value="">{t("filter_all_types")}</option>
            <option value="cat">{t("filter_cat")}</option>
            <option value="dog">{t("filter_dog")}</option>
            <option value="bird">{t("filter_bird")}</option>
            <option value="rodent">{t("filter_rodent")}</option>
          </select>
        </div>

        {/* Category Filter */}
        <div className="flex flex-col space-y-1">
          <label className="text-orange-500 font-semibold">
            {t("filter_category")}
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-orange-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
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
            <ProductCard product={product} addToCart={(e) => {
      e.stopPropagation();          // ✅ stop click from bubbling
      addToCart(product);           // ✅ add the product to cart
    }} />
          </motion.div>
        ))}
      </div>

{/* Modal */}
<AnimatePresence>
  {selectedProduct && (
    <>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black z-40"
        onClick={() => setSelectedProduct(null)}
      />

      {/* Card */}
      <motion.div
        key="modal"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
        className="fixed z-50 inset-0 flex items-center justify-center p-4"
        onClick={() => setSelectedProduct(null)}  
      >
        <div
          className="relative bg-white rounded-lg shadow-lg w-full max-w-4xl p-6 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6"
          onClick={(e) => e.stopPropagation()}  
        >

                {/* Close Button */}
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl"
                >
                  &times;
                </button>

                {/* Image */}
                <div className="flex-shrink-0 w-full md:w-1/2 h-64 md:h-auto flex items-center justify-center">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Details */}
                <div className="flex flex-col justify-between w-full md:w-1/2">
                  <div>
                    <h2 className="text-2xl font-semibold mb-2">{selectedProduct.name}</h2>
                    <p className="text-gray-700 mb-2">{selectedProduct.description}</p>
                    <p className="mb-1">
                      <span className="font-semibold">{t("category")}:</span>{" "}
                      {selectedProduct.category}
                    </p>
                    <p className="mb-1">
                      <span className="font-semibold">{t("animal_type")}:</span>{" "}
                      {selectedProduct.type}
                    </p>
                    <p className="mb-1">
                      <span className="font-semibold">{t("price")}:</span>{" "}
                      ${selectedProduct.price}
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
