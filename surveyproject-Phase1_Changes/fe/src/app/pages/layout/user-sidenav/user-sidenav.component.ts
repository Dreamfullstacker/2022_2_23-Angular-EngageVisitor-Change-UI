import { Component, OnInit } from '@angular/core';
import { AllServicesService } from 'src/app/services/all-services.service';
import { AppConst } from 'src/app/shared/app-const';

@Component({
  selector: 'app-user-sidenav',
  templateUrl: './user-sidenav.component.html',
  styleUrls: ['./user-sidenav.component.scss']
})
export class UserSidenavComponent implements OnInit {

  appConst;
  constructor(public allServ: AllServicesService) {
    this.appConst = AppConst;
  }

  ngOnInit(): void {
  }

}
