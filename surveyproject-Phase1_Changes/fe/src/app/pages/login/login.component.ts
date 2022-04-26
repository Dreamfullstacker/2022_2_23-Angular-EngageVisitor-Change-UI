import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { environment } from 'src/environments/environment';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { AllServicesService } from '../../services/all-services.service';
import { AppConst } from 'src/app/shared/app-const';
import { fadeInAnimation } from 'src/app/animation/fadein.animation';

@Component({
  selector: 'app-login',
  animations: [fadeInAnimation
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../../shared/auth.scss']
})
export class LoginComponent implements OnInit {

  loginForm;
  loginFormLoader;
  signUpForm;
  signUpFormLoader;
  appConst;
  constructor(
    private allServ: AllServicesService) {
    this.appConst = AppConst;
  }

  ngOnInit(): void {
    this.reset();

    this.initLoginForm();
    this.initSignupForm();
  }

  login() {
    if (!this.loginForm.valid) {
      alert("Invalid form data");
    } else {
      this.loginFormLoader = true;
      this.allServ.api.login(this.getLoginFormPayload()).toPromise().then((data: any) => {
        let user: User = this.getLoginFormPayload();
        user.id = data.id;
        user.name = data.name;
        this.allServ.authServ.createLoginSession(user);
        this.allServ.router.navigateByUrl("form-listing");
        this.loginFormLoader = false;
      }).catch((e: any) => {
        this.allServ.toastr.error("Incorrect username or password", "LOGIN FAILED")
        this.loginFormLoader = false;
      });
    }
  }

  getLoginFormPayload(): User {
    let user: User = new User();
    user.email = this.loginForm.value.email;
    user.password = this.loginForm.value.password;
    return user;
  }

  initLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(!environment.production ? 'abc@gmail.com' : null, Validators.required),
      password: new FormControl(!environment.production ? '123456' : null, Validators.required)
    });
  }

  handleLoginKeyPress(evn) {
    if (evn.keyCode == 13 && !this.loginFormLoader && this.loginForm.valid) {
      this.login();
    }
  }

  reset() {
    this.loginFormLoader = null;
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
      agree: new FormControl(null)
    }, [ReTypePasswordValidator, agreeValidator]);
  }

  handleSignupKeyPress(evn) {
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
