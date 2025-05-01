import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { IoSearch } from "react-icons/io5";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { BiCategoryAlt } from "react-icons/bi";
import { FaShoppingCart } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { getActiveCategories } from '@/services/categoryService';
import { useAuth } from '@/context/AuthContext';
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [categories, setCategories] = useState([]);
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getActiveCategories();
        setCategories(data);
      } catch (err) {
        console.error("Không thể load danh mục", err);
      }
    }

    fetchData();
  }, []);

  return (
    <nav className="bg-[var(--primary-color)] text-white shadow px-4 lg:px-16 py-2 flex justify-between items-center sticky top-0 z-10">
      <Link to="/" className="text-xl font-bold">
        <img src={logo} alt="Logo" className="w-[60px]" />
      </Link>
      <div className="relative flex items-center w-[50%] h-[50px] ">
        <DropdownMenu>
          <DropdownMenuTrigger className="px-4 py-2 bg-[var(--primary-color)] text-white outline-0">
            <BiCategoryAlt className='text-3xl mr-4 cursor-pointer' />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Danh mục sản phẩm</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link to="/category/all">Tất cả sản phẩm</Link>
            </DropdownMenuItem>
            {categories.map((cat) => (
              <DropdownMenuItem key={cat.id}>
                <Link to={`/category/${cat.id}`}>{cat.name}</Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Input
          type="text"
          placeholder="Tìm kiếm..."
          className="pr-15 bg-white text-black h-full w-full text-2xl"
        />
        <Button
          variant="default"
          className="absolute right-0 top-[50] px-3 bg-[var(--primary-color)] text-white cursor-pointer hover:bg-[var(--primary-color)] hover:opacity-70 mr-3"
        >
          <IoSearch />
        </Button>
      </div>
      <div className="space-x-4 flex items-center">
        <Link to="/cart"><FaShoppingCart className='text-2xl' /></Link>
        {user && isAuthenticated && user.role === "ROLE_USER" ?
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center cursor-pointer space-x-1">
              <span>{user.firstName}</span>
              <FaUserCircle />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Tài khoản</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem onClick={logout}>Đăng xuất</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          : <Link to="/login" className='font-bold'>Đăng nhập</Link>}
      </div>
    </nav>
  );
};

export default Navbar;