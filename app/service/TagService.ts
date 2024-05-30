import ihttp from "../utils/xhttp";

export const SaveNewTag = async (request: object) => {
    try {
        const response = await ihttp.post(`/DocTag/saveTagTitle`, request);
        return response;
    } catch (error) {
        return error;
    }
}

export const GetTagAndArticle = async (dep_id: number, status: number) => {
    console.log("dep_id"+dep_id)
    try {
        const response = await ihttp.get(`/DocTag/listTagAndAtricle?dept_id=${dep_id}&status=${status}`); //&username=sovita
        return response;
    } catch (error) {
        return error;
    }
}

// Test
// export const GetTagAndArticle = async (dep_id: number, status: number, username: string) => {
//     try {
//         const response = await ihttp.get(`/DocTag/listTagAndAtricle?dept_id=${dep_id}&status=${status}&username=${username}`); //&username=sovita
//         return response;
//     } catch (error) {
//         return error;
//     }
// }

// Test new


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
