import { Component, OnInit } from '@angular/core';
import { GithubRepositoriesService } from '../common/service/github-repositories.service';
import { AppError } from '../common/errors/app-error';
import { BadInputError } from '../common/errors/bad-input-error';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-github-repositories',
  templateUrl: './github-repositories.component.html',
  styleUrls: ['./github-repositories.component.css']
})
export class GithubRepositoriesComponent implements OnInit {

  gitRepoList = {};
  filteredData: any = [];
  repoList = {};
  totalNumberOfPage = 0;
  pageNo = 1;
  noOfElement = 6;
  constructor( private gitRepoService: GithubRepositoriesService) { }
  ngOnInit() {
    this.gitRepoService.getData()
    .subscribe(repo => {
      this.repoList = repo;
      // tslint:disable-next-line:no-string-literal
      this.filteredData = this.repoList['items'];
      this.calculateTotalPage();
      this.dataToShow();
    }, (error: AppError) => {
      if (error instanceof BadInputError) {
      } else { throw error; }
    });
  }

  dataToShow() {
    this.gitRepoList = this.filteredData.slice(
      (this.pageNo - 1) * this.noOfElement,
      ( (this.pageNo - 1) * this.noOfElement + this.noOfElement)
      );
  }
  fastBackward() {
    this.pageNo = 1 ;
    this.dataToShow();
  }
  backward() {
    this.pageNo = this.pageNo > 1 ? (this.pageNo - 1) : this.pageNo ;
    this.dataToShow();
  }
  forward() {
    this.pageNo = this.pageNo >= this.totalNumberOfPage ? this.pageNo : (this.pageNo + 1);
    this.dataToShow();
  }
  fastForward() {
    this.pageNo = this.totalNumberOfPage ;
    this.dataToShow();
  }
  calculateTotalPage() {
    this.totalNumberOfPage = Math.ceil(this.filteredData.length / this.noOfElement);
    console.log('this.totalNumberOfPage', this.totalNumberOfPage);
  }
  filterData(dataArray, keyValueArray) {
    return dataArray.filter(item => {
      return item[keyValueArray.key].indexOf(keyValueArray.value) > -1;
    });
  }
  repoSearchSubmit(form: FormGroup) {
    const keyValueArray = {
      key : 'name',
      value : form.value.repoSearch
    };
    // tslint:disable-next-line:no-string-literal
    this.filteredData = this.filterData(this.repoList['items'], keyValueArray);
    this.fastBackward();
  }
}
