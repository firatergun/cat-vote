import React, { useState, useEffect } from "react";
import CatDetail from "./CatDetail";
import { getCollection } from "../request";

const CatGrid = ({ setIsPending, setError }) => {
  const [collection, setColletion] = useState([]);

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await getCollection();
        setColletion(response);
        setIsPending(false);
      } catch (error) {
        setError(error);
        setIsPending(false);
      }
    }
    fetchImages();
  }, [setColletion, setIsPending, setError]);

  return (
    <div className="img-grid">
      {collection.map((cat) => {
        return <CatDetail key={cat.id} cat={cat} />;
      })}
    </div>
  );
};

export default CatGrid;
