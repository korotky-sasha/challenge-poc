import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Job, Response } from '../../shared/models/job';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit, OnDestroy {
  private jobs$: Observable<Response>;
  private jobs: Job[];
  form: FormGroup;

  private ngUnsubscribe: Subject<void> = new Subject();

  constructor(
    private router: Router,
    private jobService: JobService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.buildForm();
    this.jobs$ = this.jobService.getJobs();
    this.jobs$
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(value => {
      this.jobs = value.data;
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  onSubmit() {
    this.jobService.addJob(this.form.value)
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(value => {
      this.jobs.push(value);
      });
  }

  deleteJob(id) {
    this.jobService.deleteJob(id)
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(value => {
        this.jobs = this.jobs.filter(job => job.id !== value.id);
      });
  }

  goToDetails(id) {
    this.router.navigate([`job/${id}`]);
  }

  goToEdit(id) {
    this.router.navigate([`job/edit/${id}`]);
  }

  isControlInvalid(control: AbstractControl) {
    return control.invalid && (control.dirty || control.touched);
  }

}
