import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';
import { Post } from '../../models/post';
import { Autor } from '../../models/autor';

@Component({
  selector: 'app-admin-posts',
  templateUrl: 'adminPosts.component.html',
  styleUrls: ['../../app.component.css']
})

export class AdminPostsComponent {
    title = 'BiHiT';
    empty: boolean = false;
    posts: Post[] = new Array;
    post: Post; 
    successfull: boolean = false;
    ngOnInit() {
        // initialize model here
        this.post = {
            id: -1,
            title: '',
            createdAt: '',
            short: '',
            long: '',
            user_id: null,
            subcategory_id: null,
            autor: null,
            likes: 0,
            comments: 0
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

        this._tokenService.get('admin_posts').subscribe(
            (res) => {
                console.log(res);
                res.json().forEach(element => {
                  this._tokenService.get('adminusers/'+element.user_id).subscribe(
                      (data) => {  
                       console.log(data);
                       var aut = data.json();
                       this.posts.push(new Post(element.id, element.title, element.short, element.long, element.created_at, element.user_id, element.subcategory_id, new Autor(aut.id, aut.email), element.likes, element.comments));
                      },
                      (error) => { console.log(error) }
                  )
                });
            },
            (er) => console.log(er)
        )
    }

    delete(post: Post){
        this._tokenService.delete("admin_posts/"+post.id, {})
          .subscribe(data => {
            this.post = data.json()
          });
        var index = this.posts.indexOf(post, 0);
        if (index > -1) {
            this.posts.splice(index, 1);
        }
        if(this.posts.length == 0)
            this.empty = true;
    }

     setPost(post: Post){
        this.post = post;
    }
}
