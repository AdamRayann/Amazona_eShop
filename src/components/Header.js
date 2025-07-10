import { useEffect,useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "../assets/images/logo2222.png";
import { motion, AnimatePresence } from "framer-motion";

function Header({ cartItems, cartOpened, cartIconRef }) {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const languageMenuRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        languageMenuRef.current &&
        !languageMenuRef.current.contains(event.target)
      ) {
        setLanguageMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        isScrolled
          ? "bg-white bg-opacity-90 shadow-md"
          : "text-white"
      }`}
      style={{
  backgroundColor: isScrolled ? "rgba(255,255,255,0.9)" : "rgb(234, 161, 58)",
  color: isScrolled ? "rgb(234, 161, 58)" : "white",
}}

    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-1">

      <Link to="/" className="flex items-center">
        <img src={logo} alt="Logo" className="h-14 w-auto" />
      </Link>


        <nav className="flex text-1xl items-center space-x-4 relative">
          <Link to="/products" className="hover:underline">
            {t("shop")}
          </Link>
          <div className="relative" ref={cartIconRef}>
            <Link to="/cart" className="hover:underline">
              🛒 {t("cart")}
            </Link>
            {totalItems > 0 && !cartOpened && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </div>

            {/* Language Switcher */}
            <div className="relative" ref={languageMenuRef}>
              <button
                onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                className="flex items-center space-x-1 hover:underline focus:outline-none transition-transform duration-200 hover:scale-105"
              >
                🌐
                <span className="text-sm">{t("language")}</span>
              </button>

              <AnimatePresence>
                {languageMenuOpen && (
                  <motion.div
                    key="lang-menu"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-32 bg-white text-black border border-gray-300 rounded-xl shadow-xl z-50 overflow-hidden origin-top"
                  >
                    <button
                      onClick={() => {
                        i18n.changeLanguage("en");
                        setLanguageMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-orange-100 transition-colors duration-200"
                    >
                      English
                    </button>
                    <button
                      onClick={() => {
                        i18n.changeLanguage("he");
                        setLanguageMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-orange-100 transition-colors duration-200"
                    >
                      עברית
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

        </nav>
      </div>
    </header>
  );
}

export default Header;
