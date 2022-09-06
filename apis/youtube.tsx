import axios from "axios";

export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3/",
  params: {
    part: "snippet",
    maxResults: 6,
    key: "AIzaSyCLQPptlC_V96C_w3qIiDL2YyLeHkD0okY",
  },
});
