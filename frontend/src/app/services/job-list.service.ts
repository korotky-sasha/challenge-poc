import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Job, Response } from '../shared/models/job';

@Injectable({
  providedIn: 'root'
})
export class JobListService {
  constructor(
    private http: HttpClient
  ) { }

  getJobs(): Observable<Response> {
    return this.http.get<Response>(`/job` );
  }

  addJob(job: Job): Observable<Job> {
    return this.http.post<Job>('/job', job);
  }

  deleteJob(id: number): Observable<Job> {
    return this.http.delete<Job>(`/job/${id}`);
  }
}
