const initialState = {
    cart: [],
    payment: {},
    address: {},
};

const shoppingCartReducer = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case "SHOPPING_CART_SET_CART":
            return {
                ...state,
                cart: action.payload,
            };

        case "SHOPPING_CART_SET_PAYMENT":
            return {
                ...state,
                payment: action.payload,
            };

        case "SHOPPING_CART_SET_ADDRESS":
            return {
                ...state,
                address: action.payload,
            };

        case "SHOPPING_CART_ADD": {
            const existingItem =
                state.cart.find(
                    (item) =>
                        item.product.id ===
                        action.payload.id
                );

            if (existingItem) {
                return {
                    ...state,
                    cart: state.cart.map(
                        (item) =>
                            item.product.id ===
                                action.payload.id
                                ? {
                                    ...item,
                                    count:
                                        item.count +
                                        1,
                                }
                                : item
                    ),
                };
            }

            return {
                ...state,
                cart: [
                    ...state.cart,
                    {
                        count: 1,
                        checked: true,
                        product: action.payload,
                    },
                ],
            };
        }

        case "SHOPPING_CART_INCREASE":
            return {
                ...state,
                cart: state.cart.map(
                    (item) =>
                        item.product.id ===
                            action.payload
                            ? {
                                ...item,
                                count:
                                    item.count +
                                    1,
                            }
                            : item
                ),
            };

        case "SHOPPING_CART_DECREASE":
            return {
                ...state,
                cart: state.cart
                    .map((item) =>
                        item.product.id ===
                            action.payload
                            ? {
                                ...item,
                                count:
                                    item.count -
                                    1,
                            }
                            : item
                    )
                    .filter(
                        (item) =>
                            item.count > 0
                    ),
            };

        case "SHOPPING_CART_REMOVE":
            return {
                ...state,
                cart: state.cart.filter(
                    (item) =>
                        item.product.id !==
                        action.payload
                ),
            };

        case "SHOPPING_CART_TOGGLE":
            return {
                ...state,
                cart: state.cart.map(
                    (item) =>
                        item.product.id ===
                            action.payload
                            ? {
                                ...item,
                                checked:
                                    !item.checked,
                            }
                            : item
                ),
            };

        default:
            return state;
    }
};

export default shoppingCartReducer;
