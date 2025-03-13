import React, { useState } from "react";
import { Folder, X } from "lucide-react";
import axios from "axios";

const CreateFolderModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // Prevents modal rendering when closed

  const [folderName, setFolderName] = useState("");
  const [selectedColor, setSelectedColor] = useState("blue");

  // 🔹 Folder color options
  const colorOptions = [
    {
      name: "blue",
      bg: "bg-blue-50",
      text: "text-blue-500",
      border: "border-blue-500",
    },
    {
      name: "green",
      bg: "bg-green-50",
      text: "text-green-500",
      border: "border-green-500",
    },
    {
      name: "purple",
      bg: "bg-purple-50",
      text: "text-purple-500",
      border: "border-purple-500",
    },
    {
      name: "orange",
      bg: "bg-orange-50",
      text: "text-orange-500",
      border: "border-orange-500",
    },
    {
      name: "pink",
      bg: "bg-pink-50",
      text: "text-pink-500",
      border: "border-pink-500",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!folderName.trim()) {
      alert("Folder name cannot be empty");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Unauthorized: Please log in.");
        return;
      }

      const response = await axios.post(
        "http://localhost:3248/api/files/create-folder",
        { folderName, color: selectedColor },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("New Folder Created:", response.data);

      alert("Folder created successfully!");

      setFolderName("");
      onClose();
    } catch (error) {
      console.error(
        "Error creating folder:",
        error.response?.data?.error || error.message
      );
      alert(
        error.response?.data?.error ||
          "Failed to create folder. Please try again."
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold flex items-center">
            <Folder className="mr-2 w-6 h-6 text-blue-500" />
            Create New Folder
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Folder Name
            </label>
            <input
              type="text"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              placeholder="Enter folder name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Choose Folder Color
            </label>
            <div className="flex space-x-2">
              {colorOptions.map((color) => (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => setSelectedColor(color.name)}
                  className={`w-10 h-10 rounded-full ${color.bg} ${
                    color.text
                  } ${
                    selectedColor === color.name
                      ? `border-2 ${color.border}`
                      : "border border-transparent"
                  } hover:opacity-80 transition`}
                >
                  <Folder className="w-full h-full p-2" />
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              Create Folder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateFolderModal;
