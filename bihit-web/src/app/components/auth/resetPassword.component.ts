import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Error } from '../../models/error';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Angular2TokenService } from 'angular2-token';

@Component({    
    selector: 'app-reset_password',
    templateUrl: 'resetPassword.component.html',
    styleUrls: ['../../app.component.css']
})

export class ResetPasswordComponent implements OnInit{
    public user: User;
    data: User;
    error: Error = {
        exists: true,
        message: ''
    }
    submitted: boolean = false;
    ngOnInit() {
        // initialize model here
        this.user = {
            nickname: '',
            email: '',
            password: '',
            password_confirmation: ''
        }
    }

    constructor(private router: Router, private _tokenService: Angular2TokenService) {
         this._tokenService.init({
            apiPath: "http://localhost:3000",
            updatePasswordPath:         'auth/password',
            globalOptions: {
                headers: {
                    'Content-Type':     'application/json',
                    'Accept':           'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000'
                }
            }
        });
    }

    resetPassword(user: User) {
        this._tokenService.updatePassword({
            password:             user.password,
            passwordConfirmation: user.password_confirmation
        }).subscribe(
            res =>      { 
                localStorage.setItem('reset', 'true');
                this.router.navigateByUrl('/home/login');
            },
            error =>    {
                console.log("nece");
                localStorage.setItem('reset', 'false');
                this.error.exists = true;
                this.submitted = true;
                this.error.message = "Greska na serveru. Molimo pokusajte kasnije";
        });
    }
}