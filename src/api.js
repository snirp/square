import axios from "axios";

export default axios.create({
  baseURL: "/proxy/api",
});
