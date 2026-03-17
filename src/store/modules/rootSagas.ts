import { all } from "redux-saga/effects";
import authorization from "./authorization/sagas";

export default function* rootSaga(){
    return yield all([authorization])
}
