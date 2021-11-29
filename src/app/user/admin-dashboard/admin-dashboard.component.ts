import { Component, OnInit } from '@angular/core';
import { PersistanceService } from 'src/app/core/services/persistance.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  public userName = '';

  constructor(private persistServ: PersistanceService) {
    console.log();
  }

  ngOnInit(): void {
    this.greating();
  }

  public greating() {
    this.userName = this.persistServ.get('userName');
  }
}
