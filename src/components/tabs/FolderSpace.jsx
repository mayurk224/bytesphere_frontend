import { useState, useEffect } from "react";
import axios from "axios";
import { Folder, MoreVertical, Edit, Share2, Trash2, Download, FolderPlus } from "lucide-react";
import CreateFolderModal from "../CreateFolderModal";

const FolderSpace = () => {
  const [folders, setFolders] = useState([]); // 🔹 Stores folders from API
  const [isOpen, setIsOpen] = useState(false); // 🔹 Controls create folder modal
  const [isOptionsOpen, setIsOptionsOpen] = useState(null); // 🔹 Tracks open dropdown menu

  // 📌 Fetch folders from backend
  useEffect(() => {
    const fetchFolders = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await axios.get("http://localhost:3248/api/files/user-folders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFolders(response.data.folders);
      } catch (error) {
        console.error("Error fetching folders:", error);
      }
    };

    fetchFolders();
  }, []);

  const handlePermanentDelete = async (folderPath) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Unauthorized: Please log in.");
      return;
    }
  
    const confirmDelete = window.confirm("Are you sure you want to permanently delete this folder?");
    if (!confirmDelete) return;
  
    try {
      const response = await axios.delete("http://localhost:3248/api/files/delete-folder", {
        headers: { Authorization: `Bearer ${token}` },
        data: { folderPath } // ✅ Send folderPath in request body
      });
  
      alert(response.data.message);
  
      // 🔹 Remove deleted folder from UI
      setFolders((prevFolders) => prevFolders.filter(folder => folder.folder_path !== folderPath));
    } catch (error) {
      console.error("Error deleting folder:", error.response?.data?.error || error.message);
      alert("Failed to delete folder. Please try again.");
    }
  };

  return (
    <div className="ml-64 max-[370px]:ml-0 mt-14 p-6">
      {/* 🔹 Create Folder Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
      >
        <FolderPlus className="mr-2 w-5 h-5" />
        Create Folder
      </button>

      {/* 🔹 Folder Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {folders.map((folder, index) => (
          <div 
            key={folder.folder_path} 
            className="relative bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            {/* 🔹 Folder Header */}
            <div className={`p-4 rounded-t-lg flex items-center justify-between ${folder.color ? `bg-${folder.color}-50` : "bg-gray-100"}`}>
              <div className="flex items-center space-x-4">
                <div className={`p-3 bg-white rounded-full ${folder.color ? `text-${folder.color}-500` : "text-gray-500"}`}>
                  <Folder className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{folder.folder_name}</h3>
                  <p className="text-sm text-gray-600">{folder.items || 0} items</p>
                </div>
              </div>

              {/* 🔹 Options Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setIsOptionsOpen(isOptionsOpen === index ? null : index)}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <MoreVertical className="w-5 h-5 text-gray-600" />
                </button>

                {isOptionsOpen === index && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
                    <div className="py-1">
                      <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <Edit className="mr-2 w-4 h-4" />
                        Rename
                      </button>
                      <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <Share2 className="mr-2 w-4 h-4" />
                        Share
                      </button>
                      <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <Download className="mr-2 w-4 h-4" />
                        Download
                      </button>
                      <button onClick={() => handlePermanentDelete(folder.folder_path)} className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                        <Trash2 className="mr-2 w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 🔹 Folder Details */}
            <div className="p-4 border-t">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Total Size</span>
                <span className="font-medium">{folder.size || "0 KB"}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>Last Modified</span>
                <span className="font-medium">{folder.last_modified || "N/A"}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 🔹 Create Folder Modal */}
      {isOpen && <CreateFolderModal isOpen={isOpen} onClose={() => setIsOpen(false)} />}
    </div>
  );
};

export default FolderSpace;
