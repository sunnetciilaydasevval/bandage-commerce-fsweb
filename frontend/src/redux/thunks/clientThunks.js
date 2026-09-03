import {
    setRoles,
    setCreditCards,
    setUser,
    setAuthChecked,
} from "../actions/clientActions";

import {
    getRoles as fetchRoles,
    login as loginRequest,
    verifyToken as verifyTokenRequest,
} from "../../api/auth";

import api from "../../api/axiosInstance";

import {
    getCards,
    createCard,
    updateCard,
    deleteCard,
} from "../../api/card";

let rolesRequestStarted = false;

/*
 * LOGIN
 */
export const loginUser = (
    formData,
    rememberMe = false
) => {
    return async (dispatch) => {
        try {
            const response =
                await loginRequest({
                    email: formData.email,
                    password: formData.password,
                });

            const responseData =
                response.data;

            const token =
                responseData?.token ||
                responseData?.accessToken ||
                responseData?.access;

            if (!token) {
                throw new Error(
                    "Login response does not contain a token."
                );
            }

            /*
             * Eski tokenları temizle.
             */
            localStorage.removeItem("token");
            sessionStorage.removeItem("token");

            /*
             * Remember Me seçiliyse token
             * localStorage'a kaydedilir.
             *
             * Değilse sessionStorage kullanılır.
             */
            if (rememberMe) {
                localStorage.setItem(
                    "token",
                    token
                );
            } else {
                sessionStorage.setItem(
                    "token",
                    token
                );
            }

            /*
             * Axios sonraki isteklerde tokenı
             * otomatik olarak Authorization headerına
             * ekleyecek.
             *
             * Burada özellikle Bearer kullanılmıyor.
             */
            api.defaults.headers.common.Authorization =
                token;

            /*
             * User bilgisini Redux'a kaydet.
             */
            const user =
                responseData?.user || {
                    email: formData.email,
                };

            dispatch(
                setUser(user)
            );

            dispatch(
                setAuthChecked(true)
            );

            return responseData;
        } catch (error) {
            throw error;
        }
    };
};

/*
 * VERIFY TOKEN
 *
 * Uygulama açıldığında çağrılır.
 */
export const verifyToken = () => {
    return async (dispatch) => {
        try {
            /*
             * Öncelikle localStorage kontrol edilir.
             * Remember Me ile kaydedilen token burada bulunur.
             *
             * sessionStorage da kontrol edilir;
             * böylece Remember Me seçilmeden giriş yapan
             * kullanıcı aynı browser session'ında refresh
             * yaptığında login durumu korunur.
             */
            const localToken =
                localStorage.getItem("token");

            const sessionToken =
                sessionStorage.getItem("token");

            const token =
                localToken || sessionToken;

            /*
             * Hiç token yoksa verify isteği gönderme.
             */
            if (!token) {
                dispatch(
                    setUser({})
                );

                dispatch(
                    setAuthChecked(true)
                );

                return null;
            }

            /*
             * Axios headerını verify isteğinden önce
             * doğrudan token ile ayarla.
             *
             * NOT: Bearer prefix YOK.
             */
            api.defaults.headers.common.Authorization =
                token;

            const response =
                await verifyTokenRequest();

            const responseData =
                response.data;

            /*
             * Verify response'undan user bilgisini al.
             */
            const user =
                responseData?.user ||
                responseData;

            /*
             * Backend yeni/yenilenmiş token
             * döndürebilir.
             */
            const renewedToken =
                responseData?.token ||
                responseData?.accessToken ||
                responseData?.access ||
                token;

            /*
             * Tokenı yenile.
             *
             * Token localStorage'dan geldiyse
             * localStorage'da tut.
             *
             * sessionStorage'dan geldiyse
             * sessionStorage'da tut.
             */
            if (localToken) {
                localStorage.setItem(
                    "token",
                    renewedToken
                );
            } else {
                sessionStorage.setItem(
                    "token",
                    renewedToken
                );
            }

            /*
             * Axios headerını da yenile.
             */
            api.defaults.headers.common.Authorization =
                renewedToken;

            /*
             * User bilgisini Redux'a yaz.
             */
            dispatch(
                setUser(user || {})
            );

            dispatch(
                setAuthChecked(true)
            );

            return user;
        } catch (error) {
            console.error(
                "Token verification failed:",
                error
            );

            /*
             * Token geçersiz.
             *
             * Her iki storage'dan da temizliyoruz.
             */
            localStorage.removeItem(
                "token"
            );

            sessionStorage.removeItem(
                "token"
            );

            /*
             * Axios default Authorization headerını
             * da temizle.
             */
            delete api.defaults.headers.common
                .Authorization;

            dispatch(
                setUser({})
            );

            dispatch(
                setAuthChecked(true)
            );

            return null;
        }
    };
};

/*
 * LOGOUT
 */
export const logoutUser = () => {
    return (dispatch) => {
        localStorage.removeItem(
            "token"
        );

        sessionStorage.removeItem(
            "token"
        );

        delete api.defaults.headers.common
            .Authorization;

        dispatch(
            setUser({})
        );

        dispatch(
            setAuthChecked(true)
        );
    };
};

/*
 * ROLES
 */
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

/*
 * ADDRESSES
 */
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

/*
 * CREDIT CARDS
 */
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

/*
 * ORDERS
 */
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
