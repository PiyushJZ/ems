import axios from "axios";
// axios instance
export const FETCH_WRAPPER = axios.create({
  baseURL: "http://localhost:3001/api/",
  timeout: 5000,
  headers: {
    Accept: "application/json",
    token: `${localStorage.getItem("token")}`,
  },
});
