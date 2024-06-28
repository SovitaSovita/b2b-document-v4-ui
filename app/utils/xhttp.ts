import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { redirect } from "next/navigation";

export const KEY = process.env.KEY;
// UI URL
export const UI_BASE_URL = process.env.NEXT_URL
// our API URL
export const API_BASE_URL = process.env.NEXT_API_URL;
// api managament URL
export const API_M_BASE_URL = process.env.API_M_BASE_URL

const ihttp = axios.create({
  baseURL: API_BASE_URL,
});


let session: any = '';
let token: any;
let url;

if (typeof window !== "undefined") {
  url = new URL(window.location.href);
  token = url.searchParams.get("tid") || localStorage.getItem("tid");
}

// Get session from API
export async function getSession() {
  try {
    const headers = { 'Authorization': `Bearer ${token}` };
    const res = await fetch(`${API_M_BASE_URL}/session?token=${encodeURIComponent(token!)}&key=${encodeURIComponent(KEY!)}`, { headers });
    if (res.status == 401) {
      if (typeof window !== "undefined") {
        // window.location.href = "https://bizweb.kosign.dev/signin";
        alert("Access Denine")
      }
    }
    if (res.status == 500) {
      if (typeof window !== "undefined") {
        // window.location.href = "/error";
        console.log("res >>> ", res);
        alert("UnAuth")
      }
    }
    const data = await res.json();
    session = data.payload;
    localStorage.setItem("tid", session?.token);
    return session;
  } catch (e) {
    if (typeof window !== "undefined") {
      // window.location.href = "/error";
    }
  }
}

(async () => {
  await getSession();
})();



async function requestInterceptor(config: InternalAxiosRequestConfig) {

  const idToken: any = token
  // const idToken: any = await getSession();
  if (!idToken) {
    return Promise.reject("missing access token");
  }
  config.headers["Authorization"] = `Bearer ${token}`;
  config.headers["Content-Type"] = "application/json";
  return config;
}

async function responseInterceptor(value: AxiosResponse<any, any>) {
  return value;
}

async function responseErrorInterceptor({ status, code, ...err }: AxiosError) {
  const isNotWorkError = code == "ERR_NETWORK"; // ERR_CONNECTION_REFUSED
  if (isNotWorkError) {
    try {
      //
      // window.location.pathname = "/error"
    } catch {
      /** in case called from server ignore client side function*/
    }
  }
  return Promise.reject({ ...err, status, code });
}

ihttp.interceptors.request.use(requestInterceptor);
ihttp.interceptors.response.use(responseInterceptor, responseErrorInterceptor);
export default ihttp;
