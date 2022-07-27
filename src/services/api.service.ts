import axios, { AxiosError } from "axios";
import { useAuthStore } from "../stores/auth.store";


axios.defaults.baseURL = 'http://localhost:8080/api/v1';


function defaultRejectHandler(error: any): Promise<never> {
    if (!axios.isAxiosError(error)) {
        let axiosError = new AxiosError(error as string);
        return Promise.reject(axiosError);
    }
    switch (error.code) {
        case AxiosError.ERR_NETWORK:
            error.message = 'Server is not working right now';
            break;
        case AxiosError.ECONNABORTED:
            error.message = 'Request was aborted';
            break;
        case AxiosError.ETIMEDOUT:
            error.message = 'Waiting for response took too much time';
    }
    switch (error.response?.status) {
        case 400:
            error.message = 'Bad request';
            break;
        case 401:
            error.message = 'User is not authorized';
            break;
        case 500:
            error.message = 'Internal server error';
    }
    return Promise.reject(error);
}


const API = axios.create({
    timeout: 5000
});
API.interceptors.response.use(response => response, defaultRejectHandler);


const sessionAPI = axios.create({
    timeout: 10000
});
sessionAPI.interceptors.request.use(async config => {
    const auth = useAuthStore();

    if (!auth.isFresh) await auth.refresh().catch(e => {
        if (e.response.status < 500) auth.logout(); // error response & not internal server error response
        throw new axios.Cancel('Unable to refresh tokens. Operation canceled');
    });

    config.headers = {
        'Authorization': `Bearer ${auth.session.access_token}`
    };
    return config;
});
sessionAPI.interceptors.response.use(response => response, defaultRejectHandler);


export { API, sessionAPI }
