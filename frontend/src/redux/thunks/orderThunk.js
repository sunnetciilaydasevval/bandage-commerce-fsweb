import {
    setOrders,
} from "../actions/orderActions";

import {
    createOrder as createOrderApi,
    getOrders as getOrdersApi,
} from "../../api/order";

export const createOrder = (
    orderData
) => {
    return async () => {
        const response =
            await createOrderApi(
                orderData
            );

        return response;
    };
};

export const fetchOrders = () => {
    return async (dispatch) => {
        try {
            const response =
                await getOrdersApi();

            dispatch(
                setOrders(
                    response.data
                )
            );
        } catch (error) {
            console.error(
                "Failed to fetch orders:",
                error
            );

            throw error;
        }
    };
};
