const initialState = {
    categories: [],
    productList: [],
    total: 0,
    limit: 25,
    offset: 0,
    filter: "",
    fetchState: "NOT_FETCHED",
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case "PRODUCT_SET_CATEGORIES":
            return {
                ...state,
                categories: action.payload,
            };

        case "PRODUCT_SET_PRODUCT_LIST":
            return {
                ...state,
                productList: action.payload,
            };

        case "PRODUCT_SET_TOTAL":
            return {
                ...state,
                total: action.payload,
            };

        case "PRODUCT_SET_FETCH_STATE":
            return {
                ...state,
                fetchState: action.payload,
            };

        case "PRODUCT_SET_LIMIT":
            return {
                ...state,
                limit: action.payload,
            };

        case "PRODUCT_SET_OFFSET":
            return {
                ...state,
                offset: action.payload,
            };

        case "PRODUCT_SET_FILTER":
            return {
                ...state,
                filter: action.payload,
            };

        default:
            return state;
    }
};

export default productReducer;
