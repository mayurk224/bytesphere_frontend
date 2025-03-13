import React from "react";

const FileDetailsModel = ({ file, onClose }) => {
  if (!file) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-70 flex items-center justify-center w-full h-full bg-gray-600 bg-opacity-50">
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-lg dark:bg-gray-700">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-600">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            {file.file_name}
          </h3>
          <button
            type="button"
            className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={onClose}
          >
            <svg className="w-3 h-3" aria-hidden="true" viewBox="0 0 14 14">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>

        <div className="p-4 space-y-4">
          <p className="text-base text-gray-500 dark:text-gray-400">
            <strong>File Size:</strong> {(file.size / 1024).toFixed(2)} KB
          </p>
          <p className="text-base text-gray-500 dark:text-gray-400">
            <strong>Uploaded At:</strong>{" "}
            {new Date(file.uploaded_at).toLocaleString()}
          </p>
          <p className="text-base text-gray-500 dark:text-gray-400">
            <strong>Last Modified:</strong>{" "}
            {file.modified_at
              ? new Date(file.modified_at).toLocaleString()
              : "N/A"}
          </p>
          <a
            href={file.file_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            View File
          </a>
        </div>
      </div>
    </div>
  );
};

export default FileDetailsModel;
