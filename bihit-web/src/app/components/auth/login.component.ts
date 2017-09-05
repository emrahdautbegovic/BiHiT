import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Error } from '../../models/error';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import { Angular2TokenService } from 'angular2-token';


@Component({    
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['../../app.component.css']
})

export class LoginComponent implements OnInit{
    public user: User;
    data: User;
    error: Error = {
        exists: true,
        message: ''
    }
    submitted: boolean = false;
    register: boolean = false;
    reset: boolean = false;

    ngOnInit() {
        this.user = {
            nickname: '',
            email: '',
            password: '',
            password_confirmation: ''
        }
        if(localStorage.getItem('reset')==='true') this.reset = true;
        if(localStorage.getItem('register')==='true') this.register = true;
        localStorage.setItem('reset', 'false');
        localStorage.setItem('register', 'false');
    }
    
    constructor(private router: Router, private _tokenService: Angular2TokenService) {
        this._tokenService.init({
            apiPath: "http://localhost:3000"
        });
    }

    login(user: User) {
        this._tokenService.signIn({
            email:    user.email,
            password: user.password
        }).subscribe(
            res =>    { 
                this.error.exists = false; 
                this.reset = false;
                this.register = false; 
                this.router.navigateByUrl('/dashboard');
            },
            error =>   {
                this.error.exists = true;
                this.submitted = true;
                if(error.status = 401)
                    this.error.message = "Email ili password nisu ispravni";
                else
                    this.error.message = "Greska na serveru, molimo pokusajte kasnije";
        });
    }
}