import axios from "axios";

const defaultHeaders = {
    "content-type": "application/json",
    accept        : "application/json"
};

class Network {

    constructor() {
        if(!Network.instance) {
            const service = axios.create();
            service.interceptors.request.use(
                Network.handleSuccessRequest,
                Network.handleErrorRequest
            );
            service.defaults.headers = defaultHeaders;
            this.service             = service;
            this.web3             = window.web3;
            Network.instance = this;
        } else {
            return Network.instance;
        }
    }

    static handleSuccessRequest(request) {
        if(localStorage.getItem("authorization")) {
            request.headers.authorization = `Bearer ${localStorage.getItem("authorization")}`;
        }
        return request;
    }

    static handleErrorRequest(response) {
        return response;
    }

    get(path) {
        return this.service
            .get(path)
            .then(response => response)
            .catch(error => Promise.reject(error));
    }

    post(path, payload) {
        return this.service
            .request({
                method: "POST",
                url: path,
                data: payload ? JSON.stringify(payload) : {},
            })
            .then(response => response)
            .catch(error => Promise.reject(error));
    }

}

const instance = new Network();

Object.freeze(instance);

export default instance;
