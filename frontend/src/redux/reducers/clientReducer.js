const initialState = {
    user: {},
    addressList: [],
    creditCards: [],
    orders: [],
    roles: [],
    theme: "",
    language: "",
    authChecked: false,
};

const clientReducer = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case "CLIENT_SET_USER":
            return {
                ...state,
                user: action.payload,
            };

        case "CLIENT_SET_ROLES":
            return {
                ...state,
                roles: action.payload,
            };

        case "CLIENT_SET_THEME":
            return {
                ...state,
                theme: action.payload,
            };

        case "CLIENT_SET_LANGUAGE":
            return {
                ...state,
                language: action.payload,
            };

        case "CLIENT_SET_AUTH_CHECKED":
            return {
                ...state,
                authChecked: action.payload,
            };

        case "CLIENT_SET_ADDRESS_LIST":
        case "SET_ADDRESS_LIST":
            return {
                ...state,
                addressList: action.payload,
            };

        case "CLIENT_SET_CREDIT_CARDS":
            return {
                ...state,
                creditCards: action.payload,
            };

        case "CLIENT_SET_ORDERS":
            return {
                ...state,
                orders: action.payload,
            };

        default:
            return state;
    }
};

export default clientReducer;