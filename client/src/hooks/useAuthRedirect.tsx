import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const useAuthRedirect = () => {
  const navigate = useNavigate();
  const token = Cookies.get("accessToken");

  useEffect(() => {
    if (token) {
      navigate("/dashboard"); 
    }
  }, [token, navigate]);
};

export default useAuthRedirect;
