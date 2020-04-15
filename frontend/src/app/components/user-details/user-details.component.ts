import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { UserService } from "../../services/user.service";
import { User } from "../../shared/models/user";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  id: number;
  user: User;
  user$: Observable<User>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.user$ = this.userService.getUser(this.id);
    this.user$
      .pipe(
        take(1)
      )
      .subscribe(value => {
        this.user = value;
      });
  }

  goToEdit() {
    this.router.navigate([`user/edit/${this.id}`]);
  }

}
