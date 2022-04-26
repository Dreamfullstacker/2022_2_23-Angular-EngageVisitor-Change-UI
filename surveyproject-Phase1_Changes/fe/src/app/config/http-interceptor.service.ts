import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler } from '@angular/common/http';
import { AppConst } from '../shared/app-const';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AllServicesService } from '../services/all-services.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptorService {
  constructor(private allServ: AllServicesService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (localStorage.getItem(AppConst.AUTH.ID)) {
      req = req.clone(
        {
          setHeaders: {
            Authorization: 'Basic ' + localStorage.getItem(AppConst.AUTH.TOKEN)
          }
        }
      );
    }
    return next.handle(req)
      .pipe(map((data: any) => {
        console.log(data);
        if (data.body && data.body.statusCode && data.body.statusCode == "201") {
          //this.allServ.toastr.success(data.body.message);
        }
        return data;
      }), catchError(error => {
        console.log(error);
        switch (error.status) {
          case 401:
            break;
          case 400:
            this.allServ.toastr.error(error.error.message);
            break;
          case 500:
            this.allServ.toastr.error("Internal Server Error.");
            break;
          default:
            break;
        }

        return throwError(error);
      }));
  }
}
