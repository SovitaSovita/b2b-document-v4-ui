import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { auth } from "../api/auth/[...nextauth]/option";

const baseURL = process.env.NEXT_APIURL;

const ihttpServer = axios.create({
    baseURL,
})

async function requestInterceptor(config: InternalAxiosRequestConfig) {
    const session: any = await auth();
    if (!session) {
        return Promise.reject("missing session");
    }
    config.headers["Authorization"] = `Bearer ${session?.token.access_token}`;
    config.headers["Content-Type"] = "application/json";
    return config
}

async function responseInterceptor(value: AxiosResponse<any, any>) {
    return value
}

async function responseErrorInterceptor({ status, code, ...err }: AxiosError) {
    return Promise.reject({ ...err, status, code });
}

ihttpServer.interceptors.request.use(requestInterceptor)
ihttpServer.interceptors.response.use(responseInterceptor, responseErrorInterceptor)
export default ihttpServer