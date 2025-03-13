import React, { useState } from "react";
import BrandImage from "../assets/brandImage.jpg";
import { useNavigate } from "react-router-dom";
import OAuthButton from "../components/OAuthButton";

const LoginRegister = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const url = isSignIn
      ? "http://localhost:3248/api/auth/login"
      : "http://localhost:3248/api/auth/register";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        if (isSignIn) {
          localStorage.setItem("token", data.token);
          navigate("/");
        } else {
          setMessage("Registration successful! Please check your email to verify your account.");
          setIsSignIn(true);
        }
      } else {
        setMessage(data.error || "An error occurred");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        
        <div className="w-full md:w-1/2 p-14 max-[374px]:p-8 ">
          <h2 className="text-3xl font-semibold text-center mb-4">
            {isSignIn ? "Welcome Back" : "Create an Account"}
          </h2>
          <p className="text-center text-gray-500 mb-3">
            {isSignIn ? "Please enter your details" : "Join us today!"}
          </p>
          {message && <p className="text-center text-red-500 mb-3">{message}</p>}
          <div className="flex mb-5">
            <div className="flex justify-evenly w-full bg-gray-200 rounded-lg p-1">
              <button
                onClick={() => setIsSignIn(true)}
                className={`flex-1 py-2 text-center rounded-lg ${
                  isSignIn ? "bg-white text-black font-semibold" : "bg-gray-200"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsSignIn(false)}
                className={`flex-1 py-2 text-center rounded-lg ${
                  !isSignIn ? "bg-white text-black font-semibold" : "bg-gray-200"
                }`}
              >
                Sign Up
              </button>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <div className="w-full border border-gray-400 p-2 rounded-lg flex items-center">
                <img
                  width="25"
                  height="25"
                  src="https://img.icons8.com/fluency-systems-regular/50/new-post.png"
                  alt="email-icon"
                />
                <input
                  type="email"
                  name="email"
                  className="w-full focus:outline-white bg-white ml-2 font-semibold border-none"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <div className="w-full border border-gray-400 p-2 rounded-lg flex items-center">
                <img
                  width="25"
                  height="25"
                  src="https://img.icons8.com/fluency-systems-regular/50/private2.png"
                  alt="password-icon"
                />
                <input
                  type="password"
                  name="password"
                  className="w-full focus:outline-none bg-white ml-2 font-semibold border-none"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300">
              {isSignIn ? "Continue" : "Sign Up"}
            </button>
          </form>
          <p className="text-center text-gray-500 mt-4">Or Continue With</p>
          <div className="flex justify-center mt-3 gap-4">
            <OAuthButton/>
          </div>
        </div>

        
        <div
          className="hidden md:flex w-1/2 items-center justify-center bg-blue-500"
          style={{
            backgroundImage: `url(${BrandImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      </div>
    </div>
  );
};

export default LoginRegister;