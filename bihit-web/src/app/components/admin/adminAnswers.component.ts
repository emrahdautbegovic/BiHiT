import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';
import { Answer } from '../../models/answer';
import { Autor } from '../../models/autor';

@Component({
  selector: 'app-admin-answers',
  templateUrl: 'adminAnswers.component.html',
  styleUrls: ['../../app.component.css']
})

export class AdminAnswersComponent {
    title = 'BiHiT';
    empty: boolean = false;
    answers: Answer[] = new Array;
    answer: Answer; 
    successfull: boolean = false;
    ngOnInit() {
        // initialize model here
        this.answer = {
            id: -1,
            title: '',
            user_id: null,
            created_at: '',
            question_id: null,
            autor: null
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

        this._tokenService.get('admin_answers').subscribe(
            (res) => {
               res.json().forEach(element => {
                  this._tokenService.get('adminusers/'+element.user_id).subscribe(
                     (data) => {  
                       console.log(data);
                       var aut = data.json();
                       this.answers.push(new Answer(element.id, element.title, element.user_id, element.created_at, element.question_id, new Autor(aut.id, aut.email)));
                     },
                     (error) => { console.log(error) }
                    )
                });
            },
            (er) => console.log(er)
        )
    }

    delete(answer: Answer){
        this._tokenService.delete("admin_answers/"+answer.id, {})
                          .subscribe(data => this.answer = data.json());
            
        var index = this.answers.indexOf(answer, 0);
        if (index > -1) {
            this.answers.splice(index, 1);
        }
    }

     setAnswer(answer: Answer){
        this.answer = answer;
    }
}
