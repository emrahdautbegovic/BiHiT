import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';
import { Suggestion} from '../../models/suggestion';
declare var jQuery:any;

@Component({
  selector: 'app-sugestions',
  templateUrl: 'suggestion.component.html',
  styleUrls: ['../../app.component.css']
})

export class SuggestionsComponent {
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
            apiPath: "http://localhost:3000"
        });
        this._tokenService.validateToken().subscribe(
            res =>     {
             console.log(res);
            },
            error =>    console.log(error)
        );

        this._tokenService.get('/user_suggestions').subscribe(
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

    create(suggestion: Suggestion){
        if(suggestion.title == null || suggestion.title == ''){
            this.emptySuggestion = true;
            return;
        }
        this._tokenService.post('/user_suggestions', { 
            title: suggestion.title
        }).subscribe(
            (data) => {
                var el = data.json();
                this.suggestions.push(new Suggestion(el.id, el.title, el.email, el.created_at));
                this.empty = false;
                this.errorSuggestion = false;
                this.emptySuggestion = false;
                this.successfull = true;
                jQuery("#addSuggestion").modal("hide");
            },
            (err) => { this.errorSuggestion = true; }
        )
    }

    resetCurrent(){
         this.suggestion = {
            id: -1,
            title: '',
            email: '',
            createdAt: ''
        }
    }
}
