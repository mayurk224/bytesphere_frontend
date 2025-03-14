import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import FileDetailsModel from "./FileDetailsModel";

const RecentFileTable = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [deleting, setDeleting] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const fetchRecentFiles = useCallback(async () => {
    if (!token) {
      setError("No token found. Please log in.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/files/recent-files?limit=10`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setFiles(response.data.files);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch files");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchRecentFiles();
  }, [fetchRecentFiles]);

  const handleCheckboxChange = (fileUrl) => {
    setSelectedFiles((prevSelected) =>
      prevSelected.includes(fileUrl)
        ? prevSelected.filter((url) => url !== fileUrl)
        : [...prevSelected, fileUrl]
    );
  };

  const handleDelete = async () => {
    if (selectedFiles.length === 0) {
      setError("Please select at least one file to delete.");
      return;
    }

    setDeleting(true);
    setError("");

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/files/delete-multiple`,
        { files: selectedFiles },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setFiles((prevFiles) =>
        prevFiles.filter((file) => !selectedFiles.includes(file.file_url))
      );

      setSelectedFiles([]);
      alert("Files moved to Trash successfully!");
    } catch (error) {
      setError(error.response?.data?.error || "Failed to delete files.");
    }

    setDeleting(false);
  };

  const handleSelectAll = () => {
    if (selectedFiles.length === files.length) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(files.map((file) => file.file_url));
    }
  };

  const getFileIcon = (fileType) => {
    switch (fileType.toLowerCase()) {
      case "pdf":
        return (
          <div className="p-1 bg-red-100 rounded flex items-center justify-center">
            <svg
              className="w-4 h-4 text-red-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
          </div>
        );
      case "pptx":
        return (
          <div className="p-1 bg-orange-100 rounded flex items-center justify-center">
            <svg
              className="w-4 h-4 text-orange-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
        );
      case "xlsx":
        return (
          <div className="p-1 bg-green-100 rounded flex items-center justify-center">
            <svg
              className="w-4 h-4 text-green-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
        );
      case "jpg":
      case "png":
      case "gif":
        return (
          <div className="p-1 bg-blue-100 rounded flex items-center justify-center">
            <svg
              className="w-4 h-4 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        );
      default:
        return (
          <div className="p-1 bg-gray-100 rounded flex items-center justify-center">
            <svg
              className="w-4 h-4 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
          </div>
        );
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
    else return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  return (
    <div className=" p-3 sm:p-6 bg-gray-800 shadow-lg rounded-lg">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <h2 className="text-xl font-bold text-white">Manage Your Files</h2>

        <div className="flex items-center space-x-2">
          <button className="p-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors">
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>

          {selectedFiles.length > 0 && (
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center space-x-1"
            >
              <svg
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              <span>
                {deleting ? "Deleting..." : `Delete (${selectedFiles.length})`}
              </span>
            </button>
          )}
        </div>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-10">
          <svg
            className="animate-spin h-8 w-8 text-indigo-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      )}

      {error && (
        <div className="p-4 mb-4 bg-red-500 bg-opacity-10 border border-red-500 rounded-lg">
          <p className="text-center text-red-500">{error}</p>
        </div>
      )}

      {!loading && !error && files.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="text-left border-b border-gray-700">
              <tr>
                <th className="p-3 text-gray-400 font-medium">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-600 text-indigo-500 focus:ring-indigo-500"
                      checked={
                        selectedFiles.length === files.length &&
                        files.length > 0
                      }
                      onChange={handleSelectAll}
                    />
                  </div>
                </th>
                <th className="p-3 text-gray-400 font-medium">File</th>
                <th className="p-3 text-gray-400 font-medium">Size</th>

                <th className="p-3 text-gray-400 font-medium hidden md:table-cell">
                  Uploaded
                </th>

                <th className="p-3 text-gray-400 font-medium hidden md:table-cell">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => (
                <tr
                  key={file.file_url}
                  className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors"
                >
                  <td className="p-3">
                    <input
                      type="checkbox"
                      className="rounded border-gray-600 text-indigo-500 focus:ring-indigo-500"
                      checked={selectedFiles.includes(file.file_url)}
                      onChange={() => handleCheckboxChange(file.file_url)}
                    />
                  </td>
                  <td className="p-3">
                    <div className="flex items-center space-x-3">
                      {getFileIcon(file.type)}
                      <div>
                        <p className="text-white font-medium">
                          {file.file_name}
                        </p>

                        <div className="md:hidden flex items-center mt-1">
                          <p className="text-gray-400 text-xs">
                            {new Date(file.uploaded_at).toLocaleString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </p>

                          <div className="ml-auto flex space-x-2">
                            <button className="p-1 text-gray-400 hover:text-indigo-400 transition-colors">
                              <svg
                                className="w-4 h-4"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>

                        <p className="text-gray-400 text-sm hidden md:block">
                          {file.type}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 text-gray-300">
                    {formatFileSize(file.size)}
                  </td>

                  <td className="p-3 text-gray-300 hidden md:table-cell">
                    {new Date(file.uploaded_at).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>

                  <td className="p-3 hidden md:table-cell">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedFile(file)}
                        className="p-1 text-gray-400 hover:text-indigo-400 transition-colors"
                      >
                        <svg
                          className="w-5 h-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </button>
                      <button className="p-1 text-gray-400 hover:text-green-400 transition-colors">
                        <svg
                          className="w-5 h-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && !error && files.length === 0 && (
        <div className="py-10 sm:py-16 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
            />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-300">
            No files found
          </h3>
          <p className="mt-1 text-gray-500">
            Get started by uploading your first file
          </p>
          <div className="mt-6">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
              Upload File
            </button>
          </div>
        </div>
      )}
      {selectedFile && (
        <FileDetailsModel
          file={selectedFile}
          onClose={() => setSelectedFile(null)}
        />
      )}
    </div>
  );
};

export default RecentFileTable;
