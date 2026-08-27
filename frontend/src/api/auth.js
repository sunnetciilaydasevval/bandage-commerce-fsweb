import api from "./axiosInstance";

export const getRoles = () => {
    return api.get("/roles");
};

export const signup = (formData) => {
    return api.post("/signup", formData);
};
