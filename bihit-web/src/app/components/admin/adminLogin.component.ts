import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Error } from '../../models/error';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import { Angular2TokenService } from 'angular2-token';


@Component({    
    selector: 'app-admin-login',
    templateUrl: 'adminLogin.component.html',
    styleUrls: ['../../app.component.css']
})

export class AdminLoginComponent implements OnInit{
    public user: User;
    data: User;
    error: Error = {
        exists: true,
        message: ''
    }
    submitted: boolean = false;

    ngOnInit() {
        this.user = {
            nickname: '',
            email: '',
            password: '',
            password_confirmation: ''
        }
    }
    
    constructor(private router: Router, private _tokenService: Angular2TokenService) {
        this._tokenService.init({
            apiPath:   "http://localhost:3000",
            signInPath:   "admin_auth/sign_in"
        });
    }

    login(user: User) {
        this._tokenService.signIn({
            email:    user.email,
            password: user.password
        }).subscribe(
            res =>    { 
                this.error.exists = false; 
                this.router.navigateByUrl('/admin_dashboard');
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