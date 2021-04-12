import { useState, useEffect } from "react";
import axios from "../axios";

const useUpload = (file) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    async function uploadImage(file) {
      const formData = new FormData();
      formData.append("file", file, file.name);
      // formData.append("sub_id", uuid());
      try {
        const response = await axios.post("/images/upload", formData, {
          onUploadProgress: (progressEvent) => {
            let progress = (progressEvent.loaded / progressEvent.total) * 100;
            setProgress(progress);
          },
        });
        setData(response.data);
      } catch (error) {
        setError(error);
      }
    }
    uploadImage(file);
  }, [file]);
  return { progress, data, error };
};

export default useUpload;
