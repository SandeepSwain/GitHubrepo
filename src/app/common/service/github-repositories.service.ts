import { Injectable } from '@angular/core';
import { DataServiceService } from '../service/data-service.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GithubRepositoriesService extends DataServiceService {

  constructor(http: HttpClient) {
    const url = 'https://api.github.com/search/repositories?q=TEST';
    super(http, url);
   }
}

