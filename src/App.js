import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { lazy, Suspense, useEffect, useRef, useState } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import FlyToCartAnimation from "./components/FlyToCartAnimation";
import loadingGif from "./assets/images/loading.gif";

// Lazy load all routes
const HomePage = lazy(() => import("./pages/HomePage"));
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const AdminLayout = lazy(() => import("./admin/layout/AdminLayout"));
const Dashboard = lazy(() => import("./admin/pages/Dashboard"));
const ProductList = lazy(() => import("./admin/pages/ProductList"));
const AddProduct = lazy(() => import("./admin/pages/AddProduct"));
const EditProduct = lazy(() => import("./admin/pages/EditProduct"));
const ProtectedRoute  = lazy(() => import("./admin/components/ProtectedRoute"));
const AdminLogin   = lazy(() => import("./admin/pages/AdminLogin"));

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

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
    <div className="flex flex-col min-h-screen relative">
      {!isAdminRoute && (
        <Header
          cartItems={cartItems}
          cartOpened={cartOpened}
          cartIconRef={cartIconRef}
        />
      )}

      <main className={!isAdminRoute ? "flex-grow p-4" : "flex-grow"}>
        <Suspense
          fallback={
            <div className="fixed inset-0 flex items-center justify-center bg-white z-[9999]">
              <img
                src={loadingGif}
                alt="Loading..."
                className="w-32 h-32 object-contain"
              />
            </div>
          }
        >
          <Routes>
          {/* Public Routes */}
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

          {/* Admin Login Route (Unprotected) */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="products" element={<ProductList />} />
            <Route path="add" element={<AddProduct />} />
            <Route path="edit/:id" element={<EditProduct />} />
          </Route>
        </Routes>

        </Suspense>

        {/* Cart animation */}
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

      {!isAdminRoute && <Footer />}
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
