import ihttp from "../utils/xhttp";
import ihttpFile from "../utils/xhttp-file";


export const getArticleDetail = async (id: string) => {
    try {
        const response = await ihttp.get(`/articles/listById?id=${id}`);
        return response.data.rec.rec.rec;
    } catch (error) {
        return error;
    }
}


export const ListArticleByDept_ID = async (dept_id: number) => {
    try {
        const response = await ihttp.post(`/articles/list?dept_id=${dept_id}`);
        return response;
    } catch (error) {
        return error;
    }
}

export const AddArticleBy = async (request: object) => {
    try {
        const response = await ihttp.post(`/articles/add`, request);
        console.log(response);
        return response;
    } catch (error) {
        return error;
    }
}



export const searchArticle = async (title: string) => {
    try {
        const response = await ihttp.get(`/articles/doc_search_r01?title=${title}`);
        return response.data?.rec;
    } catch (error) {
        return error;
    }
}

export const deleteArticle = async (articleId: number) => {
    try {
        const response = await ihttp.delete(`/articles/delete?articleId=${articleId}`);
        return response.data;
    } catch (error) {
        return error;
    }
}

export const UpdateArticle = async (input: object) => {
    try {
        const response = await ihttp.put(`/articles/updateArticle`, input)
        return response;
    } catch (error) {
        return error;
    }
}

export const Insert_file = async (input: object) => {
    try {
        const response = await ihttpFile.post(`/files/upload_file?articleId=266`, input)
        return response.data;
    } catch (error) {
        return error;
    }
}

