import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Error } from '../../models/error';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Angular2TokenService } from 'angular2-token';

@Component({    
    selector: 'app-password',
    templateUrl: 'password.component.html',
    styleUrls: ['../../app.component.css']
})

export class PasswordComponent implements OnInit{
    public user: User;
    data: User;
    error: Error = {
        exists: true,
        message: ''
    }
    reguestSent: boolean = false;
    ngOnInit() {
        // initialize model here
        this.user = {
            nickname: '',
            email: '',
            password: '',
            password_confirmation: ''
        }
    }
    submitted: boolean = false;
    constructor(private router: Router, private _tokenService: Angular2TokenService) {
        this._tokenService.init({
            apiPath: "http://localhost:3000",
            resetPasswordCallback:   "http://localhost:4200/home/reset_password",
            globalOptions: {
                headers: {
                    'Content-Type':     'application/json',
                    'Accept':           'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000'
                }
            }
        });
    }

    resetPasswordRequest(user: User) {
        this._tokenService.resetPassword({
            email: user.email,
        }).subscribe(
            res =>    { 
                console.log(res);
                this.error.exists = false;  
                this.reguestSent = true;
            },
            error =>   {
                console.log(JSON.parse(error.status));
                this.error.exists = true;
                this.submitted = true;
                this.reguestSent = false;
                if(error.status = 401)
                    this.error.message = "Unijeli ste nepostojecu email adresu";
                else
                    this.error.message = "Greska na serveru, molimo pokusajte kasnije";
            });
    }
}