import ihttp from "../utils/xhttp";

// List favorite
export const getFavoriteService = async (user_id: string) => {
    try {
        const response = await ihttp.get(`/favorite/favorite?user_id=${user_id}`);
        return response.data?.rec;
    } catch (error) {
        return error;
    }
}

export const getFavoriteDetail = async (user_id: string) => {
    try {
        const response = await ihttp.get(`/favorite/favorite?user_id=${user_id}`);
        return response.data?.rec;
    } catch (error) {
        return error;
    }
}

// Check is favorite
export const checkIsFavorite = async (user_id: string, article_id: number, dept_id: string) => {
    try {
        // const response = await ihttp.get(`favorite/check_if_favorite?user_id=${user_id}`);
        const response = await ihttp.get(`/favorite/check_if_favorite?user_id=${user_id}&article_id=${article_id}&dept_id=${dept_id}`);
        return response.data.rec;
    } catch (error) {
        return error;
    }
}

// Add
export const addToFavorite = async (req: object) => {
    try {
        const response = await ihttp.post(`/favorite/add_favorite`, req);
        return response.data;
    } catch (error) {
        return error;
    }
}

// Delete
export const deleteFavorite = async (req: object) => {
    try {

        const response = await ihttp.post(`/favorite/delete_favorite`, req);
        return response.data;
    } catch (error) {
        return error;
    }
}