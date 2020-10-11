import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import User from 'src/app/shared/models/user.model';
import { StoreUserService } from 'src/app/shared/services/store-user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private storeUserService: StoreUserService,
    private router: Router
  ) {}
  public user: User;

  ngOnInit(): void {
    console.log('Header component init');
    this.user = this.storeUserService.user;
    console.log(this.user);
  }

  logOut() {
    this.storeUserService.user = undefined;
    this.user = undefined;

    if (this.router.url === '/home') {
      this.router.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
      };
    }

    this.router.navigate(['/']);
  }
}
