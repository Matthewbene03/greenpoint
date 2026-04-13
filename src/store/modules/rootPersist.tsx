import storage from "redux-persist/es/storage";
import {persistReducer} from "redux-persist";

export default (reducers: any) =>{
    const persistedReducers = persistReducer(
        {
            key: "greenpoint",
            storage, 
            whitelist: ["authorization"]
        }
    , reducers)

    return persistedReducers;
}