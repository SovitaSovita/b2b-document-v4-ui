import ihttp from "../utils/xhttp";

export const SaveNewTag = async (request: object) => {
    try {
        const response = await ihttp.post(`/DocTag/saveTagTitle`, request);
        return response;
    } catch (error) {
        return error;
    }
}
export const UpdateTag = async (request: object) => {
    try {
        const response = await ihttp.post(`DocTag/updateTag` , request)
        return response;
    }catch(error){
        return error;
    }
}