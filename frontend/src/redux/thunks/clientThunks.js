import {
    setRoles,
    setCreditCards,
    setUser,
} from "../actions/clientActions";

import {
    getRoles as fetchRoles,
    login as loginRequest,
} from "../../api/auth";

import api from "../../api/axiosInstance";

import {
    getCards,
    createCard,
    updateCard,
    deleteCard,
} from "../../api/card";

let rolesRequestStarted = false;

/**
 * LOGIN
 *
 * Login isteğini API'ye gönderir.
 * Başarılı olursa:
 * - token'ı rememberMe durumuna göre localStorage/sessionStorage'a kaydeder
 * - kullanıcı bilgisini client.user içerisine kaydeder
 * - Login.jsx'e responseData döndürür
 */
export const loginUser = (formData, rememberMe = false) => {
    return async (dispatch) => {
        try {
            const response = await loginRequest({
                email: formData.email,
                password: formData.password,
            });

            const responseData = response.data;

            const token =
                responseData?.token ||
                responseData?.accessToken ||
                responseData?.access;

            if (!token) {
                throw new Error(
                    "Login response does not contain a token."
                );
            }

            // Önce eski token'ları temizle.
            localStorage.removeItem("token");
            sessionStorage.removeItem("token");

            // Remember me seçiliyse kalıcı,
            // seçili değilse sessionStorage kullan.
            if (rememberMe) {
                localStorage.setItem("token", token);
            } else {
                sessionStorage.setItem("token", token);
            }

            // API user objesi gönderiyorsa onu kullan.
            // Bazı response'larda user olmayabileceği için
            // form email'ini fallback olarak kullanıyoruz.
            const user =
                responseData?.user || {
                    email: formData.email,
                };

            dispatch(setUser(user));

            return responseData;
        } catch (error) {
            console.error(
                "Login failed:",
                error
            );

            throw error;
        }
    };
};

export const logoutUser = () => {
    return (dispatch) => {
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");

        dispatch(
            setUser({})
        );
    };
};

export const getRoles = () => {
    return async (dispatch, getState) => {
        const roles =
            getState().client?.roles || [];

        if (
            roles.length > 0 ||
            rolesRequestStarted
        ) {
            return;
        }

        rolesRequestStarted = true;

        try {
            const response =
                await fetchRoles();

            dispatch(
                setRoles(
                    response.data || []
                )
            );
        } catch (error) {
            console.error(
                "Failed to fetch roles:",
                error
            );

            rolesRequestStarted = false;

            throw error;
        }
    };
};

export const getAddresses = () => {
    return async (dispatch) => {
        try {
            const response =
                await api.get(
                    "/user/address"
                );

            dispatch({
                type: "SET_ADDRESS_LIST",
                payload:
                    response.data || [],
            });

            return response.data;
        } catch (error) {
            console.error(
                "Failed to fetch addresses:",
                error
            );

            throw error;
        }
    };
};

export const addAddress = (
    addressData
) => {
    return async (dispatch) => {
        try {
            const response =
                await api.post(
                    "/user/address",
                    addressData
                );

            await dispatch(
                getAddresses()
            );

            return response.data;
        } catch (error) {
            console.error(
                "Failed to create address:",
                error
            );

            throw error;
        }
    };
};

export const updateAddress = (
    addressData
) => {
    return async (dispatch) => {
        try {
            const response =
                await api.put(
                    "/user/address",
                    addressData
                );

            await dispatch(
                getAddresses()
            );

            return response.data;
        } catch (error) {
            console.error(
                "Failed to update address:",
                error
            );

            throw error;
        }
    };
};

export const deleteAddress = (
    addressId
) => {
    return async (dispatch) => {
        try {
            const response =
                await api.delete(
                    `/user/address/${addressId}`
                );

            await dispatch(
                getAddresses()
            );

            return response.data;
        } catch (error) {
            console.error(
                "Failed to delete address:",
                error
            );

            throw error;
        }
    };
};

export const fetchCards = () => {
    return async (dispatch) => {
        try {
            const response =
                await getCards();

            const cards =
                response.data || [];

            dispatch(
                setCreditCards(cards)
            );

            return cards;
        } catch (error) {
            console.error(
                "Failed to fetch cards:",
                error
            );

            throw error;
        }
    };
};

export const addCard = (
    cardData
) => {
    return async (dispatch) => {
        try {
            const response =
                await createCard(
                    cardData
                );

            await dispatch(
                fetchCards()
            );

            return response.data;
        } catch (error) {
            console.error(
                "Failed to create card:",
                error
            );

            throw error;
        }
    };
};

export const editCard = (
    cardData
) => {
    return async (dispatch) => {
        try {
            const response =
                await updateCard(
                    cardData
                );

            await dispatch(
                fetchCards()
            );

            return response.data;
        } catch (error) {
            console.error(
                "Failed to update card:",
                error
            );

            throw error;
        }
    };
};

export const removeCard = (
    cardId
) => {
    return async (dispatch) => {
        try {
            const response =
                await deleteCard(
                    cardId
                );

            await dispatch(
                fetchCards()
            );

            return response.data;
        } catch (error) {
            console.error(
                "Failed to delete card:",
                error
            );

            throw error;
        }
    };
};

export const createOrder = (
    orderData
) => {
    return async () => {
        try {
            const response =
                await api.post(
                    "/order",
                    orderData
                );

            return response.data;
        } catch (error) {
            console.error(
                "Failed to create order:",
                error
            );

            throw error;
        }
    };
};

export const getOrders = () => {
    return async (dispatch) => {
        try {
            const response =
                await api.get("/order");

            const orders =
                response.data || [];

            dispatch({
                type: "CLIENT_SET_ORDERS",
                payload: orders,
            });

            return orders;
        } catch (error) {
            console.error(
                "Failed to fetch orders:",
                error
            );

            throw error;
        }
    };
};