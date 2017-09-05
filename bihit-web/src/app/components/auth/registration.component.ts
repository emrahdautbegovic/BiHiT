import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Error } from '../../models/error';
import { Angular2TokenService } from 'angular2-token';

@Component({    
    selector: 'app-registration',
    templateUrl: 'registration.component.html',
    styleUrls: ['../../app.component.css']
})

export class UserComponent implements OnInit{

    public user: User;
    data: User;
    error: Error = {
        exists: true,
        message: ''
    }
    submitted: boolean = false;
    registered: boolean = false;
    constructor(private router: Router, private _tokenService: Angular2TokenService) {
        this._tokenService.init({
            apiPath: "http://localhost:3000",
            registerAccountCallback:   "http://localhost:4200/home/login",
            globalOptions: {
                headers: {
                    'Content-Type':     'application/json',
                    'Accept':           'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000'
                }
            }
        });
    }
    ngOnInit() {
        // initialize model here
        this.user = {
            nickname: '',
            email: '',
            password: '',
            password_confirmation: ''
        }
    }

    create(user: User) {
        this._tokenService.registerAccount({
            email:                this.user.email,
            password:             this.user.password,
            passwordConfirmation: this.user.password_confirmation,
        }).subscribe(
            res =>      { 
                this.error.exists = false;
                this.submitted = false;
                this.registered = true;
                localStorage.setItem('register', 'true');
            },
            error =>    {
                this.error.exists = true;
                this.submitted = true;
                localStorage.setItem('register', 'false');
                if(error.status = 401)
                    this.error.message = "Zao nam je, korisnik sa istom email adresom postoji";
                else
                    this.error.message = "Greska na serveru, molimo pokusajte kasnije"; 
         });
    }
}