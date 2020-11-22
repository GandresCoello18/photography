import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import SearchReducer from "./modulos/search";
import ListPhotos, { SetPhotos } from "./modulos/listPhoto";
import { json, unsplash } from "../api/unsplash";

const rootReducer = combineReducers({
  SearchReducer,
  ListPhotos,
});

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers =
  (window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] as typeof compose) || compose;

export default function generateStore() {
  unsplash.photos
    .listPhotos(1, 15, "latest")
    .then(json)
    .then((data: any) => SetPhotos(data)(store.dispatch));

  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
}

const store = generateStore();
export type RootState = ReturnType<typeof rootReducer>;
export type Dispatch = typeof store.dispatch;
