import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from 'src/app/animation/fadein.animation';
import { AllServicesService } from 'src/app/services/all-services.service';
import { AppConst } from 'src/app/shared/app-const';

@Component({
  selector: 'app-error',
  animations: [fadeInAnimation
  ],
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss', '../../shared/form.scss']
})
export class ErrorComponent implements OnInit {

  appConst;
  applicationName;

  constructor(public allServ: AllServicesService) {
    this.appConst = AppConst;
    this.applicationName = AppConst.APPLICATION_NAME
  }

  ngOnInit(): void {
  }

  handleKeyPress(evn) {
    if (evn.keyCode == 13) {
      this.allServ.router.navigateByUrl("/login");
    }
  }

}
