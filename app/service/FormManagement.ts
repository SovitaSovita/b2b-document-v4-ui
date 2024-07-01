import ihttp from "../utils/xhttp";

export const ListAllFormName = async (req: object) => {
    try {
        const response = await ihttp.post(`/form/getBy`, req);
        return response;
    } catch (error) {
        return error;
    }
}

export const AddForm = async () => {
    try {
        const response = await ihttp.post(`form/create`);
        return response;
    } catch (error) {
        return error;
    }
}

export const UpdateForm = async (id:number,content:string) => {
    try {
        const response = await ihttp.put(`form/modify?id=${id}&content=${content}`);
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
// List all approvals
export const listApproved = async (userId: string) => {
    try {
        const { data } = await ihttp.get(`requestform/listApproved?userId=${userId}`);
        return data;
    } catch (error) {
        console.error('Error fetching approved list:', error);
        throw new Error('Failed to fetch approved list');
    }
}
export const getFormDetail = async (formId: number) => {
    try {
        const { data } = await ihttp.get(`form/getDetail?id=${formId}`);
        return data;
    } catch (error) {
        throw new Error('Failed to fetch approved list');
    }
}

