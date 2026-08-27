const initialState = {
    favorites: [],
};

const favoriteReducer = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case "FAVORITE_SET_FAVORITES":
            return {
                ...state,
                favorites: action.payload,
            };

        case "FAVORITE_ADD": {
            const exists = state.favorites.some(
                (product) =>
                    product.id === action.payload.id
            );

            if (exists) {
                return state;
            }

            return {
                ...state,
                favorites: [
                    ...state.favorites,
                    action.payload,
                ],
            };
        }

        case "FAVORITE_REMOVE":
            return {
                ...state,
                favorites: state.favorites.filter(
                    (product) =>
                        product.id !== action.payload
                ),
            };

        case "FAVORITE_TOGGLE": {
            const exists = state.favorites.some(
                (product) =>
                    product.id === action.payload.id
            );

            if (exists) {
                return {
                    ...state,
                    favorites:
                        state.favorites.filter(
                            (product) =>
                                product.id !==
                                action.payload.id
                        ),
                };
            }

            return {
                ...state,
                favorites: [
                    ...state.favorites,
                    action.payload,
                ],
            };
        }

        default:
            return state;
    }
};

export default favoriteReducer;
