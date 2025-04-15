import axios from "axios";

const baseURL = process.env.NODE_ENV === "development" ? "http://localhost:3000/api/" : "https://recipe-finder-five-liart.vercel.app/api";

export const axiosInstance = axios.create({
    baseURL,
    withCredentials: true,
});


