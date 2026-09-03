import api from "../../api/axiosInstance";
import { setCategories } from "../actions/productActions";

let categoriesRequestStarted = false;

export const fetchCategories = () => {
    return async (dispatch, getState) => {
        const categories = getState().product.categories;

        if (categories.length > 0 || categoriesRequestStarted) {
            return;
        }

        categoriesRequestStarted = true;

        try {
            const response = await api.get("/categories");

            const categories = Array.isArray(response.data)
                ? response.data
                : response.data?.categories || [];

            dispatch(setCategories(categories));
        } catch (error) {
            console.error(
                "Failed to fetch categories:",
                error
            );

            categoriesRequestStarted = false;
        }
    };
};
