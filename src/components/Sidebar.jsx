import {
  File,
  Folder,
  Home,
  Menu,
  Share2,
  Star,
  Trash2,
  X,
} from "lucide-react";
import React, { useState } from "react";

const Sidebar = ({ setActiveComponent }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      icon: <Home className="w-5 h-5 mr-3" />,
      label: "Overview",
      component: "Overview",
    },
    {
      icon: <File className="w-5 h-5 mr-3" />,
      label: "All Files",
      component: "AllFiles",
    },
    {
      icon: <Star className="w-5 h-5 mr-3" />,
      label: "Favorite",
      component: "Favorites",
    },
    {
      icon: <Folder className="w-5 h-5 mr-3" />,
      label: "Folders",
      component: "Folders",
    },
    {
      icon: <Share2 className="w-5 h-5 mr-3" />,
      label: "Shared Files",
      component: "SharedFiles",
    },
    {
      icon: <Trash2 className="w-5 h-5 mr-3" />,
      label: "Recycle Bin",
      component: "RecycleBin",
    },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-3 left-4 z-70 bg-gray-100 p-2 rounded-md"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <div
        className={`fixed top-0 left-0 w-64 h-screen bg-gray-800 shadow-lg transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative z-60`}
      >
        <div className="p-5 border-b">
          <h2 className="text-xl font-bold text-white pl-10">ByteSphere</h2>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li
                key={index}
                className="hover:bg-gray-500 rounded-md transition"
              >
                <button
                  onClick={() => setActiveComponent(item.component)}
                  className="flex items-center w-full p-3 text-white"
                >
                  {item.icon}
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
