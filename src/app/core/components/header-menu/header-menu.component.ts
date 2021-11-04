import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { DishesDataService } from '../../services/dishes-data.service';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.css'],
})
export class HeaderMenuComponent implements OnInit {
  constructor(
    private dishesServ: DishesDataService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.refreshCartCount();
  }

  public refreshCartCount(): number {
    return this.dishesServ.getCartDishesCount();
  }

  public logout(): void {
    this.auth.logout();
    this.router.navigate(['']);
  }
}
