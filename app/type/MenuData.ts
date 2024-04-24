export interface Article {
    id: number;
    tag_id: number;
    title: string;
    isfavorite: string;
}

export interface Tag {
    id: number;
    title: string;
    dep_id: string;
}

export interface MenuData {
    ARTICLES: Article[];
    TAGS: Tag[];
}
