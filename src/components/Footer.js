import { useState } from "react";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [accepted, setAccepted] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!accepted) {
      alert(t("accept_policy_alert"));
      return;
    }
    // Handle subscription logic here
    alert(`${t("subscribed_with")} ${email}`);
    setEmail("");
    setAccepted(false);
  };

  return (
    <footer className="bg-white border-t border-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-800">
        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-2">
            {t("subscribe_title")}
          </h3>
          <form onSubmit={handleSubscribe} className="space-y-3">
            <input
              type="email"
              placeholder={t("email_placeholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-400 px-3 py-2 rounded"
            />
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
              />
              <label className="text-sm">
                <span className="text-red-500">*</span>{" "}
                {t("privacy_policy")}
              </label>
            </div>
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            >
              {t("subscribe_button")}
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="text-sm md:text-right">
          <h3 className="font-semibold mb-2">{t("headquarters")}</h3>
          <p>
            {t("address_line1")}
            <br />
            {t("address_line2")}
          </p>
          <p className="mt-2">
            <strong>{t("phone_label")}:</strong> {t("phone_num")}
            <br />
            <strong>{t("email_label")}:</strong> info@example.com
          </p>
        </div>
      </div>

      <div className="bg-[#EBA23B] text-white text-center text-xs py-2">
        {t("footer_note")}
      </div>
    </footer>
  );
}

export default Footer;
