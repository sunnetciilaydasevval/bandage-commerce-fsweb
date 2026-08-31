import api from "./axiosInstance";

export const createOrder = (orderData) => {
    return api.post("/order", orderData);
};

export const getOrders = () => {
    return api.get("/order");
};
