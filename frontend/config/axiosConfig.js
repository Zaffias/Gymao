import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api",
})

const token = localStorage.getItem("token");

axiosInstance.defaults.headers.common["Authorization"] = token && `Bearer ${token}`;