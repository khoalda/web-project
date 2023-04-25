import axios from "axios";

const instance = axios.create(
  {
    baseURL: "/web-project/backend/api",
  },
  {
    withCredentials: true,
  }
);

export default instance;





