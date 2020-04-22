import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { UserService } from '../../services/user.service';
import { User, Response } from '../../shared/models/user';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
  private users$: Observable<Response>;
  private users: User[];
  private form: FormGroup;

  private ngUnsubscribe: Subject<void> = new Subject();

  constructor(
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.buildForm();
    this.users$ = this.userService.getUsers();
    this.users$
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(value => {
        this.users = value.data;
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      status: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      hourlyRate: ['', [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit() {
    this.userService.addUser(this.form.value)
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(value => {
        this.users.push(value);
      });
  }

  deleteUser(id) {
    this.userService.deleteUser(id)
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(value => {
        this.users = this.users.filter(user => user.id !== value.id);
      });
  }

  goToDetails(id) {
    this.router.navigate([`user/${id}`]);
  }

  goToEdit(id) {
    this.router.navigate([`user/edit/${id}`]);
  }

  isControlInvalid(control: AbstractControl) {
    return control.invalid && (control.dirty || control.touched);
  }

}
