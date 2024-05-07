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

export const AddArticleBy = async (dept_id: number, title: string, content_body: string, file_article_id: string, status: number) => {
    try {
        const response = await ihttp.post(`/articles/add?dept_id,title,=${dept_id}`);
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