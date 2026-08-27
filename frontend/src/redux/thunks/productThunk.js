import api from "../../api/axiosInstance";

import {
    setProductList,
    setTotal,
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
                setProductList(response.data.products)
            );

            dispatch(setTotal(response.data.total));

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
