import { Component, OnInit } from '@angular/core';
import { AllServicesService } from 'src/app/services/all-services.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public allServ: AllServicesService) { }

  ngOnInit(): void {

  }

  logout() {
    this.allServ.api.logout().toPromise().then(d => {
      this.allServ.authServ.destroyLoginSession();
    }).catch(e => {
      alert("Unable to logout");
    });
  }



}
