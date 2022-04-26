import { AfterViewInit, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { PaddleCheckoutOptions, PaddleEventCallbackData, PaddleService, PADDLE_EVENT_TYPE,PaddleProductPrice } from 'ngx-paddle-wrapper';
import { AllServicesService } from 'src/app/services/all-services.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.scss', '../../shared/auth.scss']
})
export class UpgradeComponent implements OnInit, AfterViewInit {
  @ViewChild('closebutton') closebutton;
  price: PaddleProductPrice;
  email;
  couponForm;
  constructor(private paddleServ: PaddleService,public allServ: AllServicesService,public _bsModalRef: BsModalRef) {
    this.email =this.allServ?.authServ?.getLoggedUser()?.email;
   }
  ngOnInit(): void {
    this.couponForm = new FormGroup({
      coupon: new FormControl( null, Validators.required)
    });
  }

   private paddleOptions: PaddleCheckoutOptions = {
    product: 661195,
    title: 'EngageVisitor Pro MemberShip',
    message: 'Great Choice! please upgrade your self.',
    coupon:'',   
    
  };
  async ngAfterViewInit() {
    this.paddleServ.create({
      vendor: 132578,
      
      eventCallback: this.checkEvent,
    });

    this.price = await this.paddleServ.getPrice(this.paddleOptions.product);
    this.couponForm = new FormGroup({
      coupon: new FormControl( null, Validators.required)
    });
   
  }

  onSubscribe() {
    this.paddleServ.open(this.paddleOptions);
  }
 
  checkEvent(data: PaddleEventCallbackData) {
    // Handle Event
   
    if (data.event === PADDLE_EVENT_TYPE.CheckoutCouponCancel) {
      console.log('User has completed checkout!');
      this._bsModalRef.hide();
    } else {
      //console.log(data.event);
    }
  }

  applyCoupone(){
    var coupon =this.couponForm.value.coupon;
    var userID = this.allServ?.authServ?.getLoggedUser().id;
    this.allServ.api.applyCoupon({userId:userID,couponCode:coupon}).toPromise().then((data: any) => {
      if(data.statusCode =="403")
        this.allServ.toastr.error("Incorrect Coupon", "Incorrect Coupon")
      else{
        this.allServ.toastr.success("Congratulations coupon applied successfully!!")
        location.reload();
      }


  }).catch((e: any) => {
    console.log(e)
    this.allServ.toastr.error("Incorrect Coupon", "Incorrect Coupon")
    
  });

  }
}
