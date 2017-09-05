import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';
import { Question } from '../../models/question';
declare var jQuery:any;

@Component({
  selector: 'app-question',
  templateUrl: 'question.component.html',
  styleUrls: ['../../app.component.css']
})

export class QuestionsComponent {
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
            apiPath: "http://localhost:3000"
        });
        this._tokenService.validateToken().subscribe(
            res =>     {
             console.log(res);
            },
            error =>    console.log(error)
        );

        this._tokenService.get('questions').subscribe(
            (res) => {
            console.log(res);
               res.json().forEach(element => {
                   console.log(res)
                   this.questions.push(new Question(element.id, element.title, element.email, element.created_at));
               });
                if(this.questions.length == 0)
                    this.empty = true;
            },
            (er) => console.log(er)
        )
    }

    create(question: Question){
        if(question.title == null || question.title == ''){
            this.emptyQuestion = true;
            console.log('ne radi');
            return;
        }
        this._tokenService.post('questions', { 
            title: question.title
        }).subscribe(
            (data) => {
                console.log('radiii');
                var el = data.json();
                console.log(el);
                this.questions.push(new Question(el.id, el.title, el.email, el.created_at));
                this.empty = false;
                this.errorQuestion = false;
                this.emptyQuestion = false;
                this.successfull = true;
                jQuery("#addQuestion").modal("hide");
            },
            (err) => { this.errorQuestion = true; }
        )
    }

    details(question_id: number){
         this.router.navigate(['/dashboard/questions', question_id]);
    }

    resetCurrent(){
         this.question = {
            id: -1,
            title: '',
            email: '',
            createdAt: ''
        }
    }
}
