import { Outlet, Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function AdminLayout() {
  const location = useLocation();

  const linkClasses = (path) =>
    `px-4 py-2 rounded transition ${
      location.pathname === path
        ? "bg-white text-orange-500 font-semibold"
        : "hover:bg-orange-600"
    }`;

const navigate = useNavigate();

const handleLogout = () => {
  localStorage.removeItem("isAdmin");
  navigate("/admin/login");
};

  return (
    <div className="min-h-screen flex bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-orange-500 text-white shadow-md flex flex-col p-6 justify-between">
      <div>
        <h2 className="text-2xl font-bold mb-8 tracking-wide">Admin Panel</h2>
        <nav className="flex flex-col space-y-2">
          <Link to="/admin" className={linkClasses("/admin")}>
            Dashboard
          </Link>
          <Link to="/admin/products" className={linkClasses("/admin/products")}>
            Manage Products
          </Link>
          <Link to="/admin/add" className={linkClasses("/admin/add")}>
            Add Product
          </Link>
        </nav>
      </div>

      <button
        onClick={handleLogout}
        className="mt-6 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-sm"
      >
        Logout
      </button>
    </aside>


      {/* Main Content */}
      <main className="flex-1 p-8 bg-white shadow-inner overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
