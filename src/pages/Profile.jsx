import React, { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUsername, setUpdatedUsername] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

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
      const response = await fetch("http://localhost:3248/api/auth/user", {
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
        setUpdatedUsername(data.user.user_name); // ✅ Set initial username value
      } else {
        console.error("Error fetching user:", data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUpdateProfile = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        "http://localhost:3248/api/auth/update-profile",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_name: updatedUsername }), // ✅ Send updated username
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Profile updated successfully!");
        setUser({ ...user, user_name: updatedUsername });
        setIsEditing(false);
      } else {
        console.error("Error updating profile:", data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUploadAvatar = async () => {
    if (!selectedFile) {
        alert("Please select a file.");
        return;
    }

    setUploading(true);
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("avatar", selectedFile);

    try {
        const response = await fetch("http://localhost:3248/api/auth/upload-avatar", {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` }, // ✅ Do NOT set Content-Type, browser will handle it
            body: formData,
        });

        const data = await response.json();

        if (response.ok) {
            alert("Avatar updated successfully!");
            setUser({ ...user, avatar_url: data.avatar_url });
        } else {
            console.error("Error uploading avatar:", data.error);
            alert("Error uploading avatar. Please try again.");
        }
    } catch (error) {
        console.error("Error:", error);
    } finally {
        setUploading(false);
    }
};


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-center mb-6">Profile</h1>
        {user ? (
          <>
            <p className="text-center text-gray-600 mb-4">
              Email: {user.email}
            </p>

            {isEditing ? (
              <div className="mb-4">
                <input
                  type="text"
                  value={updatedUsername}
                  onChange={(e) => setUpdatedUsername(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter new username"
                />
                <div className="flex justify-end mt-2">
                  <button
                    onClick={handleUpdateProfile}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="ml-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700 transition duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="mb-4">
                <p className="text-center text-gray-600">
                  Username: {user.user_name}
                </p>
                <div className="flex justify-center mt-2">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                  >
                    Edit
                  </button>
                </div>
              </div>
            )}

            <div className="flex flex-col items-center mb-4">
              <img
                src={
                  user.avatar_url || "https://example.com/default-avatar.png"
                }
                alt="Avatar"
                className="w-24 h-24 rounded-full mb-4"
              />

              {isEditing && (
                <div className="">
                  <button
                    onClick={handleUploadAvatar}
                    disabled={uploading}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                  >
                    {uploading ? "Uploading..." : "Upload Avatar"}
                  </button>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="mb-2"
                  />
                </div>
              )}
            </div>
          </>
        ) : (
          <p className="text-center text-gray-600">Loading user data...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
