import { TestBed } from '@angular/core/testing';

import { GithubRepositoriesService } from './github-repositories.service';

describe('GithubRepositoriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GithubRepositoriesService = TestBed.get(GithubRepositoriesService);
    expect(service).toBeTruthy();
  });
});
