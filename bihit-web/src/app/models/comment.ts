import { Autor } from './autor';

export class Comment {
    id: number;
    tekst: string;
    autor_id: number;
    created_at: string;
    autor: Autor;
    post_id: number
    constructor(id: number, tekst: string, autor_id: number, created_at: string, autor: Autor, post_id: number){
        this.id = id;
        this.tekst = tekst;
        this.autor_id = autor_id;
        this.created_at = created_at;
        this.autor = autor;
        this.post_id = post_id;
    }
}