export default {
    setToken(token) {
        window.LS.set("accessToken", token);
    },
    setUser(userInfo) {
        window.LS.set("userInfo", JSON.stringify(userInfo));
    },
    getToken() {
        let accessToken = window.LS.get("accessToken");
        return accessToken?accessToken:'';
    },
    getUser() {
        let userInfo = window.LS.get("userInfo");
        if (userInfo) {
            try {
                userInfo = JSON.parse(userInfo);
            } catch (error) {
                userInfo = null;
            }
        }
        return userInfo;
    }, 
    clearToken() {
        let accessToken = window.LS.get("accessToken");
        if(accessToken){
            window.LS.set("accessToken", "");
        }
    },
    clearUser() {
        let userInfo = window.LS.get("userInfo");
        if(userInfo){
            window.LS.set("userInfo", "");
        }
    }
}