import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState, useRef } from "react";
import emailjs from "emailjs-com";
import emptyCartGif from "../assets/images/emptyCartGif.gif";

function CartPage({ cartItems, removeFromCart, updateQuantity, onCartOpened }) {
  const { t } = useTranslation();
  onCartOpened();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const formRef = useRef(null);

  const handleShowForm = () => {
    setShowForm(true);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100); // small delay ensures the form is rendered before scrolling
  };

  const handleSendOrder = (e) => {
    e.preventDefault();

    const orderDetails = cartItems
      .map(
        (item, index) =>
          `${index + 1}. ${item.name} x${item.quantity} = ₪${(item.price * item.quantity).toFixed(2)}`
      )
      .join("\n");

    const templateParams = {
      name: formData.name,
      phone: formData.phone,
      address: formData.address,
      order_details: orderDetails,
      total: total.toFixed(2),
    };

    emailjs
      .send("service_0lw3zgb", "template_qxfhqtn", templateParams, "RJGVZ-0FkRfxGwokt")
      .then(() => {
        alert("✅ Order sent successfully!");
        setFormData({ name: "", phone: "", address: "" });
        setShowForm(false);
      })
      .catch((error) => {
        console.error("❌ Failed to send order:", error);
        alert("❌ Failed to send order.");
      });
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-center">{t("cart_title")}</h2>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center space-y-6">
          <img src={emptyCartGif} alt={t("empty_cart_alt")} className="pt-4 w-64 h-64 object-contain" />
          <p className="text-gray-600 text-lg">{t("cart_empty_message")}</p>
          <Link to="/products" className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded shadow">
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
                  <img src={item.imageUrl} alt={item.name} className="w-24 h-24 object-cover rounded" />
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-600">{t("unit_price")}: ₪{item.price}</p>
                    <div className="flex items-center mt-2 space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        disabled={item.quantity === 1}
                        className="bg-gray-300 px-2 py-1 rounded hover:bg-gray-400 disabled:opacity-50"
                      >
                        -
                      </button>
                      <span className="px-2">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="bg-gray-300 px-2 py-1 rounded hover:bg-gray-400"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <span className="text-orange-600 font-bold">₪{(item.price * item.quantity).toFixed(2)}</span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 text-sm rounded"
                  >
                    {t("remove_button")}
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 text-right">
            <h3 className="text-xl font-semibold">{t("total_label")}: ₪{total.toFixed(2)}</h3>
            {!showForm && (
              <button
                onClick={handleShowForm}
                className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
              >
                {t("send_order_button") || "Send Order"}
              </button>
            )}
          </div>

          {showForm && (
            <form
              ref={formRef}
              onSubmit={handleSendOrder}
              className="mt-6 space-y-4 border-t pt-6 max-w-lg mx-auto"
            >
              <div>
                <label className="block mb-1 font-medium">{t("cus_name")}</label>
                <input
                  type="text"
                  required
                  className="w-full border px-3 py-2 rounded"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">{t("phone_number")}</label>
                <input
                  type="tel"
                  required
                  className="w-full border px-3 py-2 rounded"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">{t("address")}</label>
                <textarea
                  required
                  className="w-full border px-3 py-2 rounded"
                  rows={3}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
              >
                {t("confirm_and_send") || "Confirm and Send"}
              </button>
            </form>
          )}
        </>
      )}
    </div>
  );
}

export default CartPage;
