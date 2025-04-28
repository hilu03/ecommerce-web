import { Outlet, Link } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col space-y-3">
          <Link to="/admin" className="hover:bg-gray-700 p-2 rounded">Dashboard</Link>
          <Link to="/admin/products" className="hover:bg-gray-700 p-2 rounded">Manage Products</Link>
          <Link to="/admin/orders" className="hover:bg-gray-700 p-2 rounded">Manage Orders</Link>
          <Link to="/admin/users" className="hover:bg-gray-700 p-2 rounded">Manage Users</Link>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 p-6 bg-gray-100">
        <header className="mb-6 border-b pb-4">
          <h1 className="text-3xl font-semibold">Admin Area</h1>
        </header>

        {/* Render nested routes here */}
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
