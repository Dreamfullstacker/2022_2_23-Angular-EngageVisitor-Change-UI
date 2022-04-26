import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AllServicesService } from '../services/all-services.service';
import { AppConst } from '../shared/app-const';

@Injectable({
  providedIn: 'root'
})
export class GuardService {

  constructor() { }
}

@Injectable({
  providedIn: 'root'
})
export class ApplicationGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> | boolean {

    if (localStorage.getItem(AppConst.AUTH.ID)) {
      return true;
    } else {
      localStorage.clear();
      this.router.navigateByUrl("login");
    }

    
  }
}

@Injectable({
  providedIn: 'root'
})
export class LoginPageGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> | boolean {

    if (!localStorage.getItem(AppConst.AUTH.ID)) {
      return true;
    } else {
      this.router.navigateByUrl("form-listing");
    }
  }


  
}

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate {
  constructor(private router: Router,public allServ: AllServicesService) { }

  canActivate(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> | boolean {

    if (localStorage.getItem(AppConst.AUTH.ID) &&  this.allServ?.authServ?.getLoggedUser().email=="admin@ev.com") {
      return true;
    } else {
        this.router.navigateByUrl("/");
    }

    
  }
}
