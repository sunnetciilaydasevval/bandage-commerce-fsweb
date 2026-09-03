import api from "./axiosInstance";

export const getRoles = () => {
    return api.get("/roles");
};

export const signup = (formData) => {
    return api.post("/signup", formData);
};

export const login = (formData) => {
    return api.post("/login", formData);
};

export const verifyToken = () => {
    return api.get("/verify");
};
