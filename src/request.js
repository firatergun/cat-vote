import axios from "./axios";

const addFavourite = async (image_id) => {
  //use POST -> /favourites/
  try {
    const response = await axios.post("/favourites", { image_id });
    return response.data;
  } catch (error) {
    console.log("Failed to update favourite: ", error);
    throw new Error("Failed to update favourite");
  }
};

const unFavourite = async (favourite_id) => {
  //use Delete -> /favourites/{favourite_id}
  try {
    const response = await axios.delete(`/favourites/${favourite_id}`);
    return response.data;
  } catch (error) {
    console.log("Failed to update favourite: ", error);
    throw new Error("Failed to update favourite");
  }
};

const vote = async (image_id, value) => {
  // POST -> /votes {value: 1  for Up, value: 0 for down}
  try {
    const response = await axios.post("/votes", { image_id, value });
    return response.data;
  } catch (error) {
    console.log("Failed to post Votes: ", error);
    throw new Error("Failed to post Votes");
  }
};

const getFavourites = async () => {
  try {
    const response = await axios.get("/favourites");
    return response.data;
  } catch (error) {
    console.log("Failed to get Favourites: ", error);
    throw new Error("Failed to get Favourites");
  }
};

const getVotes = async () => {
  try {
    const response = await axios.get("/votes", {
      params: {
        limit: 1000,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Failed to get Votes: ", error);
    throw new Error("Failed to get Votes");
  }
};

const deleteVote = async (vote_id) => {
  //use Delete -> /votes/{vote_id}
  try {
    const response = await axios.delete(`/votes/${vote_id}`);
    return response.data;
  } catch (error) {
    console.log("Failed to delete vote: ", error);
    throw new Error("Failed to delete vote");
  }
};

const getImageScore = async (image_id) => {
  try {
    let score = 0;
    let upVotes = [];
    let downVotes = [];
    const votes = await getVotes();
    upVotes = votes.filter((vote) => {
      return vote.image_id === image_id && vote.value === 1;
    });
    downVotes = votes.filter((vote) => {
      return vote.image_id === image_id && vote.value === 0;
    });
    score = upVotes.length - downVotes.length;
    return score;
  } catch (error) {
    console.log("error: ", error);
    return 0;
  }
};

const getImages = async () => {
  try {
    const response = await axios.get("/images", {
      params: { include_vote: 0, include_favourite: 0, limit: 20 },
    });
    return response.data;
  } catch (error) {
    console.log("Failed to load data: ", error);
    throw new Error("Failed to load data");
  }
};

const getCollection = async () => {
  try {
    const images = await getImages();
    // const favourites = await getFavourites();

    const collection = images.map(async (image) => {
      let score = await getImageScore(image.id);
      return {
        ...image,
        score,
      };
    });
    return Promise.all(collection);
  } catch (error) {
    console.log("Failed to load data: ", error);
    throw new Error("Failed to load data");
  }
};

const clearAllVotes = async () => {
  try {
    const votes = await getVotes();
    const clearVotes = votes.map(async (vote) => {
      return await deleteVote(vote.id);
    });
    return Promise.all(clearVotes);
  } catch (error) {
    console.log("Failed to load data: ", error);
    throw new Error("Failed to load data");
  }
};

export {
  addFavourite,
  unFavourite,
  vote,
  getVotes,
  getImageScore,
  getFavourites,
  getCollection,
  clearAllVotes,
};
