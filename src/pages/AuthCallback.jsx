import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let accessToken = new URLSearchParams(window.location.search).get(
      "access_token"
    );

    if (!accessToken) {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      accessToken = hashParams.get("access_token");
    }
    if (!accessToken) {
      console.error("No access token found in URL parameters.");
      return;
    }

    const handleAuthCallback = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/oauth/google-callback`,
          { access_token: accessToken }
        );

        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          navigate("/", { replace: true });
        } else {
          console.error("No token received from backend.");
        }
      } catch (error) {
        console.error("Auth Callback Error:", error);
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return <h1>Authenticating... Redirecting...</h1>;
};

export default AuthCallback;
