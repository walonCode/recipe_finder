import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const useAuthRedirect = () => {
  const router = useRouter();
  const token = Cookies.get("accessToken");

  useEffect(() => {
    if (token) {
      router.push("/food"); 
    }
  }, [token, router]);
};

export default useAuthRedirect;
