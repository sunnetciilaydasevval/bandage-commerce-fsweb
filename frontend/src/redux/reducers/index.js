import { combineReducers } from "redux";
import clientReducer from "./clientReducer";
import productReducer from "./productReducer";
import shoppingCartReducer from "./shoppingCartReducer";
import favoriteReducer from "./favoriteReducer";
import orderReducer from "./orderReducer";

const rootReducer = combineReducers({
    client: clientReducer,
    product: productReducer,
    shoppingCart: shoppingCartReducer,
    favorite: favoriteReducer,
    order: orderReducer,
});

export default rootReducer;
