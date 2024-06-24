import ihttp from "../utils/xhttp";

export const ListAllFormName = async (status: number,user_name:string) => {
    try {
        const response = await ihttp.get(`/form/getBy?status=${status}&username=${user_name}`);
        return response;
    } catch (error) {
        return error;
    }
}

export const AddForm = async () => {
    try {
        const response = await ihttp.post(`/form/create`);
        return response;
    } catch (error) {
        return error;
    }
}

export const UpdateForm = async (id:number,content:string) => {
    try {
        const response = await ihttp.put(`/form/modify?id=${id}&content=${content}`);
        return response;
    } catch (error) {
        return error;
    }
}

export const DeleteForm = async (id:number) => {
    try {
        const response = await ihttp.delete(`form/delete?id=${id}`);
        return response;
    } catch (error) {
        return error;
    }
}

