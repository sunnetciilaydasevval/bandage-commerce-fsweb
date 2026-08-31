import {
    legacy_createStore as createStore,
    combineReducers,
    applyMiddleware,
} from "redux";

import { thunk } from "redux-thunk";

import orderReducer from "./reducers/orderReducer";
import clientReducer from "./reducers/clientReducer";
import productReducer from "./reducers/productReducer";
import shoppingCartReducer from "./reducers/shoppingCartReducer";
import favoriteReducer from "./reducers/favoriteReducer";

const rootReducer = combineReducers({
    product: productReducer,
    shoppingCart: shoppingCartReducer,
    favorite: favoriteReducer,
    client: clientReducer,
    order: orderReducer,
});

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

export default store;
