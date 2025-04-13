import axios from "axios";

const baseURL = process.env.NODE_ENV === "development" ? "http://localhost:3000/api/" : "https://recipe-finderserver.vercel.app/api/v1";

export const axiosInstance = axios.create({
    baseURL,
    withCredentials: true,
});


