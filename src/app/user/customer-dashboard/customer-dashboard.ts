import { Component, OnInit } from '@angular/core';
import { PersistanceService } from 'src/app/core/services/persistance.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css'],
})
export class CustomerDashboardComponent implements OnInit {
  public userName = '';
  public userEmail = '';
  public userPhone = '';

  constructor(private persistServ: PersistanceService) {
    console.log();
  }

  ngOnInit(): void {
    this.greating();
  }

  public greating() {
    this.userName = this.persistServ.get('userName');
    this.userEmail = this.persistServ.get('email');
    this.userPhone = this.persistServ.get('phone');
  }
}
