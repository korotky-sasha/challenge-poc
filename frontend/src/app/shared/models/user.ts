import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class User {
  id?: number;
  name: string;
  email: string;
  status: string;
  dateOfBirth: string;
  hourlyRate: number;
}

export interface Response {
  total: number;
  limit: number;
  skip: number;
  data: User[];
}

