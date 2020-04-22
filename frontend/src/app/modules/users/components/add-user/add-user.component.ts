import { Component, OnInit, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { User } from '../../../../shared/models/user';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  form: FormGroup;
  genders: string[] = ['male', 'female', 'other'];

  constructor(
    private dialogRef: MatDialogRef<AddUserComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    if (this.data) {
      const dateTransformed = this.formatDate(this.data.dateOfBirth);
      this.form = this.formBuilder.group({
        name: [this.data.name, Validators.required],
        email: [this.data.email, [Validators.required, Validators.email]],
        status: [this.data.status, Validators.required],
        dateOfBirth: [dateTransformed, Validators.required],
        hourlyRate: [this.data.hourlyRate, [Validators.required, Validators.min(0)]]
      });
    } else {
      this.form = this.formBuilder.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        status: ['', Validators.required],
        dateOfBirth: ['', Validators.required],
        hourlyRate: ['', [Validators.required, Validators.min(0)]]
      });
    }
  }

  formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    return [year, month, day].join('-');
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
