import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';
import { Category} from '../../models/category';
import { Subcategory } from '../../models/subcategory';
import { Post } from '../../models/post';
import { Comment } from '../../models/comment'; 
import { Like } from '../../models/like'; 
import { Question } from '../../models/question'; 

@Component({
  selector: 'app-dashboard-home',
  templateUrl: 'dashboardHome.component.html',
  styleUrls: ['../../app.component.css']
})

export class DashboardHomeComponent {
    title = 'BiHiT';
    posts: Post[] = new Array;
    questions: Question[] = new Array;
    questionsCopy: Question[] = new Array;
    postsCopy: Post[] = new Array;
    postFilter: string = '';
    questionFilter: string = '';
    constructor(private router: Router, private _tokenService: Angular2TokenService) {
        this._tokenService.init({
            apiPath: "http://localhost:3000",
            signOutPath: 'auth/sign_out',
            validateTokenPath:   'auth/validate_token',
        });
        this._tokenService.validateToken().subscribe(
            res =>     {
             console.log(res);
            },
            error =>    console.log(error)
        );
        this._tokenService.get('posts').subscribe(
            res =>     {
                console.log(res.json().length)
              res.json().forEach(p => {
                  this.posts.push(new Post(p.id, p.title, p.short, "", p.created_at, 0, 0, null, 0, 0));
              });
              this.postsCopy = this.posts;
            },
            error =>  console.log(error)
        );
        this._tokenService.get('questions').subscribe(
            res =>     {
                 console.log(res.json().length)
                res.json().forEach(q => {
                  this.questions.push(new Question(q.id, q.title, q.email, q.created_at));
                });
                this.questionsCopy = this.questions
            },
            error =>  console.log(error)
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

    readPost(post_id: number){
        this.router.navigate(['/dashboard/post', post_id]);
    }

    readQuestion(question_id: number){
        this.router.navigate(['/dashboard/questions', question_id]);
    }

    createPost(){
        this.router.navigate(['/dashboard/category']);
    }

    createQuestion(){
        this.router.navigate(['/dashboard/questions']);
    }

    filterPosts(fp: string){
        if(fp == null || fp == '') this.posts = this.postsCopy;
        this.posts = this.postsCopy;
        this.posts = this.posts.filter(x => x.title.toLowerCase().indexOf(fp.toLowerCase()) !== -1);
    }

    filterQuestions(fq: string){
        if(fq == null || fq == '') this.questions = this.questionsCopy;
        this.questions = this.questionsCopy;
        this.questions = this.questions.filter(x => x.title.indexOf(fq) !== -1);
    }
}
