import { Autor } from './autor';
export class Post {
    id: number;
    title: string;
    short: string;
    long: string;
    user_id: number;
    subcategory_id: number;
    createdAt: string;
    autor: Autor;
    likes: number;
    comments: number;

    constructor(id: number, title: string, short: string, long: string,
                createdAt: string, user_id: number, subcategory_id: number, autor: Autor, likes: number, comments: number)
    {
        this.id = id;
        this.title = title;
        this.createdAt = createdAt;
        this.short = short;
        this.long = long;
        this.user_id = user_id;
        this.subcategory_id = subcategory_id;
        this.autor = autor;
        this.likes = likes;
        this.comments = comments;
    }   
}