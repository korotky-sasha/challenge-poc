import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { JobsRoutingModule } from './jobs-routing.module';
import { JobsComponent } from './containers/jobs/jobs.component';
import { AddJobComponent } from './components/add-job/add-job.component';


@NgModule({
  declarations: [
    JobsComponent,
    AddJobComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    JobsRoutingModule
  ],
  entryComponents: [
    AddJobComponent
  ]
})
export class JobsModule { }
