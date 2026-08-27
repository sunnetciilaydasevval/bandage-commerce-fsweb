export const setUser = (user) => ({
    type: "CLIENT_SET_USER",
    payload: user,
});

export const setRoles = (roles) => ({
    type: "CLIENT_SET_ROLES",
    payload: roles,
});

export const setTheme = (theme) => ({
    type: "CLIENT_SET_THEME",
    payload: theme,
});

export const setLanguage = (language) => ({
    type: "CLIENT_SET_LANGUAGE",
    payload: language,
});
