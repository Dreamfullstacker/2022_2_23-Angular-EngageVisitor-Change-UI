import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { fadeInAnimation } from 'src/app/animation/fadein.animation';
import { AllServicesService } from 'src/app/services/all-services.service';
import { AppConst } from 'src/app/shared/app-const';
import { environment } from 'src/environments/environment';
declare const $: any;

@Component({
  selector: 'app-share',
  animations: [fadeInAnimation
  ],
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss']
})
export class ShareComponent implements OnInit {

  formId;
  formLink;
  embedLink;
  form;
  appConst;
  publishLoader;
  env;
  detailForm;
  showLink =true;
  constructor(public allServ: AllServicesService, private route: ActivatedRoute) {
    this.appConst = AppConst;
    this.env = environment;
  }

  initShareForm() {
   
    let group={}    
    this.form.questionDTOList.forEach(question=>{
      this.showLink =false;
      group[question?.id]=new FormControl(null,Validators.required);  
    })
    this.detailForm = new FormGroup(group);
  }
  ngOnInit(): void {
    this.formId = this.route.snapshot.queryParams.formId;
    this.getForm();
    $('[data-toggle="tooltip"]').tooltip();

   // this.initShareForm()
    // $('[data-toggle="tooltip"]').tooltip();

  }
 
  createShareLink(){
    
    if (!this.detailForm.valid) {
      alert("Please add all hidden fields");
    } else {
      this.showLink=true;
    
      Object.keys(this.detailForm.controls).forEach(key => {
        this.formLink+= "&"+key+"="+this.detailForm.controls[key].value
      });
     
    }
  }

  getForm() {
    this.allServ.loader = true;
    this.allServ.api.getFormById(this.formId).toPromise().then((data: any) => {
      this.form = data.data;
      this.formLink = `${window.location.protocol}//${window.location.host}/${environment.basepath != '' ? (environment.basepath + '/') : ''
        }form-response?link=${this.form.formLink}`;
      this.embedLink = `<iframe width="720" height="500" frameborder="1" allowfullscreen src="${this.formLink}"></iframe>`;
      this.initShareForm()
      this.allServ.loader = false;
   
    }).catch((error: any) => {
      this.allServ.loader = false;
    });
  }

  copyLink() {

    const el = document.createElement('textarea');
    el.value = this.formLink;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);


    // $('<input>').val(this.formLink).appendTo('body').select()
    // document.execCommand('copy');
    // document.body.removeChild();
    this.allServ.toastr.info("Link copied.")
  }
  copyEmbedLink() {

    const el = document.createElement('textarea');
    el.value = this.embedLink;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    this.allServ.toastr.info("Link copied.")
  }

  publishUnpublishForm() {
    if (this.form && this.form.visibilityStatus == AppConst.FORM_VISIBILITY_STATUS.STATUS_PUBLISH) {
      this.allServ.loader = true;
      this.allServ.api.unpublishForm({ id: this.formId }).toPromise().then((data: any) => {
        this.getForm();
        this.allServ.loader = false;
      }).catch((error: any) => {
        this.allServ.loader = false;
      });
    } else {
      this.allServ.loader = true;
      this.allServ.api.publishForm({ id: this.formId }).toPromise().then((data: any) => {
        this.getForm();
        this.allServ.loader = false;
      }).catch((error: any) => {
        this.allServ.loader = false;
      });
    }
  }

  setToolTip() {
    // $('[data-toggle="tooltip"]').tooltip('dispose');
    // $('[data-toggle="tooltip"]').tooltip();
  }



}
