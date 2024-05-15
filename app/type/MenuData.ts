export interface Article {
    id: number;
    content_body: string;
    dept_id: string;
    isfavorite: string;
    file_article_id: string;
    modified_date: string | null;
    created_by: string | null;
    user_id: number;
    create_date: string;
    modified_by: string | null;
    title: string;
    tag_title: string;
    tag_id: number;
    status: number;
}

export interface Favorite {
    id : number;
    article_id : number;
    dept_id : number;
    user_id : string;
}

export interface Tag {
    id: number;
    title: string;
    dep_id: string;
}

export interface MenuData {
    ARTICLES: Article[];
    TAGS: Tag[];
    FAVORITE: Favorite[];
}
