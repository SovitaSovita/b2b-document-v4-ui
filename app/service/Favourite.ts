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

// Check is favorite
export const checkIsFavorite = async (user_id: string, article_id: number, dept_id: number) => {
    try {
        // const response = await ihttp.get(`favorite/check_if_favorite?user_id=${user_id}`);
        const response = await ihttp.get(`favorite/check_if_favorite?user_id=${user_id}&article_id=${article_id}&dept_id=${dept_id}`);
        return response.data.rec;
    } catch (error) {
        return error;
    }
}