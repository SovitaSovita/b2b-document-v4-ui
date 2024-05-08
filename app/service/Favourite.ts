import ihttp from "../utils/xhttp";

// List favorite
export const getFavorite = async (user_id: string) => {
    try {
        const response = await ihttp.get(`/favorite/favorite?user_id=${user_id}`);
        return response.data?.rec;
    } catch (error) {
        return error;
    }
}