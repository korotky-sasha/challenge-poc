import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { JobService } from '../../services/job.service';
import { SnackService } from '../../../../shared/services/snack.service';
import { ConfirmModalComponent } from '../../../../shared/components/confirm-modal/confirm-modal.component';
import { AddJobComponent } from '../../components/add-job/add-job.component';
import { Job, Response } from '../../../../shared/models/job';


@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {
  private jobs$: Observable<Response>;
  private jobs: Job[];

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private jobService: JobService,
    private snackService: SnackService
  ) { }

  ngOnInit() {
    this.getJobs();
  }

  getJobs() {
    this.jobs$ = this.jobService.getJobs();
    this.jobs$
      .pipe(
        take(1)
      )
      .subscribe(value => {
        this.jobs = value.data;
      });
  }

  addJob() {
    const dialogRef = this.dialog.open(AddJobComponent, {
      width: '600px'
    });
    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          this.jobService.addJob(result)
            .pipe(
              take(1)
            )
            .subscribe(value => {
              this.snackService.alertShow(`Added new job with title ${value.title}`);
              this.getJobs();
            });
        }
      });
  }

  editJob(job: Job) {
    const dialogRef = this.dialog.open(AddJobComponent, {
      width: '600px',
      data: job
    });
    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          this.jobService.updateJob(job.id, result)
            .pipe(
              take(1)
            )
            .subscribe(value => {
              this.snackService.alertShow(`Edited new job with title ${value.title}`);
              this.getJobs();
            });
        }
      });
  }

  deleteJob(job: Job) {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: '600px',
      data: `Are you sure you want to delete this job with title:  ${job.title} `
    });
    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          this.jobService.deleteJob(job.id)
            .pipe(
              take(1)
            )
            .subscribe(value => {
              this.snackService.alertShow(`Deleted job with title ${value.title}`);
              this.getJobs();
            });
        }
      });
  }

}
