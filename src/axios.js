import axios from "axios";

const API_KEY = "95922ecd-225d-4c90-9e0d-504d382efa9f";

const instance = axios.create({
  baseURL: "https://api.thecatapi.com/v1",
});

instance.defaults.headers.common["x-api-key"] = API_KEY;

export default instance;
