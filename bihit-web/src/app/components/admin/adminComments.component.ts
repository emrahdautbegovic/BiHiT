import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';
import { Comment } from '../../models/comment';
import { Autor } from '../../models/autor';
@Component({
  selector: 'app-admin-comments',
  templateUrl: 'adminComments.component.html',
  styleUrls: ['../../app.component.css']
})

export class AdminCommentsComponent {
    title = 'BiHiT';
    empty: boolean = false;
    comments: Comment[] = new Array;
    comment: Comment; 
    successfull: boolean = false;
    ngOnInit() {
        // initialize model here
        this.comment = {
            id: null,
            tekst: '',
            autor_id: null,
            created_at: '',
            autor: null,
            post_id: null
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

        this._tokenService.get('admin_comments').subscribe(
            (res) => {
               console.log(res);
               res.json().forEach(element => {
                  this._tokenService.get('adminusers/'+element.user_id).subscribe(
                    (data) => {  
                      console.log(data);
                      var aut = data.json();
                      this.comments.push(new Comment(element.id, element.tekst, element.autor_id, element.created_at, new Autor(aut.id, aut.email), element.post_id));
                      this.empty = false;
                    },
                    (error) => { console.log(error) }
                  );
               });
                if(this.comments.length == 0)
                    this.empty = true;
            },
            (er) => console.log(er)
        )
    }

    delete(comment: Comment){
        this._tokenService.delete("admin_comments/"+comment.id, {})
                        .subscribe(data => {
                            this.comment = data.json()  
                        });
            
        var index = this.comments.indexOf(comment, 0);
       if (index > -1) {
            this.comments.splice(index, 1);
        }
        if(this.comments.length == 0)
            this.empty = true;
    }

     setComment(comment: Comment){
        this.comment = comment;
    }
}
