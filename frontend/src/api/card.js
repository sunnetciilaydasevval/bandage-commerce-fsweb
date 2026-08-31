import api from "./axiosInstance";

export const getCards = () => {
    return api.get("/user/card");
};

export const createCard = (cardData) => {
    return api.post("/user/card", cardData);
};

export const updateCard = (cardData) => {
    return api.put("/user/card", cardData);
};

export const deleteCard = (cardId) => {
    return api.delete(`/user/card/${cardId}`);
};
