import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Observable } from "rxjs";
import { take } from "rxjs/operators";

import { UserService } from "../../services/user.service";
import { User } from "../../shared/models/user";


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  id: number;
  user: User;
  user$: Observable<User>;
  private form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.user$ = this.userService.getUser(this.id);
    this.user$
      .pipe(
        take(1)
      )
      .subscribe(value => {
        this.user = value;
        this.buildForm();
      });
  }

  private buildForm(): void {
    const date = new Date(this.user.dateOfBirth);
    const dateTransformed = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
    this.form = this.formBuilder.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      status: [this.user.status, Validators.required],
      dateOfBirth: [dateTransformed, Validators.required],
      hourlyRate: [this.user.hourlyRate, Validators.required]
    });
  }

  onSubmit() {
    this.userService.updateUser(this.id, this.form.value)
      .pipe(
        take(1)
      )
      .subscribe(value => {
        this.user = value;
        this.router.navigate([`user/${this.id}`]);
      });
  }

  isControlInvalid(control: AbstractControl) {
    return control.invalid && (control.dirty || control.touched)
  }

}
