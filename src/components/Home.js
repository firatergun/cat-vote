import React, { useState, useEffect } from "react";
import CatGrid from "./CatGrid";
import { clearAllVotes } from "../request";

const Home = () => {
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   async function clearVotes() {
  //     await clearAllVotes();
  //   }
  //   clearVotes();
  // }, []);

  return (
    <div className="home">
      {error && <div>{error}</div>}
      {isPending && (
        <div>
          <h1 className="loading"> Loading...</h1>
        </div>
      )}
      {<CatGrid setIsPending={setIsPending} setError={setError} />}
    </div>
  );
};

export default Home;
