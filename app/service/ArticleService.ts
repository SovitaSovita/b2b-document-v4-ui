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

export const ListArticleByDept_ID =async (dept_id:number) => {
    try {
        const response = await ihttp.post(`/articles/list?dept_id=${dept_id}`);
        console.log(response);
        return response;
    } catch (error) {
        return error;
    }
}

export const AddArticleBy =async (dept_id:number,title:string,content_body:string,file_article_id:string,status:number) => {
    try {
        const response = await ihttp.post(`/articles/add?dept_id,title,content_body,file_article_id,status=${dept_id}`);
        console.log(response);
        return response;
    } catch (error) {
        return error;
    }
}

