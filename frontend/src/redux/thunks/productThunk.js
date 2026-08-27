import api from "../../api/axiosInstance";

import {
    setProductList,
    setTotal,
    setProduct,
    setFetchState,
} from "../actions/productActions";

export const fetchProducts = (params = {}) => {
    return async (dispatch) => {
        dispatch(setFetchState("FETCHING"));

        try {
            const cleanParams = Object.fromEntries(
                Object.entries(params).filter(
                    ([, value]) =>
                        value !== undefined &&
                        value !== null &&
                        value !== ""
                )
            );

            const response = await api.get("/products", {
                params: cleanParams,
            });

            dispatch(
                setProductList(
                    response.data.products || []
                )
            );

            dispatch(
                setTotal(
                    response.data.total || 0
                )
            );

            dispatch(setFetchState("FETCHED"));
        } catch (error) {
            console.error(
                "Failed to fetch products:",
                error
            );

            dispatch(setFetchState("FAILED"));
        }
    };
};

export const fetchProduct = (productId) => {
    return async (dispatch) => {
        dispatch(setFetchState("FETCHING"));

        try {
            const response = await api.get(
                `/products/${productId}`
            );

            dispatch(
                setProduct(response.data)
            );

            dispatch(setFetchState("FETCHED"));
        } catch (error) {
            console.error(
                "Failed to fetch product:",
                error
            );

            dispatch(setProduct(null));
            dispatch(setFetchState("FAILED"));
        }
    };
};
