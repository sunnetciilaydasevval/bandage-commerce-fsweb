export const setCart = (cart) => ({
    type: "SHOPPING_CART_SET_CART",
    payload: cart,
});

export const setPayment = (payment) => ({
    type: "SHOPPING_CART_SET_PAYMENT",
    payload: payment,
});

export const setAddress = (address) => ({
    type: "SHOPPING_CART_SET_ADDRESS",
    payload: address,
});

export const addToCart = (product) => ({
    type: "SHOPPING_CART_ADD",
    payload: product,
});

export const increaseCartItem = (productId) => ({
    type: "SHOPPING_CART_INCREASE",
    payload: productId,
});

export const decreaseCartItem = (productId) => ({
    type: "SHOPPING_CART_DECREASE",
    payload: productId,
});

export const removeFromCart = (productId) => ({
    type: "SHOPPING_CART_REMOVE",
    payload: productId,
});

export const toggleCartItem = (productId) => ({
    type: "SHOPPING_CART_TOGGLE",
    payload: productId,
});
