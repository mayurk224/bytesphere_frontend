import axios from "axios";
import React from "react";

const OAuthButton = () => {

  const handleGoogleLogin = async () => {
    try {
      const response = await axios.get("http://localhost:3248/api/oauth/google-url");
      window.location.href = response.data.url;
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

    return (
    <button onClick={handleGoogleLogin}
      className="cursor-pointer px-3 py-2 border rounded-full hover:bg-gray-100 transition duration-300"
    >
      <div className="flex gap-2 items-center">
        <img
          width="25"
          height="25"
          src="https://img.icons8.com/fluency/48/google-logo.png"
          alt="google-logo"
        />
        <p className="font-semibold">Google</p>
      </div>
    </button>
  );
};

export default OAuthButton;
