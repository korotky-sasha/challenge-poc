import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { SnackService } from '../../../../shared/services/snack.service';
import { ConfirmModalComponent } from '../../../../shared/components/confirm-modal/confirm-modal.component';
import { AddUserComponent } from '../../components/add-user/add-user.component';
import { User, Response } from '../../../../shared/models/user';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  private users$: Observable<Response>;
  private users: User[];

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private userService: UserService,
    private snackService: SnackService
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.users$ = this.userService.getUsers();
    this.users$
      .pipe(
        take(1)
      )
      .subscribe(value => {
        this.users = value.data;
      });
  }

  addUser() {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '600px'
    });
    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          this.userService.addUser(result)
            .pipe(
              take(1)
            )
            .subscribe(value => {
              this.snackService.alertShow(`Added new user with name ${value.name}`);
              this.getUsers();
            });
        }
      });
  }

  editUser(user: User) {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '600px',
      data: user
    });
    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          this.userService.updateUser(user.id, result)
            .pipe(
              take(1)
            )
            .subscribe(value => {
              this.snackService.alertShow(`Edited new user with name ${value.name}`);
              this.getUsers();
            });
        }
      });
  }

  deleteUser(user: User) {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: '600px',
      data: `Are you sure you want to delete this user with name:  ${user.name} `
    });
    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          this.userService.deleteUser(user.id)
            .pipe(
              take(1)
            )
            .subscribe(value => {
              this.snackService.alertShow(`Deleted user with name ${value.name}`);
              this.getUsers();
            });
        }
      });
  }

}
