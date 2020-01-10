import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class Job {
  id?: number;
  title: string;
  description: string;
}

export interface Response {
  total: number;
  limit: number;
  skip: number;
  data: Job[];
}
