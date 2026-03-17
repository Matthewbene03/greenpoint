//Esse arquivo combina todos os reducer da aplicação

import { combineReducers } from "redux";

import { reducerAuthrization } from "./authorization/reducer";

export default combineReducers({
    authorization: reducerAuthrization,
})