import { Injectable, OnInit } from '@angular/core';
import { FeathersService } from '../shared/feathers.service';


interface JobModel {
  id?: number;
  title: string;
  description?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ExampleService {

  constructor(
    private feathers: FeathersService
  ) {}

  async showExample() {
  const jobService = this.feathers.createService<JobModel>('job');
  const job: JobModel = {title: 'front-end developer', description: 'Wow! This is a description! Surprised?'};
  const updJob: JobModel = {title: 'front-end developer(upd)', description: '(Upd)Wow! This is a description! Surprised?'};

  console.log('%c Job service example', 'font-size:20px;font-weight:bold');

    // CREATE
  const createdJob = await jobService.create(job);
  console.log('Created Job:', createdJob);

    // UPDATE
  const updatedJob = await jobService.update(createdJob.id, updJob);
  console.log('Updated Job:', updatedJob);

    // GET
  const retrievedJob = await jobService.get(createdJob.id);
  console.log('Retrieved Job:', retrievedJob);

    // REMOVE
  await jobService.remove(retrievedJob.id);
  console.log('removed Job with id', retrievedJob.id);


  console.log('%c End job service example', 'font-size:20px;font-weight:bold');
  }
}
