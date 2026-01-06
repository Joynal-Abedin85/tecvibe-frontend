import axios from "axios";


const instance = axios.create({
baseURL: "https://tecvibe-backend.vercel.app",
withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});


export default instance;