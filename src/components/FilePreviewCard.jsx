import React, { useState } from "react";
import { MoreVertical, Edit2, Info, Trash2, Star, Folder } from "lucide-react";
import FolderSelectionModal from "./FolderSelectionModal";

const FilePreviewCard = ({ file }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const getFileExtension = (filename) => {
    return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
  };

  const isImage = file.type.startsWith("image");

  const toggleMenu = (e) => {
    e.stopPropagation();
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleMenuAction = (action, e) => {
    e.stopPropagation();

    if (action === "addToFolder") {
      setSelectedFile(file);
      setIsModalOpen(true);
    }
  };

  return (
    <div className="w-64 bg-white rounded-lg shadow overflow-hidden border border-gray-200 relative">
      <div className="h-40 bg-gray-100 flex items-center justify-center relative">
        {isImage ? (
          <img
            src={file.file_url}
            alt={file.file_name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <div className="text-2xl font-bold uppercase text-gray-400">
              {getFileExtension(file.file_name)}
            </div>
          </div>
        )}
      </div>

      <div className="p-3 flex justify-between items-center">
        <a
          href={file.file_url}
          target="_blank"
          rel="noopener noreferrer"
          className="truncate pr-2 text-sm font-medium"
        >
          {file.file_name}
        </a>

        <div className="relative">
          <button
            onClick={toggleMenu}
            className="p-1 rounded-full hover:bg-gray-100 focus:outline-none"
          >
            <MoreVertical className="h-4 w-4 text-gray-500" />
          </button>

          {menuOpen && (
            <div className="absolute bottom-full right-0 mb-1 w-36 bg-white rounded-md shadow-lg border border-gray-200 z-10 text-xs">
              <ul className="py-1">
                <li>
                  <button
                    onClick={(e) => handleMenuAction("rename", e)}
                    className="flex items-center px-2 py-1 w-full text-left hover:bg-gray-100"
                  >
                    <Edit2 className="h-3 w-3 mr-1 text-gray-500" />
                    Rename
                  </button>
                </li>
                <li>
                  <button
                    onClick={(e) => handleMenuAction("details", e)}
                    className="flex items-center px-2 py-1 w-full text-left hover:bg-gray-100"
                  >
                    <Info className="h-3 w-3 mr-1 text-gray-500" />
                    Details
                  </button>
                </li>
                <li>
                  <button
                    onClick={(e) => handleMenuAction("addToFolder", e)}
                    className="flex items-center px-2 py-1 w-full text-left hover:bg-gray-100"
                  >
                    <Folder className="h-3 w-3 mr-1 text-gray-500" />
                    Add to folder
                  </button>
                </li>
                <li className="border-t border-gray-200">
                  <button
                    onClick={(e) => handleMenuAction("delete", e)}
                    className="flex items-center px-2 py-1 w-full text-left text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Delete
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {menuOpen && <div className="fixed inset-0 z-0" onClick={closeMenu} />}
      {isModalOpen && (
        <FolderSelectionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          fileName={selectedFile?.file_name}
          filePath={selectedFile?.file_url}
        />
      )}
    </div>
  );
};

export default FilePreviewCard;
