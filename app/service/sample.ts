import ihttp from "../utils/xhttp";
import { API } from "./util";


export const sampleFetch = async () => {
    try {
        const response = await ihttp.get(`admin/welcome`);
        return response;
    } catch (error) {
        return error;
    }
}
