import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { fadeInAnimation } from 'src/app/animation/fadein.animation';
import { AllServicesService } from 'src/app/services/all-services.service';
import { AppConst } from 'src/app/shared/app-const';

@Component({
  selector: 'app-signup',
  animations: [fadeInAnimation
  ],
  templateUrl: './customsignup.component.html',
  styleUrls: ['./customsignup.component.scss', '../../shared/auth.scss']
})
export class CustomSignupComponent implements OnInit {

  signUpForm;
  signUpFormLoader;
  appConst;
  constructor(
    private allServ: AllServicesService) {
    this.appConst = AppConst;
  }

  ngOnInit(): void {
    this.initSignupForm();
  }

  signup() {
    if (!this.signUpForm.valid) {
    } else {
      this.signUpFormLoader = true;
      this.allServ.api.createUser(this.signUpForm.value).toPromise().then((data: any) => {
        this.allServ.toastr.success("Please Sign in to continue", "Sign up successfully done", {
          timeOut: 15000,
          extendedTimeOut: 15000,
        });
        this.allServ.router.navigateByUrl("login");
        this.signUpFormLoader = false;
      }).catch((e: any) => {
        this.allServ.toastr.error(e.error.message, "Signup Error")
        this.signUpFormLoader = false;
      });
    }
  }

  getSignUpFormPayload() {

  }

  initSignupForm() {
    this.signUpForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(30)]),
      reTypePassword: new FormControl(null),
      promoCode: new FormControl(null),
      agree: new FormControl(null)
    }, [ReTypePasswordValidator, agreeValidator]);
  }

  handleKeyPress(evn) {
    if (evn.keyCode == 13 && !this.signUpFormLoader && this.signUpForm.valid) {
      this.signup();
    }
  }

  check() {
    console.log(this.signUpForm);
  }
}

function ReTypePasswordValidator(findForm: AbstractControl): { [s: string]: boolean } {
  if (findForm.get('password').value !== findForm.get('reTypePassword').value) {
    return { isReTypePasswordNotSame: true };
  }
  return null;
}

function agreeValidator(findForm: AbstractControl): { [s: string]: boolean } {
  if (!findForm.get('agree').value) {
    return { agreeNotChecked: true };
  }
  return null;
}
