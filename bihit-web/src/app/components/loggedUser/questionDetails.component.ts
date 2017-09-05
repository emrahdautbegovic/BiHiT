import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';
import { Question } from '../../models/question';
import { Answer } from '../../models/answer';
import { Autor } from '../../models/autor';
declare var jQuery:any;

@Component({
  selector: 'app-question-details',
  templateUrl: 'questionDetails.component.html',
  styleUrls: ['../../app.component.css']
})

export class QuestionDetailsComponent {
    title = 'BiHiT';
    answer: Answer;
    answers: Answer[] = new Array;
    question: Question;
    questionId: number;
    
    ngOnInit() {
      this.question = {
          id: null,
          title: '',
          email: '',
          createdAt: ''
      }

      this.answer = {
          id: null,
          title: '',
          question_id: null,
          user_id: null,
          autor: null,
          created_at: ''
      }
    }
   constructor(private route: ActivatedRoute, private router: Router, private _tokenService: Angular2TokenService) {
        this._tokenService.init({
            apiPath: "http://localhost:3000"
        });
        this._tokenService.validateToken().subscribe(
            res =>     {
             console.log(res);
            },
            error =>    console.log(error)
        );
        this.route.params.subscribe(params => {
             this.questionId = +params['id'];
        });
        this._tokenService.get('questions/'+this.questionId).subscribe(
            (data) => {
                console.log(data)
                var q = data.json();
                this.question = new Question(q.id, q.title, q.email, q.created_at);
            },
            (error) => {
                console.log(error)
            }
        )
        this._tokenService.get('answers?question_id='+this.questionId).subscribe(
            (data) => {
                var a = data.json();
                a.forEach(e => {
                    this._tokenService.get('users/'+e.user_id).subscribe(
                        (res)=>{
                            var user = res.json();
                            this.answers.push(new Answer(e.id, e.title, e.user_id, 
                                                        e.created_at, e.question_id, 
                                                        new Autor(user.id,user.email)));
                        },
                        (err) => console.log(err)
                    )
                });      
            },
            (error) => console.log(error)
        )
    }

    create(answer: Answer){
        this._tokenService.post('answers', {
           title: answer.title,
           question_id: this.questionId,
           user_id: this._tokenService.currentUserData.id
        }).subscribe(
            (data) => {
                var a = data.json();
                this._tokenService.get('users/'+a.user_id).subscribe(
                    (res)=>{
                        var user = res.json();
                        this.answers.push(new Answer(a.id, a.title, a.user_id, 
                                                     a.created_at, a.question_id, 
                                                     new Autor(user.id,user.email)));
                    },
                    (err) => console.log(err)
                )
            },
            (error) => console.log(error)
        )
    }
}
