import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { API_BASE_URL } from "./xhttp";

const baseURL = API_BASE_URL;
const ihttpFile = axios.create({
    baseURL,
})

async function requestInterceptor(config: InternalAxiosRequestConfig) {
    config.headers["Content-Type"] = "multipart/form-data";
    return config;
}

async function responseInterceptor(value: AxiosResponse<any, any>) {
    return value
}

async function responseErrorInterceptor({ status, code, ...err }: AxiosError) {
    const isNotWorkError = code == "ERR_NETWORK"
    return Promise.reject({ ...err, status, code });
}
ihttpFile.interceptors.request.use(requestInterceptor);
ihttpFile.interceptors.response.use(responseInterceptor, responseErrorInterceptor)
export default ihttpFile