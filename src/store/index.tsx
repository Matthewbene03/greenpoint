import {persistStore} from "redux-persist"
import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./modules/rootReducer";
import rootSaga from "./modules/rootSagas";
import reduxPersist from "./modules/rootPersist"

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    reduxPersist(rootReducer),
    applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store)
export default store;