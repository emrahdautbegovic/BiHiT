export class Question {
    id: number;
    title: string;
    email: string;
    createdAt: string;

    constructor(id: number, title: string, email: string, createdAt: string)
    {
        this.id = id;
        this.title = title;
        this.email = email;
        this.createdAt = createdAt;
    }   
}