import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import useUpload from "../hooks/useUpload";

const ProgessBar = ({ file, setFile, setError }) => {
  const history = useHistory();
  const { progress, data, error } = useUpload(file);

  useEffect(() => {
    if (data || error) {
      setFile(null);
      if (error) {
        setError(error);
      }
      if (data) {
        history.push("/");
      }
    }
  }, [data, error, setFile, setError, history]);
  return <div className="progress-bar" style={{ width: progress + "%" }}></div>;
};

export default ProgessBar;
