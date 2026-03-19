import { all } from "redux-saga/effects";
import type { SagaIterator } from "redux-saga";
import exaples from "./exaples/sagas";

export default function* rootSaga(): SagaIterator {
    yield all([exaples]);
}