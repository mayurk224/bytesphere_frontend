import { useState, useEffect } from "react";
import axios from "axios";
import FilePreviewCard from "../FilePreviewCard";

const AllFiles = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchFiles = async () => {
      if (!token) {
        setError("No token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        if (!token) {
          throw new Error("No authentication token found.");
        }
      
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/files/recent-files?limit=50`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      
        setFiles(response.data?.files || []);
      } catch (err) {
        setError(err.response?.data?.error || err.message || "Failed to fetch files");
      } finally {
        setLoading(false);
      }
      
    };

    fetchFiles();
  }, [token]);

  const categorizedFiles = {
    Images: [],
    Audios: [],
    Videos: [],
    Documents: [],
    Other: [],
  };

  files.forEach((file) => {
    if (file.type.startsWith("image")) categorizedFiles.Images.push(file);
    else if (file.type.startsWith("audio")) categorizedFiles.Audios.push(file);
    else if (file.type.startsWith("video")) categorizedFiles.Videos.push(file);
    else if (
      [
        "application/pdf",
        "application/msword",
        "application/vnd.ms-excel",
      ].includes(file.type)
    )
      categorizedFiles.Documents.push(file);
    else categorizedFiles.Other.push(file);
  });

  return (
    <div className="w-full">
      {loading && <p className="text-center text-gray-600">Loading files...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="">
          {Object.entries(categorizedFiles).map(
            ([category, files]) =>
              files.length > 0 && (
                <div key={category} className="p-3">
                  <div className="flex justify-between pr-10">
                    <h5 className="text-xl font-bold dark:text-white">
                      {category}
                    </h5>
                    <button className="text-blue-500">View All</button>
                  </div>
                  <div className="flex flex-wrap gap-5 mt-3">
                    {files.map((file) => (
                      <FilePreviewCard key={file.file_url} file={file} />
                    ))}
                  </div>
                </div>
              )
          )}
        </div>
      )}
    </div>
  );
};

export default AllFiles;
