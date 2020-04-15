import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Observable } from "rxjs";
import { take } from "rxjs/operators";

import { JobService } from "../../services/job.service";
import { Job } from "../../shared/models/job";

@Component({
  selector: 'app-job-edit',
  templateUrl: './job-edit.component.html',
  styleUrls: ['./job-edit.component.scss']
})

export class JobEditComponent implements OnInit {
  id: number;
  job: Job;
  job$: Observable<Job>;
  private form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
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
        this.buildForm();
      });
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      title: [this.job.title, Validators.required],
      description: [this.job.description, Validators.required],
    });
  }

  onSubmit() {
    this.jobService.updateJob(this.id, this.form.value)
      .pipe(
        take(1)
      )
      .subscribe(value => {
        this.job = value;
        this.router.navigate([`job/${this.id}`]);
      });
  }

  isControlInvalid(control: AbstractControl) {
    return control.invalid && (control.dirty || control.touched)
  }

}
