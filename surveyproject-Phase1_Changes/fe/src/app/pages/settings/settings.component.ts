import { fadeInAnimation } from 'src/app/animation/fadein.animation';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { AllServicesService } from 'src/app/services/all-services.service';
import { AppConst } from 'src/app/shared/app-const';
import { BsModalService } from 'ngx-bootstrap/modal';
import { UpgradeComponent } from '../upgrade/upgrade.component';
import { Observable, ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-settings',
  animations: [fadeInAnimation
  ],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  profileForm;
  brandingForm;
  passwordForm;
  billingform;
  profileFormLoader;
  passwordFormLoader;
  membershipLoader;
  appConst;
  user;
  logoData;
  constructor(
    private allServ: AllServicesService, private modalService: BsModalService) {
    this.appConst = AppConst;
  }

  ngOnInit(): void {
    this.initProfileForm();
    this.initPasswordForm();
   // this.initBrandingForm();
    this.getUser();
  }

  showUpgradeModal(){
    this.modalService.show(UpgradeComponent,{class: ".modal-xl"})
  }

  getUser() {
    this.allServ.loader = true;
    this.allServ.api.getUserById(this.allServ.authServ.getLoggedUser().id).toPromise().then((data: any) => {
      this.user = data.data;
      this.initProfileForm();
      this.allServ.loader = false;
    }).catch((error: any) => {
      this.allServ.loader = false;
    })

  }

  submitPasswordForm() {
    this.passwordFormLoader = true;
    this.allServ.api.updatePassword(this.passwordForm.value).toPromise().then((data: any) => {
      this.passwordFormLoader = false;
      this.allServ.toastr.success("Please Sign in again with your new password", "Password updated successfully", {
        timeOut: 15000,
        extendedTimeOut: 15000
      });
      this.allServ.authServ.destroyLoginSession();
    }).catch((e: any) => {
      this.passwordFormLoader = false;
    });
  }

  submitProfileForm() {
    this.profileFormLoader = true;
    this.allServ.api.updateUser(this.profileForm.value).toPromise().then((data: any) => {
      this.allServ.toastr.success("Profile updated successfully");
      this.profileFormLoader = false;
    }).catch((e: any) => {
      this.profileFormLoader = false;
    });
  }
  cancelBilling() {
    if(!this.user.cancelUrl){
      this.updateCancelMembership();
      return;
    }
    this.membershipLoader = true;
    this.allServ.api.cancelBilling(this.user.cancelUrl).toPromise().then((data: any) => {
      this.updateCancelMembership()
    }).catch((e: any) => {
      this.membershipLoader = false;
      this.allServ.toastr.error("Error in cancelling subscription");
    });
  }

  updateCancelMembership(){
    this.allServ.api.cancelBillingUpdate(this.user).toPromise().then((data: any)=>{
      this.allServ.toastr.success("Your Next subscription cancelled");

      this.membershipLoader = false;
      })
  }

  initProfileForm() {
    this.profileForm = new FormGroup({
      id: new FormControl(this.allServ.authServ.getLoggedUser().id),
      firstName: new FormControl(this.user ? this.user.firstName : null, [Validators.required, Validators.maxLength(100)]),
      lastName: new FormControl(this.user ? this.user.lastName : null, [Validators.maxLength(100)])
    });
  }

  initPasswordForm() {
    this.passwordForm = new FormGroup({
      id: new FormControl(this.allServ.authServ.getLoggedUser().id),
      password: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(30)]),
      reTypePassword: new FormControl(null)
    }, ReTypePasswordValidator);
  }
 
  handleKeyPressProfileForm(evn) {
    if (evn.keyCode == 13 && !this.profileFormLoader && this.profileForm.valid) {
      this.submitProfileForm();
    }
  }

  handleKeyPressPasswordForm(evn) {
    if (evn.keyCode == 13 && !this.passwordFormLoader && this.passwordForm.valid) {
      this.submitPasswordForm();
    }
  }

  uploadFile(evt) {
    let payload = new FormData();
  var fileData = evt.target.files[0];
  if(fileData.size > (10 *1024 *1024))
  this.allServ.toastr.error("Maximum allowed size is 10mb.")
  
  if(!(fileData.type.startsWith("image") || fileData.type.startsWith("video")))
  this.allServ.toastr.error("Currently supported format is video and Image.")
  let data;
  
  this.convertFile(fileData).subscribe((response) =>{
   // payload.append("file",fileData);
  this.logoData=response;
  payload.append("id",this.user.id);
  payload.append("type",fileData.type);
  payload.append("encodedFileData",this.logoData)


  this.allServ.api.setBrandLogo(payload).toPromise().then((_data: any) => {
    if(_data.statusCode == 201){
     this.user =_data.data;
      this.allServ.toastr.success(_data.message);
    }else{
      this.allServ.toastr.warning(_data.message);
    }
  }).catch((_error: any) => {
    this.allServ.toastr.error("Error while setting custom logo");
  })
  });
  
  }
  convertFile(file : File) : Observable<any> {
    const result = new ReplaySubject<any>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event) => result.next(btoa(event.target.result.toString()));
    return (result);
  }

  resetCustomLogo(){
    let payload = new FormData();
   
  payload.append("id",this.user.id);
  payload.append("type","");
  payload.append("encodedFileData","")


  this.allServ.api.setBrandLogo(payload).toPromise().then((_data: any) => {
    if(_data.statusCode == 201){
     this.user =_data.data;
      this.allServ.toastr.success("Image resetted Successfully");
    }else{
      this.allServ.toastr.warning(_data.message);
    }
  }).catch((_error: any) => {
    this.allServ.toastr.error("Error while setting custom logo");
  })
  }

}

function ReTypePasswordValidator(findForm: AbstractControl): { [s: string]: boolean } {
  if (findForm.get('password').value !== findForm.get('reTypePassword').value) {
    return { isReTypePasswordNotSame: true };
  }
  return null;
}

