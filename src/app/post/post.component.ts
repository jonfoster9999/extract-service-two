import { ApplicationError } from './../models/application-error';
import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators'
import { NotFoundError } from 'src/app/models/not-found-error';
import { Response } from '@angular/http/src/static_response';

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  posts: any[];
  constructor(private postService: PostService) { }

  ngOnInit() {
  }

  loadPosts() {
    this.postService.getPosts()
      .subscribe((value: Response) => {
        this.posts = value as any
      }, (error: ApplicationError) => {
        if (error instanceof NotFoundError) {
          console.log("Not Found", error);
        } else {
          console.log('Unexpected Error', error);
        }
      });
  }

  createPost(postInput: HTMLInputElement) {
    const post = { title: postInput.value }
    postInput.value = '';
    this.postService.createPost(post)
      .subscribe(data => {
        this.posts.unshift(post)
        console.log(data);
      }, error => {
        console.log(error);
      });
  }

  deletePost(post) {
    this.postService.deletePost(post.id)
      .subscribe(data => {
        let index = this.posts.indexOf(post);
        this.posts.splice(index, 1);
      }, 
      error => {
        alert('post is already deleted');
      });
  }
}
