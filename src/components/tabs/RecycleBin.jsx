import { useState, useEffect } from "react";
import axios from "axios";
import FilePreviewCard from "../FilePreviewCard";

const RecycleBin = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTrashFiles = async () => {
      if (!token) {
        setError("No token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:3248/api/files/trash-files?limit=20",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

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
    <div className="">
      <h1 className="text-2xl font-bold mb-4 text-white">Recycle Bin</h1>

      {loading && (
        <p className="text-center text-gray-600">Loading deleted files...</p>
      )}

      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && files.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {files.map((file) => (
            <FilePreviewCard key={file.file_url} file={file} />
          ))}
        </div>
      )}

      {!loading && !error && files.length === 0 && (
        <p className="text-center text-gray-600">
          No files in the Recycle Bin.
        </p>
      )}
    </div>
  );
};

export default RecycleBin;
