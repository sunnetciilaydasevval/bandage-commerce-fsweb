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
