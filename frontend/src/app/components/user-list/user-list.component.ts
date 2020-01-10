import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { UserListService } from '../../services/user-list.service';
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
    private userListService: UserListService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.buildForm();
    this.users$ = this.userListService.getUsers();
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
      email: ['', Validators.required],
      status: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      hourlyRate: ['', Validators.required]
    });
  }

  onSubmit() {
    this.userListService.addUser(this.form.value)
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(value => {
        this.users.push(value);
      });
  }

  deleteUser(id) {
    this.userListService.deleteUser(id)
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(value => {
        this.users = this.users.filter(user => user.id !== value.id);
      });
  }

}
