import { Autor } from './autor';

export class Answer {
    id: number;
    title: string;
    user_id: number;
    created_at: string;
    question_id: number;
    autor: Autor;

    constructor(id: number, title: string, user_id: number, createdAt: string, question_id: number, autor: Autor)
    {
        this.id = id;
        this.title = title;
        this.user_id = user_id;
        this.created_at = createdAt;
        this.question_id = question_id;
        this.autor = autor;
    }   
}