import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Error } from '../../models/error';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import { Angular2TokenService } from 'angular2-token';
import { Category} from '../../models/category';

@Component({    
    selector: 'app-admin-category',
    templateUrl: 'adminCategory.component.html',
    styleUrls: ['../../app.component.css']
})

export class AdminCategoryComponent implements OnInit{
    categories: Category[] = new Array;
    category: Category; 
    id: number;
    empty: boolean = false;
    errorCategory: boolean = false;
    emptyCategory: boolean = false;
    successfull: boolean = false;
    ngOnInit() {
        // initialize model here
        this.category = {
            id: -1,
            title: '',
            description: ''
        }
    }

    constructor(private router: Router, private _tokenService: Angular2TokenService) {
        this._tokenService.init({
            apiPath: "http://localhost:3000",
            signOutPath: 'admin_auth/sign_out',
            validateTokenPath:   'admin_auth/validate_token',
        });
        this._tokenService.validateToken().subscribe(
            res =>     {
             console.log(res);
            },
            error =>    console.log(error)
        );
        this._tokenService.get('/categories').subscribe(
            (res) => {
               res.json().forEach(element => {
                   this.categories.push(new Category(element.id, element.naziv, element.opis));
               });
                if(this.categories.length == 0)
                    this.empty = true;
            },
            (er) => console.log(er)
        )
    }

    create(category: Category){
        if(category.title == null || category.title == ''){
            this.emptyCategory = true;
            return;
        }
        this._tokenService.post('/categories', { 
            naziv: category.title,
            opis: category.description
        }).subscribe(
            (data) => {
                var el = data.json();
                this.categories.push(new Category(el.id, el.naziv, el.opis));
                this.empty = false;
                this.errorCategory = false;
                this.emptyCategory = false;
                this.successfull = true;
            },
            (err) => { this.errorCategory = true; }
        )
    }

    delete(category: Category){
        this._tokenService.delete("/categories/"+category.id, {})
                          .subscribe(data => this.category = data.json());
            
        var index = this.categories.indexOf(category, 0);
        if (index > -1) {
            this.categories.splice(index, 1);
        }
    }

    setCurrent(category: Category){
        this.category = category;
    }

    editCategory(category: Category){
        this.router.navigate(['/admin_dashboard/category', category.id]);
    }

    resetCurrent(){
        this.category = {
            id: -1,
            title: '',
            description: ''
        };
    }
}