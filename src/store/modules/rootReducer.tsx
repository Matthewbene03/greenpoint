//Esse arquivo combina todos os reducer da aplicação

import { combineReducers } from "redux";

import { reducerAuthrization } from "./authorization/reducer";

const rootReducer = combineReducers({
    authorization: reducerAuthrization,
})

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;