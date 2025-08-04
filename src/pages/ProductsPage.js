import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import ProductCard from "../components/ProductCard";
import loadingGif from "../assets/images/loading.gif";
import wetFoodIcon from "../assets/images/wet-food.png";
import dryFoodIcon from "../assets/images/dry-food.png";

function ProductsPage({ addToCart }) {
  const location = useLocation();
  const { t } = useTranslation();
  const params = new URLSearchParams(location.search);
  const initialType = params.get("type");
  const initialCategory = params.get("category");


  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState(initialType || "");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || "");
  const [selectedFoodTypes, setSelectedFoodTypes] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snapshot = await getDocs(collection(db, "products"));
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
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

  const toggleFoodType = (type) => {
    setSelectedFoodTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

const filteredProducts = products
  .filter((product) => {
    const matchesType = selectedType ? product.type === selectedType : true;
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchesFoodType =
      selectedCategory === "food" && ["cat", "dog"].includes(selectedType)
        ? selectedFoodTypes.length === 0 || selectedFoodTypes.includes(product.foodType)
        : true;

    return (
      matchesType &&
      matchesCategory &&
      matchesFoodType &&
      !product.archived &&
      product.inStock !== false
    );
  })
  .sort((a, b) => {
    const categoryOrder = { food: 1, cage: 2, accessory: 3 };
    return (categoryOrder[a.category] || 99) - (categoryOrder[b.category] || 99);
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
      {/* Filter Panel */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end bg-orange-50 p-4 rounded-lg shadow-md"
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
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setSelectedFoodTypes([]);
            }}
            className="border border-orange-300 rounded px-3 py-2"
          >
            <option value="">{t("filter_all_categories")}</option>
            <option value="food">{t("filter_food")}</option>
            <option value="cage">{t("filter_cage")}</option>
            <option value="accessory">{t("filter_accessory")}</option>

          </select>
        </div>
      </motion.div>
{/* Food Type Selection */}
{selectedCategory === "food" && ["cat", "dog"].includes(selectedType) && (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
    className="flex justify-center gap-6 px-4 flex-wrap"
  >
    {[{ type: "wet", icon: wetFoodIcon, label: t("wet_food") }, { type: "dry", icon: dryFoodIcon, label: t("dry_food") }].map(
      ({ type, icon, label }, index) => (
        <motion.div
          key={type}
          onClick={() => toggleFoodType(type)}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.3, type: "spring", stiffness: 250 }}
          whileHover={{ scale: 1.08, rotate: 3 }}
          whileTap={{ scale: 0.95 }}
          className={`w-[45%] md:w-[40%] lg:w-[30%] xl:w-[25%] border-4 rounded-2xl p-4 md:p-6 flex flex-col items-center justify-center transition-all duration-300 ${
            selectedFoodTypes.includes(type)
              ? "border-orange-500 shadow-2xl bg-orange-50"
              : "border-transparent hover:border-orange-300 bg-white"
          }`}
        >
          <motion.img
            src={icon}
            alt={label}
            className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 object-contain mb-3"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          <motion.p
            className="text-lg md:text-xl font-semibold text-orange-700"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1, duration: 0.2 }}

          >
            {label}
          </motion.p>
        </motion.div>
      )
    )}
  </motion.div>
)}



      {/* Product Grid */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredProducts.map((product) => (
          <motion.div
            key={product.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="cursor-pointer shadow-lg rounded-xl overflow-hidden border border-orange-100"
            onClick={() => setSelectedProduct(product)}
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
      </motion.div>

      {/* Product Modal */}
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
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed z-50 inset-0 flex items-center justify-center p-4"
              onClick={() => setSelectedProduct(null)}
            >
              <div
                className="relative bg-white rounded-xl shadow-2xl w-full max-w-4xl p-6 flex flex-col md:flex-row"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-3 right-3 text-gray-600 hover:text-black text-2xl"
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
                <div className="w-full md:w-1/2 flex flex-col justify-between mt-4 md:mt-0 md:ml-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{selectedProduct.name}</h2>
                    <p className="text-gray-700 mb-3">{selectedProduct.description}</p>
                    <ul className="text-sm space-y-1">
                      <li><strong>{t("category")}: </strong>{selectedProduct.category}</li>
                      <li><strong>{t("animal_type")}: </strong>{selectedProduct.type}</li>
                      <li><strong>{t("price")}: </strong>₪{selectedProduct.price}</li>
                    </ul>
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