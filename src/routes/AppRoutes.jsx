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

const AppRoutes = () => {
  return (
    <Routes>
      {/* Trang dùng MainLayout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products/:id" element={<ProductDetail />} />
      </Route>

      {/* Trang dùng AuthLayout */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes