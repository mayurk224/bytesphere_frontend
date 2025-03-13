import React, { useState } from "react";

const FavoriteCard = () => {
  const [isStarred, setIsStarred] = useState(false);

  return (
    <div className="w-40 bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
      <div className="h-32 overflow-hidden relative">
        <img
          src="https://images.pexels.com/photos/30913847/pexels-photo-30913847/free-photo-of-indoor-artistic-scene-with-calligraphy-and-cat.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
          alt="Sample image file"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-start justify-end p-2">
          <button
            className="p-1 bg-gray-800/80 rounded-full text-white hover:bg-gray-700 transition-colors"
            onClick={() => setIsStarred(!isStarred)}
          >
            <svg
              className={`w-4 h-4 ${
                isStarred ? "text-yellow-400 fill-current" : "text-gray-300"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-2">
          <button className="p-1 bg-gray-800/80 rounded-full text-white hover:bg-indigo-500 transition-colors">
            <svg
              className="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
          </button>
        </div>
      </div>

      <div className="p-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-white truncate">
            Sample File
          </h3>
          <span className="text-xs text-indigo-300 font-medium">JPG</span>
        </div>
        <div className="flex items-center mt-1">
          <svg
            className="w-3 h-3 text-gray-400 mr-1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
            <polyline points="17 21 17 13 7 13 7 21"></polyline>
            <polyline points="7 3 7 8 15 8"></polyline>
          </svg>
          <span className="text-xs text-gray-400">1.2 MB</span>
        </div>
      </div>
    </div>
  );
};

export default FavoriteCard;
