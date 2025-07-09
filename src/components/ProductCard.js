import { useTranslation } from "react-i18next";


function ProductCard({ product, addToCart }) {
    const { t, i18n } = useTranslation();

  return (
    <div className="bg-gray-100 border rounded p-4 shadow hover:shadow-lg hover:bg-gray-200">
      <img
        src={product.image}
        alt={product.name}
        className="mb-2 w-full h-48 object-cover"
      />
      <h3 className="font-semibold">{product.name}</h3>
      <p className="text-sm text-gray-600">{product.description}</p>
      <div className="flex justify-between mt-2">
        <span className="text-orange-400 font-bold">₪{product.price}</span>
        <button
          className="bg-orange-400 text-white px-2 py-1 rounded"
          onClick={() => addToCart(product)}
        >
          {t("add_to_cart")}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
