import { Injectable } from '@angular/core';
import { FeathersService } from '../shared/feathers.service';
import { Job } from "../shared/models/job";
import { from, Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})

export class JobService {

  constructor(
    private feathers: FeathersService
  ) {}

  getJobs(): Observable<any> {
    return from<any>(this.feathers.createService<Job>('job').find());
  }

  getJob(id: number): Observable<any> {
    return from<any>(this.feathers.createService<Job>('job').get(id));
  }

  updateJob(id: number, job: Job): Observable<any> {
    return from<any>(this.feathers.createService<Job>('job').update(id, job));
  }

  addJob(job: Job): Observable<any> {
    return from<any>(this.feathers.createService<Job>('job').create(job));
  }

  deleteJob(id: number): Observable<any> {
    return from<any>(this.feathers.createService<Job>('job').remove(id));
  }
}
