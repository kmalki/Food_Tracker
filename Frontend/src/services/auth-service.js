import axios from "axios";

const API_URL = "http://localhost:8080/";

class AuthService {
    login(username, password) {
        return axios
            .post(API_URL + "login", {
                username,
                password
            })
            .then(response => {
                console.log(response.headers.authorization);
                if (response.headers.authorization) {
                    localStorage.setItem("foodTrackerAuthorization", JSON.stringify(response.headers.authorization));
                    localStorage.setItem("foodTrackerUsername", username);                
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("foodTrackerAuthorization");
        localStorage.removeItem("foodTrackerUsername");
        window.location.href = '/login';
    }

    register(username, password) {
        return axios.post(API_URL + "users/sign-up", {
            username,
            password
        });
    }

    getCurrentUser() {
        return localStorage.getItem('foodTrackerUsername');
    }
}

export default new AuthService();
