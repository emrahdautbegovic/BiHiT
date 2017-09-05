import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';
import { Suggestion} from '../../models/suggestion';

@Component({
  selector: 'app-admin-sugestions',
  templateUrl: 'adminSuggestion.component.html',
  styleUrls: ['../../app.component.css']
})

export class AdminSuggestionsComponent {
    title = 'BiHiT';
    empty: boolean = false;
    suggestions: Suggestion[] = new Array;
    suggestion: Suggestion; 
    emptySuggestion: boolean = false;
    errorSuggestion: boolean = false;
    successfull: boolean = false;
    ngOnInit() {
        // initialize model here
        this.suggestion = {
            id: -1,
            title: '',
            email: '',
            createdAt: ''
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

        this._tokenService.get('/suggestions').subscribe(
            (res) => {
                console.log(res);
               res.json().forEach(element => {
                   this.suggestions.push(new Suggestion(element.id, element.title, element.email, element.created_at));
               });
                if(this.suggestions.length == 0)
                    this.empty = true;
            },
            (er) => console.log(er)
        )
    }

    delete(suggestion: Suggestion){
        this._tokenService.delete("/suggestions/"+suggestion.id, {})
                          .subscribe(data => this.suggestion = data.json());
            
        var index = this.suggestions.indexOf(suggestion, 0);
        if (index > -1) {
            this.suggestions.splice(index, 1);
        }
    }

     setSuggestion(suggestion: Suggestion){
        this.suggestion = suggestion;
    }
}
