import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { JobService } from "../../services/job.service";
import { Job } from "../../shared/models/job";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit {
  id: number;
  job: Job;
  job$: Observable<Job>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobService: JobService
  ) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.job$ = this.jobService.getJob(this.id);
    this.job$
      .pipe(
        take(1)
      )
      .subscribe(value => {
        this.job = value;
      });
  }

  goToEdit() {
    this.router.navigate([`job/edit/${this.id}`]);
  }

}
