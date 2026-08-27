import {
    setCart,
} from "../actions/shoppingCartActions";

export const addToCart = (product) => {
    return (dispatch, getState) => {
        const cart =
            getState().shoppingCart.cart || [];

        const existingItem = cart.find(
            (item) =>
                item.product.id === product.id
        );

        let updatedCart;

        if (existingItem) {
            updatedCart = cart.map((item) =>
                item.product.id === product.id
                    ? {
                        ...item,
                        count: item.count + 1,
                    }
                    : item
            );
        } else {
            updatedCart = [
                ...cart,
                {
                    count: 1,
                    checked: true,
                    product,
                },
            ];
        }

        dispatch(setCart(updatedCart));
    };
};

export const increaseCartItem = (productId) => {
    return (dispatch, getState) => {
        const cart =
            getState().shoppingCart.cart || [];

        const updatedCart = cart.map((item) =>
            item.product.id === productId
                ? {
                    ...item,
                    count: item.count + 1,
                }
                : item
        );

        dispatch(setCart(updatedCart));
    };
};

export const decreaseCartItem = (productId) => {
    return (dispatch, getState) => {
        const cart =
            getState().shoppingCart.cart || [];

        const updatedCart = cart
            .map((item) => {
                if (
                    item.product.id !==
                    productId
                ) {
                    return item;
                }

                return {
                    ...item,
                    count: item.count - 1,
                };
            })
            .filter(
                (item) => item.count > 0
            );

        dispatch(setCart(updatedCart));
    };
};

export const removeFromCart = (productId) => {
    return (dispatch, getState) => {
        const cart =
            getState().shoppingCart.cart || [];

        const updatedCart = cart.filter(
            (item) =>
                item.product.id !== productId
        );

        dispatch(setCart(updatedCart));
    };
};

export const toggleCartItem = (productId) => {
    return (dispatch, getState) => {
        const cart =
            getState().shoppingCart.cart || [];

        const updatedCart = cart.map((item) =>
            item.product.id === productId
                ? {
                    ...item,
                    checked: !item.checked,
                }
                : item
        );

        dispatch(setCart(updatedCart));
    };
};
