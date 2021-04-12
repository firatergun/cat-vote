import { useState, useEffect } from "react";
import { getImageScore, addFavourite, unFavourite, vote } from "../request";
import { IconContext } from "react-icons";
import { FaThumbsUp, FaThumbsDown, FaRegHeart, FaHeart } from "react-icons/fa";

const CatDetail = ({ cat }) => {
  const [favourite, setFavourite] = useState(false);
  const [favObj, setFavObj] = useState(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const score = cat.score;
    setScore(score);
  }, [cat.score]);

  const handleFavourite = async (fav) => {
    try {
      if (fav) {
        //add to Favourite
        const response = await addFavourite(cat.id);
        setFavObj(response);
      } else {
        //Delete from Favourite
        unFavourite(favObj.id);
      }
      setFavourite(fav);
    } catch (error) {}
  };

  const handleVote = async (value) => {
    try {
      await vote(cat.id, value);
      const imageScore = await getImageScore(cat.id);
      setScore(imageScore);
    } catch (error) {}
  };

  return (
    <IconContext.Provider value={{ color: "grey", size: "2em" }}>
      <div>
        <div className="img-wrap">
          <img src={cat.url} alt="cat pics" />
        </div>
        <div className="btn-wrap">
          <button className="btn" onClick={() => handleFavourite(!favourite)}>
            {favourite ? (
              <i>
                <FaHeart color="red" />
              </i>
            ) : (
              <i>
                <FaRegHeart />
              </i>
            )}
          </button>
          <button className="btn" onClick={() => handleVote(1)}>
            <i>
              <FaThumbsUp />
            </i>
          </button>
          <button className="btn" onClick={() => handleVote(0)}>
            <i>
              <FaThumbsDown />
            </i>
          </button>
        </div>
        <div className="score">
          <label>
            <i>Score : {score}</i>
          </label>
        </div>
      </div>
    </IconContext.Provider>
  );
};

export default CatDetail;
