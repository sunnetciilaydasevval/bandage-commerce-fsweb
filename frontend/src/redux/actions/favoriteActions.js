export const setFavorites = (favorites) => ({
    type: "FAVORITE_SET_FAVORITES",
    payload: favorites,
});

export const addFavorite = (product) => ({
    type: "FAVORITE_ADD",
    payload: product,
});

export const removeFavorite = (productId) => ({
    type: "FAVORITE_REMOVE",
    payload: productId,
});

export const toggleFavorite = (product) => ({
    type: "FAVORITE_TOGGLE",
    payload: product,
});
