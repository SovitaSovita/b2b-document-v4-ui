import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { getSession } from "next-auth/react";

//our API URL
//export const API_BASE_URL = "http://localhost:4545/api/v1";
export const API_BASE_URL = "http://192.168.178.239:4545/api/v1"; //api yg

//export const API_BASE_URL = "http://192.168.178.72:4545/api/v1";
//UI URL
export const UI_BASE_URL = "http://localhost:3000";
//api managament URL
export const API_M_BASE_URL = "http://192.168.178.239:8085";

const ihttp = axios.create({
  baseURL: API_BASE_URL,
});

async function requestInterceptor(config: InternalAxiosRequestConfig) {

  const idToken: any = await getSession();
  if (!idToken) {
    return Promise.reject("missing access token");
  }
  config.headers["Authorization"] = `Bearer ${idToken?.token}`;
  config.headers["Content-Type"] = "application/json";
  return config;
}

async function responseInterceptor(value: AxiosResponse<any, any>) {
  return value;
}

async function responseErrorInterceptor({ status, code, ...err }: AxiosError) {
  const isNotWorkError = code == "ERR_NETWORK"; //ERR_CONNECTION_REFUSED
  if (isNotWorkError) {
    try {
      //
      window.location.pathname = "/error"
    } catch {
      /** in case called from server ignore client side function*/
    }
  }
  return Promise.reject({ ...err, status, code });
}

ihttp.interceptors.request.use(requestInterceptor);
ihttp.interceptors.response.use(responseInterceptor, responseErrorInterceptor);
export default ihttp;
