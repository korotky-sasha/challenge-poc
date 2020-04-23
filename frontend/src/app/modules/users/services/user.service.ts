import { Injectable } from '@angular/core';

import { from, Observable } from 'rxjs';
import { FeathersService } from '../../../shared/services/feathers.service';
import { User } from '../../../shared/models/user';


@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(
    private feathers: FeathersService
  ) { }

  getUsers(): Observable<any> {
    return from<any>(this.feathers.createService<User>('user').find());
  }

  updateUser(id: number, user: User): Observable<any> {
    return from<any>(this.feathers.createService<User>('user').update(id, user));
  }

  addUser(user: User): Observable<any> {
    return from<any>(this.feathers.createService<User>('user').create(user));
  }

  deleteUser(id: number): Observable<any> {
    return from<any>(this.feathers.createService<User>('user').remove(id));
  }
}
