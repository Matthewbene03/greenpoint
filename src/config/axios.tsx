import axios from "axios"

const axiosService = axios.create({
    baseURL: "https://nzaraxeegpwpvzfulvnk.supabase.co/rest/v1"
})

export default axiosService;