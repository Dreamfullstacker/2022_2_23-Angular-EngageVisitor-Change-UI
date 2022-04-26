import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { AppConst } from '../shared/app-const';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router,
    private toastr: ToastrService) {

  }

  createLoginSession(user: User) {
    localStorage.setItem(AppConst.AUTH.EMAIL, user.email);
    localStorage.setItem(AppConst.AUTH.ID, user.id);
    localStorage.setItem(AppConst.AUTH.TOKEN, btoa(`${user.email}:${user.password}`));
    localStorage.setItem(AppConst.AUTH.NAME, user.name);
  }

  destroyLoginSession() {
    localStorage.clear();
    this.router.navigateByUrl("login");
    //this.toastr.success("Successfully logged out.");
  }

  isUserLoggedIn() {
    return localStorage.getItem(AppConst.AUTH.ID);
  }

  getLoggedUser(): User {
    let user: User = new User();
    user.id = localStorage.getItem(AppConst.AUTH.ID);
    user.email = localStorage.getItem(AppConst.AUTH.EMAIL);
    user.token = localStorage.getItem(AppConst.AUTH.TOKEN);
    user.name = localStorage.getItem(AppConst.AUTH.NAME);
    return user;
  }


}
