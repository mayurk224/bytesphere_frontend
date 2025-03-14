import { useState, useEffect } from "react";
import axios from "axios";

const UploadMultipleFiles = () => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(storedToken);
  }, []);

  const handleFileChange = (event) => {
    setFiles([...event.target.files]);
    setMessage("");
  };

  const handleUpload = async () => {
    if (files.length === 0)
      return setMessage("Please select at least one file!");
    if (!token) return setMessage("No token found. Please log in.");

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    setUploading(true);
    setMessage("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/files/upload-multiple`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUploadedFiles(response.data.files);
      setMessage("Files uploaded successfully!");
      setFiles([]);
    } catch (error) {
      setMessage(error.response?.data?.error || "Upload failed!");
    }

    setUploading(false);
  };

  return (
    <div className="w-72 bg-gray-800 rounded-xl">
      <h2 className="text-lg text-white font-bold  mb-3">File Upload</h2>

      <div className="relative">
        <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-700 hover:bg-gray-800 transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-gray-100 mb-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>

          <span className="text-sm text-gray-50">
            {files.length > 0
              ? `${files.length} file(s) selected`
              : "Drag files or click to browse"}
          </span>

          <input
            type="file"
            className="hidden"
            multiple
            onChange={handleFileChange}
          />
        </label>

        {files.length > 0 && (
          <div className="mt-2 text-xs text-gray-500 flex justify-between items-center">
            <span>{files.length} file(s) ready to upload</span>
            <button
              onClick={() => handleClearFiles()}
              className="text-red-500 hover:text-red-700"
            >
              Clear
            </button>
          </div>
        )}
      </div>

      <button
        onClick={handleUpload}
        disabled={uploading || files.length === 0}
        className="w-full mt-3 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
      >
        {uploading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
            Uploading...
          </>
        ) : (
          "Upload Files"
        )}
      </button>

      {message && (
        <div
          className={`mt-3 p-2 text-sm text-center rounded ${
            message.includes("error")
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {message}
        </div>
      )}

      {uploadedFiles.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium mb-2 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Uploaded Files
          </h3>
          <ul className="max-h-40 overflow-y-auto space-y-1 text-xs">
            {uploadedFiles.map((file, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-50 p-2 rounded hover:bg-gray-100"
              >
                <div className="truncate max-w-xs">
                  <a
                    href={file.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {file.file_name}
                  </a>
                </div>
                <span className="text-gray-500 text-xs">{file.folder}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UploadMultipleFiles;
