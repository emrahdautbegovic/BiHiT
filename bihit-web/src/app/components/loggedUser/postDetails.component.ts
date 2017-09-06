import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';
import { Post } from '../../models/post';
import { Autor } from '../../models/autor';
import { Comment } from '../../models/comment';
@Component({
  selector: 'app-post-details',
  templateUrl: 'postDetails.component.html',
  styleUrls: ['../../app.component.css']
})

export class PostDetailsComponent implements OnInit{
   title = 'BiHiT';
   post_id: number;
   post: Post;
   autor: Autor; 
   comments: Comment[] = new Array;
   comment: Comment;
   successfull: boolean;
   liked: boolean;
   likeId: number;

   constructor(private route: ActivatedRoute, private router: Router, private _tokenService: Angular2TokenService) {
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
        this.comment = {
            id: null,
            tekst: '',
            autor_id: null,
            created_at: '',
            autor: null,
            post_id: null
        }
        this.liked = false;
   }

    ngOnInit() {
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
             this.post_id = +params['id'];
        });

        this._tokenService.get('/posts/'+this.post_id).subscribe(
            (data) => {
                var d = data.json();            
                this.post = new Post(d.id, d.title, d.short,
                                     d.long, d.created_at, d.user_id,
                                     d.subcategory_id, new Autor(d.user_id, "empty"), 0, 0)
                this._tokenService.get('users/'+this.post.user_id).subscribe(
                    (data) => {
                        var d = data.json();
                        this.post.autor.id = d.id;
                        this.post.autor.email = d.email;
                    },
                    (err) => console.log(err)
                )
                this._tokenService.get('comments?post_id='+this.post.id).subscribe(
                    (data) => { 
                        console.log(data);
                        data.json().forEach(com => {
                            this._tokenService.get('users/'+com.user_id).subscribe(
                                (data) => {
                                    var d = data.json();
                                    this.comments.push(new Comment(com.id, com.tekst, com.user_id, com.created_at, new Autor(d.id, d.email), com.post_id))
                                },
                                (err) => console.log(err)
                            )
                        })

                    },
                    (err) => { console.log(err) }
                )
                this._tokenService.get('likes?user_id='+this._tokenService.currentUserData.id+"&post_id="+d.id).subscribe(
                    (data) => {
                        var d = data.json();
                        if(d.length === 0) this.liked = false;
                        else { 
                            this.liked = true;
                            this.likeId = d[0].id;
                        }
                    },
                    (err) => { console.log(err)}
                )
            },
            (err) => console.log(err)
        )
    }

    create(comment: Comment){
        if(comment.tekst == null || comment.tekst == '') return;
        this._tokenService.post('comments/', { 
            tekst: comment.tekst,
            user_id: this._tokenService.currentUserData.id,
            post_id: this.post_id
        }).subscribe(
            (data) => {
                console.log(data);
                this.successfull = true;
                var d = data.json();
                this.comments.push(new Comment(d.id, d.tekst, d.user_id,
                                               d.created_at, new Autor(this._tokenService.currentUserData.id, this._tokenService.currentUserData.email), d.post_id))
            },
            (err) => {console.log(err)}
        )
    }

    like(){
        this._tokenService.post('likes/', { 
            user_id: this._tokenService.currentUserData.id,
            post_id: this.post_id
        }).subscribe(
            (data) => {
                this.liked = true;
                this.likeId = data.json().id;
            },
            (err) => {
                this.liked = false;
            }
        )
    }

    dislike(){
        this._tokenService.delete('likes/'+this.likeId).subscribe(
            (data) => {
               console.log(data)
               this.liked = false;
               this.likeId = -1;
            },
            (err) => {
                console.log(err);
            }
        )
    }
}
