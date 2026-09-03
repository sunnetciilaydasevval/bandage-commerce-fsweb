import {
    legacy_createStore as createStore,
    combineReducers,
    applyMiddleware,
} from "redux";

import { thunk } from "redux-thunk";
import { createLogger } from "redux-logger";

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
    applyMiddleware(
        thunk,
        createLogger()
    )
);

store.subscribe(() => {
    localStorage.setItem(
        "cart",
        JSON.stringify(store.getState().shoppingCart.cart)
    );
});

export default store;
