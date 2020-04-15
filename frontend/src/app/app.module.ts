import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { httpInterceptorProviders } from './core/http-interceptors';

import { AppComponent } from './app.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { JobListComponent } from './components/job-list/job-list.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { JobDetailsComponent } from './components/job-details/job-details.component';
import { JobEditComponent } from './components/job-edit/job-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    JobListComponent,
    UserDetailsComponent,
    UserEditComponent,
    JobDetailsComponent,
    JobEditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
