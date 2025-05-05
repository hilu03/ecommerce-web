import { Routes, Route } from "react-router-dom"

import Home from "../pages/Home"
import Cart from "../pages/Cart"
import Login from "../pages/Login"

import MainLayout from "../layouts/MainLayout"
import AuthLayout from "../layouts/AuthLayout"
import AdminLayout from "../layouts/AdminLayout"
import Signup from "@/pages/Signup"
import ProductDetail from "@/pages/ProductDetail"
import AdminDashboard from "../pages/admin/AdminDashboard";
import ProtectedRoute from "./ProtectedRoute";
import ProductByCategory from "@/pages/ProductByCategory"
import CategoryManagement from "@/pages/admin/CategoryManagement"
import ProductManagement from "@/pages/admin/ProductManagement"
import CustomerManagement from "@/pages/admin/CustomerManagement"
import ChangePassword from "@/pages/ChangePassword"
import UserProfile from "@/pages/UserProfile"
import FeaturedProductManagement from "@/pages/admin/FeaturedProductManagement"

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/category/all" element={<ProductByCategory />} />
        <Route path="/category/:id" element={<ProductByCategory />} />
        <Route path="/profile" element={<UserProfile />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/change-password" element={<ChangePassword />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/categories" element={<CategoryManagement />} />
          <Route path="/admin/products" element={<ProductManagement />} />
          <Route path="/admin/featured-products" element={<FeaturedProductManagement />} />
          <Route path="/admin/users" element={<CustomerManagement />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes