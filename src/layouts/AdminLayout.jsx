import { Outlet, Link } from "react-router-dom";
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

const AdminLayout = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { logout } = useAuth();

  return (
    <div className="flex">
      <aside className="w-64 h-screen fixed top-0 left-0 bg-[var(--primary-color)] text-white p-4">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col space-y-3">
          <Link to="/admin" className="hover:bg-white hover:text-[var(--primary-color)] p-2 rounded">Dashboard</Link>
          <Link to="/admin/categories" className="hover:bg-white hover:text-[var(--primary-color)] p-2 rounded">Quản lý danh mục</Link>
          <Link to="/admin/products" className="hover:bg-white hover:text-[var(--primary-color)] p-2 rounded">Quản lý sản phẩm</Link>
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
              <DropdownMenuItem>Billing</DropdownMenuItem>
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
