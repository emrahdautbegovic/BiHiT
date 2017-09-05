import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';
import { Suggestion} from '../../models/suggestion';
import { Category} from '../../models/category';
import { Subcategory } from '../../models/subcategory';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-category-details',
  templateUrl: 'categoryDetails.component.html',
  styleUrls: ['../../app.component.css']
})

export class CategoryDetailsComponent {
    title = 'BiHiT';
    category: Category;
    subcategory: Subcategory;
    subcategories: Subcategory[] = new Array;
    id: number;
    private sub: any;

    empty: boolean = false;
    errorCategory: boolean = false;
    emptyCategory: boolean = false;
    successfull: boolean = false;

    constructor(private route: ActivatedRoute, private router: Router, private _tokenService: Angular2TokenService) {}
      
    ngOnInit() {
        this.category = {
            id: null,
            title: '',
            description: ''
        }

        this.subcategory = {
            id: null,
            title: '',
            category_id: null
        }
      
        this._tokenService.init({
            apiPath: "http://localhost:3000",
            validateTokenPath:   'admin_auth/validate_token',
        });

        this._tokenService.validateToken().subscribe(
            res =>     {
            //  console.log(res);
            },
            error =>    console.log(error)
        );

        this.sub = this.route.params.subscribe(params => {
             this.id = +params['id'];
            // console.log(this.id+"   eto ga");
        });

        this._tokenService.get("/categories/"+this.id).subscribe(
            (res) => {
                var el = res.json();
                // console.log(el);
                this.category = new Category(el.id, el.naziv, el.opis);
                console.log(this.category);
            },
            (err) => { console.log(err) }
        )

        this._tokenService.get("/subcategories?category_id="+this.id).subscribe(
            (res) => {
                res.json().forEach(el => {
                   console.log(res);
                   this.subcategories.push(new Subcategory(el.id, el.title, el.category_id));
                });
                 if(this.subcategories.length == 0)
                    this.empty = true;
            },
            (err) => { console.log(err) }
        )
    }

    create(subcategory: Subcategory){
        if(subcategory.title == null || subcategory.title == ''){
            this.emptyCategory = true;
            return;
        }
        this._tokenService.post('/subcategories', { 
            title: subcategory.title,
            category_id: this.category.id
        }).subscribe(
            (data) => {
                var el = data.json();
                this.subcategories.push(new Subcategory(el.id, el.title, el.category_id));
                this.empty = false;
                this.errorCategory = false;
                this.emptyCategory = false;
                this.successfull = true;
            },
            (err) => { this.errorCategory = true; }
        )
    }

    reset(){
        this.subcategory = {
            id: null,
            title: '',
            category_id: null
        }
    }
}




  

        // this._tokenService.get('/suggestions').subscribe(
        //     (res) => {
        //         console.log(res);
        //          res.json().forEach(element => {
        //        });
        //     },
        //     (er) => console.log(er)
        // )
    // }