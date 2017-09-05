import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: 'adminDashboard.component.html',
  styleUrls: ['../../app.component.css']
})

export class AdminDashboardComponent {
  title = 'BiHiT';
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
  }

  logout() {
        this._tokenService.signOut().subscribe(
            res =>      {
              console.log("Successfully logged out");
              this.router.navigateByUrl('/home');
            },
            error =>   {
                console.log(error);
            } 
        );
    }
}
