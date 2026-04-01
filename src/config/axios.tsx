import axios from "axios"

const axiosService = axios.create({
    baseURL: "https://yyrnbsehaftutioojylw.supabase.co/rest/v1",
    headers: {apikey: "sb_publishable_GiJH4ksdVqG7vnP4p58Tiw_KNxYcYSl"}
})

export default axiosService;