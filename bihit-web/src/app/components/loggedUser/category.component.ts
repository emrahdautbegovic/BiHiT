import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Error } from '../../models/error';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import { Angular2TokenService } from 'angular2-token';
import { Category} from '../../models/category';
import { Subcategory } from '../../models/subcategory';

@Component({    
    selector: 'app-category',
    templateUrl: 'category.component.html',
    styleUrls: ['../../app.component.css']
})

export class CategoryComponent{
    categories: Category[] = new Array;
    subcategories: Subcategory[] = new Array;
    empty: boolean = false;
  
    constructor(private router: Router, private _tokenService: Angular2TokenService) {
        this._tokenService.init({
            apiPath: "http://localhost:3000"
        });
        this._tokenService.validateToken().subscribe(
            res =>     {
            //  console.log(res);
            },
            error =>    console.log(error)
        );
        this._tokenService.get('/usersubcategories').subscribe(
            (data) => {
                data.json().forEach(subcat => {
                   this.subcategories.push(new Subcategory(subcat.id, subcat.title, subcat.category_id));
                })
                console.log(this.subcategories);
            },
            (err) => { console.log(err) }
        )
        this._tokenService.get('/usercategories').subscribe(
            (res) => {
               res.json().forEach(element => {
                   this.categories.push(new Category(element.id, element.naziv, element.opis));
               });
               if(this.categories.length == 0){
                    this.empty = true;
               }
            },
            (er) => console.log(er)
        )     
    }

    showPosts(sub_id: number){
        this.router.navigate(['/dashboard/subcategory', sub_id]);
    }
}