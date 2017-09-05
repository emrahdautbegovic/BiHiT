export class Subcategory {
    id: number;
    title: string;
    category_id: number;

    constructor(id: number, title: string, category_id: number)
    {
        this.id = id;
        this.title = title;
        this.category_id = category_id;
    }   
}