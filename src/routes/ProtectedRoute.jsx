import { Navigate, Outlet } from "react-router-dom";

// Giả định là bạn có hàm kiểm tra quyền admin
const isAdmin = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user && user.role === "ROLE_ADMIN";
};

const ProtectedRoute = () => {
  return isAdmin() ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
