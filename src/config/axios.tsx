import axios from "axios";
// import store from "../store";
// import type { RootState } from "../store/modules/rootReducer";

const axiosService = axios.create({
    baseURL: "https://yyrnbsehaftutioojylw.supabase.co",
    headers: { apikey: "sb_publishable_GiJH4ksdVqG7vnP4p58Tiw_KNxYcYSl" }
});

// axiosService.interceptors.request.use(config => {
//     const state = store.getState() as unknown as RootState;

//     const token = state.authorization?.token;

//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
// });

export default axiosService;