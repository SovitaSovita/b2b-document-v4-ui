import axios, { AxiosError, AxiosResponse } from "axios";

const baseURL = process.env.NEXT_APIURLFILE;

const ihttpFile = axios.create({
    baseURL,
})

async function responseInterceptor(value: AxiosResponse<any, any>) {
    return value
}

async function responseErrorInterceptor({ status, code, ...err }: AxiosError) {
    const isNotWorkError = code == "ERR_NETWORK"
    return Promise.reject({ ...err, status, code });
}

ihttpFile.interceptors.response.use(responseInterceptor, responseErrorInterceptor)
export default ihttpFile