import { Component, OnInit, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Job } from '../../../../shared/models/job';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.scss']
})
export class AddJobComponent implements OnInit {
  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<AddJobComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Job
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    if (this.data) {
      this.form = this.formBuilder.group({
        title: [this.data.title, Validators.required],
        description: [this.data.description, Validators.required]
      });
    } else {
      this.form = this.formBuilder.group({
        title: ['', Validators.required],
        description: ['', Validators.required]
      });
    }
  }

  isControlInvalid(control: AbstractControl) {
    return control.invalid && (control.dirty || control.touched);
  }

  close() {
    this.dialogRef.close();
  }

  submit() {
    this.dialogRef.close(this.form.value);
  }

}
