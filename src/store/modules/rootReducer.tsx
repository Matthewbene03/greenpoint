//Esse arquivo combina todos os reducer da aplicação

import { combineReducers } from "redux";

import { reducerExample } from "./exaples/reducer";

export default combineReducers({
    exaples: reducerExample,
})