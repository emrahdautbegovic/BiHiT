import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';
import { Question } from '../../models/question';

@Component({
  selector: 'app-admin-questions',
  templateUrl: 'adminQuestions.component.html',
  styleUrls: ['../../app.component.css']
})

export class AdminQuestionsComponent {
    title = 'BiHiT';
    empty: boolean = false;
    questions: Question[] = new Array;
    question: Question; 
    emptyQuestion: boolean = false;
    errorQuestion: boolean = false;
    successfull: boolean = false;
    ngOnInit() {
        // initialize model here
        this.question = {
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

        this._tokenService.get('admin_questions').subscribe(
            (res) => {
                console.log(res);
               res.json().forEach(element => {
                   this.questions.push(new Question(element.id, element.title, element.email, element.created_at));
                   console.log("ide");
               });
                if(this.questions.length == 0)
                    this.empty = true;
            },
            (er) => console.log(er)
        )
    }

    delete(question: Question){
        this._tokenService.delete("admin_questions/"+question.id, {})
                          .subscribe(data => this.question = data.json());
            
        var index = this.questions.indexOf(question, 0);
        if (index > -1) {
            this.questions.splice(index, 1);
        }
    }

     setQuestion(question: Question){
        this.question = question;
        console.log("question id: "+ this.question.id);
    }
}
