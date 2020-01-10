import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { User, Response } from '../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserListService {
  constructor(
    private http: HttpClient
  ) { }

  getUsers(): Observable<Response> {
    return this.http.get<Response>(`/user` );
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>('/user', user);
  }

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(`/user/${id}`);
  }
}
