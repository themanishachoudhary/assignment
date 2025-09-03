import axios from "axios";

// 👇 backend is running on localhost:3000
const API = axios.create({
  baseURL: "http://localhost:3000/user",
});

// for protected routes, attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
}); 

export default API;
