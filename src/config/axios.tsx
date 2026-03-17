import axios from "axios"

const axiosService = axios.create({
    baseURL: "http://localhost:3001"
})

export default axiosService;