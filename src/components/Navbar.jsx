import { DollarSign, LogOut, Settings, User } from "lucide-react";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found. Logging out...");
      handleLogout();
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.status === 401) {
        console.warn("Token expired. Logging out user...");
        handleLogout();
        return;
      }

      if (response.ok) {
        setUser(data.user);
      } else {
        console.error("Error fetching user:", data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      console.log(data.message);

      localStorage.removeItem("token");

      window.location.href = "/api/auth";
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <nav className="fixed w-full top-0 p-4 bg-gray-800 text-white border-b z-50">
      <div className="flex justify-end">
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="focus:outline-none flex items-center"
            aria-label="Open profile menu"
          >
            {user ? (
              <img
                className="w-8 h-8 rounded-full"
                src={user.avatar_url}
                alt="user photo"
              />
            ) : (
              <p>loading...</p>
            )}
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-52 rounded-md shadow-lg bg-gray-800 border border-gray-700 z-10">
              <div className="px-4 py-3 border-b border-gray-700">
                <p className="text-sm font-medium">{user && user.user_name}</p>
                <p className="text-xs text-gray-400">{user && user.email}</p>
              </div>

              <a
                href="#dashboard"
                className="block px-4 py-2 hover:bg-blue-600 transition-colors flex items-center"
              >
                <User size={16} className="mr-2" />
                Profile
              </a>

              <a
                href="#earnings"
                className="block px-4 py-2 hover:bg-blue-600 transition-colors flex items-center"
              >
                <DollarSign size={16} className="mr-2" />
                Theme
              </a>

              <div className="border-t border-gray-700 mt-1"></div>

              <a
                onClick={handleLogout}
                className="block px-4 py-2 hover:bg-blue-600 transition-colors flex items-center"
              >
                <LogOut size={16} className="mr-2" />
                Sign out
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
