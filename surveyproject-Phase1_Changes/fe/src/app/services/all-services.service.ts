import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';
import { AppConst } from '../shared/app-const';
import { Shared } from '../shared/shared';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AllServicesService {

  public loader: Boolean;
  public appConst: AppConst;
  
  public createFormData: any;

  constructor(public api: ApiService,
    public router: Router,
    public authServ: AuthService,
    public toastr: ToastrService,
    public shared: Shared
  ) {
    this.appConst = AppConst;
  }


}
