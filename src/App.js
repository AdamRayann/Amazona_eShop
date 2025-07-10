import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useRef, useState, lazy, Suspense } from "react";

import Header from "./components/Header";
import FlyToCartAnimation from "./components/FlyToCartAnimation";
import Footer from "./components/Footer";
import loadingGif from "./assets/images/loading.gif";

// Lazy load pages
const HomePage = lazy(() => import("./pages/HomePage"));
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const CartPage = lazy(() => import("./pages/CartPage"));


function AppContent() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartOpened, setCartOpened] = useState(false);
  const [flyImage, setFlyImage] = useState(null);
  const cartIconRef = useRef(null);
  const [flyTarget, setFlyTarget] = useState(null);

  // // Show loading on route change
  // useEffect(() => {
  //   setLoading(true);
  //   const timeout = setTimeout(() => setLoading(false), 3500); // simulate loading
  //   return () => clearTimeout(timeout);
  // }, [location]);

  const addToCart = (product) => {
    setCartOpened(false);

    if (cartIconRef.current) {
      const rect = cartIconRef.current.getBoundingClientRect();
      setFlyTarget({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    }

    setFlyImage(product.image);

    setCartItems((prevItems) => {
      const itemExists = prevItems.find((item) => item.id === product.id);
      if (itemExists) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const updateQuantity = (productId, amount) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  };

  return (
    <div className="flex flex-col min-h-screen relative">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-[9999]">
          <img src={loadingGif} alt="Loading..." className="w-16 h-16" />
        </div>
      )}

      <Header
        cartItems={cartItems}
        cartOpened={cartOpened}
        cartIconRef={cartIconRef}
      />

        <main className="flex-grow p-4">
          <Suspense fallback={
            <div className="fixed inset-0 flex items-center justify-center bg-white z-[9999]">
              <img src={loadingGif} alt="Loading..." className="w-32 h-32 object-contain" />
            </div>
          }>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage addToCart={addToCart} />} />
              <Route path="/cart" element={
                <CartPage
                  cartItems={cartItems}
                  removeFromCart={removeFromCart}
                  updateQuantity={updateQuantity}
                  onCartOpened={() => setCartOpened(true)}
                />
              } />
            </Routes>
          </Suspense>
        </main>


      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
