// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/Http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import { NotFoundError } from '../errors/not-found-error';
import { BadInputError } from '../errors/bad-input-error';
import { AppError } from '../errors/app-error';


export class DataServiceService {

  posts: any = [];
  constructor(protected http, protected url: string) {}

  getData() {
    return this.http.get(this.url)
    .catch(this.errorHandler);
  }
  // getPostwithLimit(l1,l2) {
  //   return this.http.get(this.url + '/limit/' + l1 + '/' + 'l2')
  //   .catch(this.errorHandler);
  // }
  createData(input: HTMLInputElement, post) {
    return this.http.post(this.url, JSON.stringify(post) )
    .catch(this.errorHandler);
  }
  updateData(post, value) {
    return this.http.put(this.url + '/' + post.id, JSON.stringify(value))
    .catch(this.errorHandler);
  }
  deleteData(post) {
    return this.http.delete(this.url + '/' + post.id)
    .catch(this.errorHandler);
  }
  protected errorHandler(error: Response) {
    if (error.status === 404 ) {
      return  Observable.throw(new NotFoundError(error));
    }
    if (error.status === 500 ) {
      return  Observable.throw(new BadInputError(error));
    }
    return Observable.throw(new AppError(error));
  }
}
