import React, {useEffect} from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


function ProtectedRoutes({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return <div>{isAuthenticated ? children : null}</div>;
}

export default ProtectedRoutes;
