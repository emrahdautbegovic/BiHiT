import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.component.html',
  styleUrls: ['../../app.component.css']
})

export class SettingsComponent {
   title = 'BiHiT';

   constructor(private router: Router, private _tokenService: Angular2TokenService) {
        this._tokenService.init({
            apiPath: "http://localhost:3000"
        });
        this._tokenService.validateToken().subscribe(
            res =>     {
             console.log(res);
            },
            error =>    console.log(error)
        );
    }
}
