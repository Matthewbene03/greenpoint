import { all } from "redux-saga/effects";
import type { SagaIterator } from "redux-saga";
import authorization from "./authorization/sagas";

export default function* rootSaga(): SagaIterator {
    yield all([authorization]);
}