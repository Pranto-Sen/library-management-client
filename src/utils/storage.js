const TOKEN_KEY = "accessToken";

export const storage = {
    setToken(token) {
        localStorage.setItem(TOKEN_KEY, token);
    },

    getToken() {
        return localStorage.getItem(TOKEN_KEY);
    },

    removeToken() {
        localStorage.removeItem(TOKEN_KEY);
    },

    isLoggedIn() {
        return !!localStorage.getItem(TOKEN_KEY);
    }
};