import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Autor } from '../../models/autor';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Error } from '../../models/error';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import { Angular2TokenService } from 'angular2-token';
import { Category} from '../../models/category';
import { Subcategory } from '../../models/subcategory';
import { Post } from '../../models/post';
import { Comment } from '../../models/comment'; 
import { Like } from '../../models/like'; 

@Component({    
    selector: 'app-post',
    templateUrl: 'post.component.html',
    styleUrls: ['../../app.component.css']
})

export class PostComponent implements OnInit{
    posts: Post[] = new Array;
    autors: Autor[] = new Array;
    comments: Comment[] = new Array;
    likes: Like[] = new Array;
    post: Post;
    empty: boolean = true;
    subcategory: Subcategory;
    subcategory_id: number;
    autor: Autor;
    emptyTitle: boolean = false;
    emptyShort: boolean = false;
    emptyLong: boolean = false;
    successfull: boolean = false;
    errorPost: boolean = false;
    autorTemp: Autor;
    postLikes: number;
    postComments: number;
   
    constructor(private route: ActivatedRoute, private router: Router, private _tokenService: Angular2TokenService) {
        this.subcategory = {
            id: null,
            title: "",
            category_id: null  
        }
        this.autor = {
            id: null,
            email: ''
        }
        this.post = {
            id: null,
            title: '',
            short: '',
            long: '',
            user_id: null,
            subcategory_id: null,
            createdAt: '',
            autor: new Autor(0 , "empty"),
            likes: null,
            comments: null
        }
    }

    ngOnInit() {
        this._tokenService.init({
            apiPath: "http://localhost:3000"
        });

        this._tokenService.validateToken().subscribe(
            res =>   //console.log(res),
            error =>    console.log(error)
        );

        this._tokenService.get('/likes').subscribe(
            (res) => { 
                res.json().forEach(l => {
                    this.likes.push(new Like(l.id, l.user_id, l.post_id));
                })
            },
            (err) => console.log(err)
        )
        this._tokenService.get('/comments').subscribe(
            (res) => { 
               res.json().forEach(c => {
                    this.comments.push(new Comment(c.id, c.tekst, c.user_id, c.created_at, new Autor(0, "empty"), c.post_id));
                }) 
            },
            (err) => console.log(err)
        )

        this._tokenService.get('/userusers').subscribe(
            (data) => {
                console.log(data);
                data.json().forEach(user =>{
                    this.autors.push(new Autor(user.id, user.email));
                })
                this._tokenService.get('posts?subcategory_id='+this.subcategory_id).subscribe(
                    (data) => {
                        data.json().forEach(p => {
                            this.postComments = this.comments.filter(x => x.post_id === p.id).length
                            this.postLikes = this.likes.filter(x => x.post_id === p.id).length
                            this.autorTemp = this.autors.find(x => x.id === p.user_id);
                            console.log("likes: "+this.likes+"  comments: "+this.comments)
                            this.posts.push(new Post(p.id, p.title, p.short, p.long, p.created_at, p.user_id,
                                                     p.subcategory_id, new Autor(this.autorTemp.id, this.autorTemp.email),
                                                     this.postLikes, this.postComments));
                           
                        })
                        if(this.posts.length > 0)
                            this.empty = false;
                    },
                    (err) => { console.log(err) }
                )
            },
            (err) => {
                console.log(err);
            }
        )

        this.route.params.subscribe(params => {
             this.subcategory_id = +params['id'];
        });

        this._tokenService.get('usersubcategories/'+this.subcategory_id).subscribe(
            (data) => {
                var sub = data.json();
                this.subcategory = new Subcategory(sub.id, sub.title, sub.category_id);
            },
            (err) => {
                console.log(err);
            }
        )
    }

    create(post: Post){
        if(post.title == '' || post.title == null || 
           post.short == '' || post.short == null || 
           post.long == '' || post.long == null)
        {
            if(post.title == '' || post.title == null) this.emptyTitle = true;
            if(post.long == '' || post.long == null) this.emptyLong = true;
            if(post.short == '' || post.short == null) this.emptyShort = true;
            return;
        }
        this._tokenService.post('/posts', {  
           title: post.title,
           short: post.short,
           long: post.long,
           subcategory_id: this.subcategory_id     
        }).subscribe(
            (data) => {
                console.log(this._tokenService.currentUserData);
                var el = data.json();
                this.posts.push(new Post(el.id, el.title, el.short,
                                         el.long, el.created_at, 
                                         el.user_id, el.subcategory_id,
                                         new Autor(this._tokenService.currentUserData.id , this._tokenService.currentUserData.email),
                                         0,0));
                this.empty = false;
                this.emptyLong = false;
                this.emptyShort = false;
                this.emptyTitle = false;
                this.successfull = true;
                this.errorPost = false;
            },
            (err) => { this.errorPost = true; }
        )
    }

    showPost(post_id: number){
        this.router.navigate(['/dashboard/post', post_id]);
    }
}