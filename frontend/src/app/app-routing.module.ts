import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobListComponent } from './components/job-list/job-list.component';
import { UserListComponent } from './components/user-list/user-list.component';


const routes: Routes = [
  {
    path: 'job',
    component: JobListComponent
  },
  {
    path: 'user',
    component: UserListComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
