interface ArticleType {
    tag_id: number;
    dept_id: string;
    user_id: number;
    title: string;
    create_date: Date | null;
    modified_date: Date | null;
    id: number;
    status: number;
}

interface TagType {
    id: number;
    label: string;
    user_id: number;
    status: number;
    dept_id: number;
    create_date: Date;
    modified_date: Date;
}

interface FileUploadResponseType {
    message: string;
    payload: {
        file_id: number;
        file_idnt_id: string;
        file_nm: string;
        thum_img_path: string;
        img_path: string;
        file_size: string;
        file_article_id: string;
        status: number;
    };
    status: number;
    date: string;
}
