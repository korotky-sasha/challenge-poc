import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'users', loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule) },
  { path: 'jobs', loadChildren: () => import('./modules/jobs/jobs.module').then(m => m.JobsModule) },
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
