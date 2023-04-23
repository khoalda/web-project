import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost/web-project/backend/api",
});

export default instance;
