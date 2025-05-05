import { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const AdminLayout = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [productMenuOpen, setProductMenuOpen] = useState(true); // toggle submenu

  return (
    <div className="flex">
      <aside className="w-64 h-screen fixed top-0 left-0 bg-[var(--primary-color)] text-white p-4">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col space-y-3">
          <Link to="/admin" className="hover:bg-white hover:text-[var(--primary-color)] p-2 rounded">Dashboard</Link>
          <Link to="/admin/categories" className="hover:bg-white hover:text-[var(--primary-color)] p-2 rounded">Quản lý danh mục</Link>

          <div>
            <button
              onClick={() => setProductMenuOpen(!productMenuOpen)}
              className="w-full flex justify-between items-center hover:bg-white hover:text-[var(--primary-color)] p-2 rounded"
            >
              <span>Quản lý sản phẩm</span>
              {productMenuOpen ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {productMenuOpen && (
              <div className="ml-4 mt-2 flex flex-col space-y-2">
                <Link to="/admin/products" className="hover:underline">Danh sách sản phẩm</Link>
                <Link to="/admin/featured-products" className="hover:underline">Sản phẩm nổi bật</Link>
              </div>
            )}
          </div>

          <Link to="/admin/users" className="hover:bg-white hover:text-[var(--primary-color)] p-2 rounded">Quản lý khách hàng</Link>
        </nav>
      </aside>

      <div className="flex-1 ml-64 min-h-screen overflow-y-auto bg-gray-100">
        <header className="sticky top-0 z-10 bg-gray-100 mb-6 border-b py-4 px-6 flex justify-between items-end">
          <h2 className="text-2xl">Xin chào, admin!</h2>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center cursor-pointer space-x-1 border rounded border-[var(--primary-color)] p-2">
              <span>{user.firstName}</span>
              <FaUserCircle />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Tài khoản</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/change-password")}>Đổi mật khẩu</DropdownMenuItem>
              <DropdownMenuItem onClick={logout}>Đăng xuất</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <div className="px-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
