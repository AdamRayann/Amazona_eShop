import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

function CartPage({ cartItems, removeFromCart, updateQuantity, onCartOpened }) {
  const { t } = useTranslation();
  onCartOpened();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-center">
        {t("cart_title")}
      </h2>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center space-y-6">
          <img
            src="https://www.svgrepo.com/show/276264/empty-cart.svg"
            alt={t("empty_cart_alt")}
            className="w-48 h-48 opacity-70"
          />
          <p className="text-gray-600 text-lg">
            {t("cart_empty_message")}
          </p>
          <Link
            to="/products"
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded shadow"
          >
            {t("back_to_shop")}
          </Link>
        </div>
      ) : (
        <>
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="border rounded p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-600">
                      {t("unit_price")}: ₪{item.price}
                    </p>
                    <div className="flex items-center mt-2 space-x-2">
                      <button
                        className="bg-gray-300 px-2 py-1 rounded hover:bg-gray-400 disabled:opacity-50"
                        onClick={() => updateQuantity(item.id, -1)}
                        disabled={item.quantity === 1}
                      >
                        -
                      </button>
                      <span className="px-2">{item.quantity}</span>
                      <button
                        className="bg-gray-300 px-2 py-1 rounded hover:bg-gray-400"
                        onClick={() => updateQuantity(item.id, +1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <span className="text-orange-600 font-bold">
                    ₪{(item.price * item.quantity).toFixed(2)}
                  </span>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 text-sm rounded"
                    onClick={() => removeFromCart(item.id)}
                  >
                    {t("remove_button")}
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6 text-right">
            <h3 className="text-xl font-semibold">
              {t("total_label")}: ₪{total.toFixed(2)}
            </h3>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
