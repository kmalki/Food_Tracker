import axios from "axios";

const API_URL = "http://localhost:8080/products/";

class ProductsService {
    
    getProducts() {

        let config = {
            headers: {
              Authorization: JSON.parse(localStorage.getItem('foodTrackerAuthorization'))
            }
        }

        return axios
            .get(API_URL + "getProducts", config)
            .then(response => {
                return response;
            });
    }

}

export default new ProductsService();
