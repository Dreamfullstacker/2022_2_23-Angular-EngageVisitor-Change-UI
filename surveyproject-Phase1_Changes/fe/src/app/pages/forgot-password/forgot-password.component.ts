import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { fadeInAnimation } from 'src/app/animation/fadein.animation';
import { AllServicesService } from 'src/app/services/all-services.service';
import { AppConst } from 'src/app/shared/app-const';

@Component({
  selector: 'app-forgot-password',
  animations: [fadeInAnimation
  ],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss', '../../shared/auth.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm;
  loader;
  appConst;
  constructor(
    private allServ: AllServicesService) {
    this.appConst = AppConst;
  }

  ngOnInit(): void {
    this.initForgotPasswordForm();
  }

  submitForm() {
    if (!this.forgotPasswordForm.valid) {

    } else {
      this.loader = true;
      this.allServ.api.forgotPassword(this.forgotPasswordForm.value).toPromise().then((data: any) => {
        this.allServ.toastr.success("You password has been reset. Kindly refer your mail to check your reset password.", "", {
          timeOut: 10000,
          extendedTimeOut: 10000
        });
        this.loader = false;
      }).catch((e: any) => {
        //this.allServ.toastr.error("Incorrect username or password", "LOGIN FAILED")
        this.loader = false;
      });
    }

  }

  initForgotPasswordForm() {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
  }

  handleKeyPress(evn) {
    if (evn.keyCode == 13 && !this.loader && this.forgotPasswordForm.valid) {
      this.submitForm();
    }
  }

}
