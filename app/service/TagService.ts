import ihttp from "../utils/xhttp";

export const SaveNewTag = async (request: object) => {
    try {
        const response = await ihttp.post(`/DocTag/saveTagTitle`, request);
        return response;
    } catch (error) {
        return error;
    }
}
export const GetTagAndArticle = async (dep_id: number) => {
    try {
        const response = await ihttp.get(`/DocTag/listTagAndAtricle?dept_id=${dep_id}`);
        return response;
    } catch (error) {
        return error;
    }
}


export const UpdateTag = async (request: object) => {
    try {
        const response = await ihttp.post(`DocTag/updateTag`, request)
        return response;
    } catch (error) {
        return error;
    }
}
export const DeleteTag = async (request: object) => {
    try {
        const response = await ihttp.post(`DocTag/deleteTag`, request)
        return response;
    } catch (error) {
        return error;
    }
}