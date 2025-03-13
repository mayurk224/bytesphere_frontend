import React, { useState, useEffect } from "react";
import { Folder, ChevronRight, ChevronDown, X } from "lucide-react";
import axios from "axios";

const FolderSelectionModal = ({ isOpen, onClose, fileName, filePath }) => {
  if (!isOpen) return null;

  const [folders, setFolders] = useState([]);
  const [expandedFolders, setExpandedFolders] = useState({});
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchFolders = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      setIsLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:3248/api/files/user-folders",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setFolders(response.data.folders);
      } catch (error) {
        console.error("Error fetching folders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFolders();
  }, []);

  const toggleFolder = (folderId) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folderId]: !prev[folderId],
    }));
  };

  const handleFolderSelect = (folder) => {
    setSelectedFolder(folder.folder_name);
  };

  const handleConfirm = async () => {
    if (!selectedFolder) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Unauthorized: Please log in.");
        return;
      }

      const response = await axios.put(
        "http://localhost:3248/api/files/move-file",
        { fileName, currentPath: filePath, newFolderName: selectedFolder },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert(response.data.message);
      onClose();
    } catch (error) {
      console.error(
        "Error moving file:",
        error.response?.data?.error || error.message
      );
      alert("Failed to move file. Please try again.");
    }
  };

  const renderFolder = (folder, depth = 0) => {
    const isExpanded = expandedFolders[folder.folder_name];
    const isSelected = selectedFolder === folder.folder_name;
    const hasChildren = folder.children && folder.children.length > 0;

    return (
      <div key={folder.folder_name}>
        <div
          className={`flex items-center p-2 cursor-pointer hover:bg-gray-100 ${
            isSelected ? "bg-blue-100" : ""
          }`}
          style={{ paddingLeft: `${depth * 16 + 8}px` }}
          onClick={() => handleFolderSelect(folder)}
        >
          {hasChildren ? (
            <span
              onClick={(e) => {
                e.stopPropagation();
                toggleFolder(folder.folder_name);
              }}
              className="mr-1"
            >
              {isExpanded ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </span>
          ) : (
            <span className="w-4 mr-1"></span>
          )}
          <Folder size={16} className="mr-2 text-blue-500" />
          <span className="text-sm">{folder.folder_name}</span>
        </div>

        {hasChildren && isExpanded && (
          <div>
            {folder.children.map((child) => renderFolder(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Select Folder</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4">
          <p className="text-sm text-gray-600">
            <strong>File:</strong> {fileName}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Current Path:</strong> {filePath}
          </p>
        </div>

        <div className="p-4">
          <input
            type="text"
            placeholder="Search folders..."
            className="w-full px-3 py-2 border rounded-md mb-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="max-h-64 overflow-y-auto border rounded-md">
            {isLoading ? (
              <div className="p-4 text-center">Loading folders...</div>
            ) : folders.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No folders available
              </div>
            ) : (
              folders.map((folder) => renderFolder(folder))
            )}
          </div>
        </div>

        <div className="flex justify-end gap-2 p-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-700 border rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!selectedFolder}
            className={`px-4 py-2 text-sm text-white rounded-md ${
              selectedFolder
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-blue-300 cursor-not-allowed"
            }`}
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
};

export default FolderSelectionModal;
