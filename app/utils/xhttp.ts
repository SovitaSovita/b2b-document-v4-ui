import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

// Our API URL
// Localhost
 //export const API_BASE_URL = "http://localhost:4545/api/v1"

// API sak
export const API_BASE_URL = "http://192.168.178.239:4545/api/v1";

// export const API_BASE_URL = "http://178.128.52.39:4545/api/v1"; // api yg

// export const API_BASE_URL = "http://192.168.178.72:4545/api/v1";
// UI URL
export const UI_BASE_URL = "http://localhost:3000";
// api managament URL
export const API_M_BASE_URL = "http://192.168.178.239:8085";

const ihttp = axios.create({
  baseURL: API_BASE_URL,
});

export const API_URL = process.env.API_URL;
export const KEY = "XgIjrPEXEDoosHdWkN6b1ou3h+gE/xZyjd7AVjkATt8=";
// export const KEY = process.env.KEY;

let session:any = '';
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
    const res = await fetch(`${API_M_BASE_URL}/api/v1/session?token=${encodeURIComponent(token!)}&key=${encodeURIComponent(KEY!)}`, { headers });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    session = data.payload;
    localStorage.setItem("tid", session?.token);
    return session;
  } catch (e) {
    console.error("Error: ", e);
    throw e;
  }
}

(async () => {
  await getSession();
})();



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
  const isNotWorkError = code == "ERR_NETWORK"; // ERR_CONNECTION_REFUSED
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
