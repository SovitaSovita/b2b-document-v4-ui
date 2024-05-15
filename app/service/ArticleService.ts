import ihttp from "../utils/xhttp";


export const GetArticleById = async (id: number) => {
    try {
        const response = await ihttp.get(`/articles/listById?id=${id}`);
        console.log(response);
        return response;
    } catch (error) {
        return error;
    }
}

export const ListArticleByDept_ID = async (dept_id: number) => {
    try {
        const response = await ihttp.post(`/articles/list?dept_id=${dept_id}`);
        console.log(response);
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

export const UpdateArticle= async (request: object) => {
    try {
        const response = await ihttp.put(`/articles/updateArticle`, request)
        return response;
    } catch (error) {
        return error;
    }
}

