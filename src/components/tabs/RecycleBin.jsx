import { useState, useEffect } from "react";
import axios from "axios";
import FilePreviewCard from "../FilePreviewCard";

const RecycleBin = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 📌 Load Token from Local Storage
  const token = localStorage.getItem("token");

  // 📌 Fetch Deleted Files (Trash)
  useEffect(() => {
    const fetchTrashFiles = async () => {
      if (!token) {
        setError("No token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://localhost:3248/api/files/trash-files?limit=20", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setFiles(response.data.files);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch deleted files");
      } finally {
        setLoading(false);
      }
    };

    fetchTrashFiles();
  }, [token]);

  return (
    <div className="ml-64 max-[370px]:ml-0 mt-14 p-3 rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-white">Recycle Bin</h1>

      {/* 🔹 Loading State */}
      {loading && <p className="text-center text-gray-600">Loading deleted files...</p>}

      {/* 🔹 Error Message */}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* 🔹 Show Deleted Files */}
      {!loading && !error && files.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {files.map((file) => (
            <FilePreviewCard key={file.file_url} file={file} />
          ))}
        </div>
      )}

      {/* 🔹 No Deleted Files Message */}
      {!loading && !error && files.length === 0 && (
        <p className="text-center text-gray-600">No files in the Recycle Bin.</p>
      )}
    </div>
  );
};

export default RecycleBin;
