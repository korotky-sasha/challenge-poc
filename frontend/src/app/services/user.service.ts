import { Injectable } from '@angular/core';
import { FeathersService } from '../shared/feathers.service';
import { User } from '../shared/models/user'
import { from, Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(
    private feathers: FeathersService
  ) {}

  getUsers(): Observable<any> {
    return from<any>(this.feathers.createService<User>('user').find());
  }

  getUser(id: number): Observable<any> {
    return from<any>(this.feathers.createService<User>('user').get(id));
  }

  updateUser(id: number, user: User): Observable<any> {
    return from<any>(this.feathers.createService<User>('user').update(id,user));
  }

  addUser(user: User): Observable<any> {
    return from<any>(this.feathers.createService<User>('user').create(user));
  }

  deleteUser(id: number): Observable<any> {
    return from<any>(this.feathers.createService<User>('user').remove(id));
  }
}
