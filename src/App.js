import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import FlyToCartAnimation from "./components/FlyToCartAnimation";
import { useRef } from "react";
import Footer from "./components/Footer";


function App() {
  const [cartItems, setCartItems] = useState([]);
  const [cartOpened, setCartOpened] = useState(false);
  const [flyImage, setFlyImage] = useState(null);
  const cartIconRef = useRef(null);
  const [flyTarget, setFlyTarget] = useState(null);

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
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header
          cartItems={cartItems}
          cartOpened={cartOpened}
          cartIconRef={cartIconRef}
        />

        <main className="flex-grow p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/products"
              element={<ProductsPage addToCart={addToCart} />}
            />
            <Route
              path="/cart"
              element={
                <CartPage
                  cartItems={cartItems}
                  removeFromCart={removeFromCart}
                  updateQuantity={updateQuantity}
                  onCartOpened={() => setCartOpened(true)}
                />
              }
            />
          </Routes>

          {flyImage && flyTarget && (
            <FlyToCartAnimation
              imageSrc={flyImage}
              destX={flyTarget.x}
              destY={flyTarget.y}
              onAnimationComplete={() => {
                setFlyImage(null);
                setFlyTarget(null);
              }}
            />
          )}
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
