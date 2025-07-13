import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

function ProductCard({ product, addToCart }) {
  const { t } = useTranslation();

  return (
    <motion.div
      className="bg-gray-100 border rounded p-4 shadow hover:shadow-lg hover:bg-gray-200 transition-all duration-300"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.img
        src={product.imageUrl}
        alt={product.name}
        className="mb-2 w-full h-48 object-cover rounded"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
      <h3 className="font-semibold text-lg">{product.name}</h3>
      <p className="text-sm text-gray-600">{product.description}</p>
      <div className="flex justify-between items-center mt-2">
        <span className="text-orange-400 font-bold">₪{product.price}</span>
        <motion.button
          onClick={(e) => addToCart(e)}
          whileTap={{ scale: 0.95 }}
          whileHover={{ backgroundColor: "#e78b24" }}
          className="bg-orange-400 text-white px-2 py-1 rounded transition-colors duration-200"
        >
          {t("add_to_cart")}
        </motion.button>
      </div>
    </motion.div>
  );
}

export default ProductCard;
