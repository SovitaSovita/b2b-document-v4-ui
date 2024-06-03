import xhttpClient from "../utils/xhttpClient";

export const GeminiGetContentResponse = async (request: object) => {
    try {
        const response = await xhttpClient.post(`/v1beta/models/gemini-pro:generateContent?key=AIzaSyCDk53XzEsLjxuJ_DpbhjmkEZhoUeioHYw`, request);
        return response.data;
    } catch (error) {
        return error;
    }
}
