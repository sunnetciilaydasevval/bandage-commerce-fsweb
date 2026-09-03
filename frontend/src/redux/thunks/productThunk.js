import api from "../../api/axiosInstance";

import {
    setProductList,
    setTotal,
    setProduct,
    setFetchState,
} from "../actions/productActions";

const productRequests = new Map();

export const fetchProducts = (params = {}) => {
    return async (dispatch) => {
        const cleanParams = Object.fromEntries(
            Object.entries(params).filter(
                ([, value]) =>
                    value !== undefined &&
                    value !== null &&
                    value !== ""
            )
        );
        const requestKey = JSON.stringify(cleanParams);

        if (productRequests.has(requestKey)) {
            return productRequests.get(requestKey);
        }

        const request = (async () => {
            dispatch(setFetchState("FETCHING"));

            try {

                const response = await api.get("/products", {
                    params: cleanParams,
                });

                const responseData = response.data || {};
                const products = Array.isArray(responseData)
                    ? responseData
                    : responseData.products || [];

                dispatch(setProductList(products));

                dispatch(setTotal(Number(responseData.total ?? products.length)));

                dispatch(setFetchState("FETCHED"));
            } catch (error) {
                console.error("Failed to fetch products:", error);

                dispatch(setFetchState("FAILED"));
                throw error;
            } finally {
                productRequests.delete(requestKey);
            }
        })();

        productRequests.set(requestKey, request);
        return request;
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
