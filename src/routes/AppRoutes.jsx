import { Routes, Route } from "react-router-dom"

import Home from "../pages/Home"
import Cart from "../pages/Cart"
import Login from "../pages/Login"

import MainLayout from "../layouts/MainLayout"
import AuthLayout from "../layouts/AuthLayout"
import Signup from "@/pages/Signup"

const AppRoutes = () => {
  return (
    <Routes>
      {/* Trang dùng MainLayout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
      </Route>

      {/* Trang dùng AuthLayout */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes