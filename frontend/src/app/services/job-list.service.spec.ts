import { TestBed } from '@angular/core/testing';

import { JobListService } from './job-list.service';

describe('JobService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JobListService = TestBed.get(JobListService);
    expect(service).toBeTruthy();
  });
});
