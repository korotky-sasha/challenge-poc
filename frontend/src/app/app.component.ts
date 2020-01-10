import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ExampleService } from './services/example.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';

  constructor(
    // private exampleService: ExampleService,
    private router: Router
    ) {
      /*setTimeout(() => {
        this.exampleService.showExample();
      }, 500);*/
    }

  goToJobs() {
    this.router.navigate(['/job']);
  }

  goToUsers() {
    this.router.navigate(['/user']);
  }
}
