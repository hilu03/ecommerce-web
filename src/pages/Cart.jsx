import { useAuth } from "@/context/AuthContext"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, []);

  return (
    <div>Cart</div>
  )
}

export default Cart