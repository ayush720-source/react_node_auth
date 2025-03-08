export const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    return token ? true : false;
};

export const getToken = () => {
    return localStorage.getItem("token");
};

export const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/admin-login";
};
