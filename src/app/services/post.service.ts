import { BadInputError } from './../models/bad-input-error';
import { Response } from '@angular/http/src/static_response';
import { ApplicationError } from './../models/application-error';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { map, take, catchError } from 'rxjs/operators';
import { NotFoundError } from 'src/app/models/not-found-error';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private url = 'https://jsonplaceholder.typicode.com/posts'


  constructor(private http: Http) { }

  resMap(res: Response) {
    return res.json();
  }

  catchError(res: Response) {
    if (res.status === 404) { // not found error
      return throwError(new NotFoundError);
    } else {
      return throwError(new ApplicationError(res as any)) // any other (unexected Error)
    }
  }

  createPost(post) {
    return this.http.post(this.url, JSON.stringify(post))
      .pipe(
        map(this.resMap),
        catchError((res: Response) => {
          if (res.status === 400) {
            return Observable.throw(new BadInputError())
          } else {
            return Observable.throw(new ApplicationError(res.json()))
          }
        })
      )
  }

  getPosts() {
    return this.http.get(this.url)
      .pipe(
        map(this.resMap),
        catchError(this.catchError)       
      )
  }

  getPost(id) {
    return this.http.get(this.url + '/' + id)
      .pipe(
        map(this.resMap),
        catchError(this.catchError)
      )
  }

  deletePost(id) {
    return this.http.delete(this.url + '/' + id)
      .pipe(
        map(this.resMap),
        catchError(this.catchError)
      ) 
  }
}
