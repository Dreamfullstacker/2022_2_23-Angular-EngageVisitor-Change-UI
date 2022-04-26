import { Component, OnInit } from '@angular/core';
import { AppConst } from 'src/app/shared/app-const';
import { AllServicesService } from 'src/app/services/all-services.service';


@Component({
  selector: 'app-publish_unPublish',
  templateUrl: './publish_unpublish.html'
})
export class PuUnblishCustomComponent implements OnInit {
  data: any;
  params: any;
  formList;
  resultId: any;
  visibilityStatusSTR='PUBLISHED';
  constructor(public allServ: AllServicesService) {}

  agInit(params) {
    this.params = params;
    this.data = params.value;
  }

  ngOnInit() {
    let rowData = this.params;
    let i = rowData.rowIndex;
    let data = window.localStorage.getItem('MyArray')
    let datas = JSON.parse(data)
    this.visibilityStatusSTR = datas[i].visibilityStatusSTR
    console.log(rowData);
  //  let datArray = datas[i];
 
  }


 getFormList() {
   // this.allServ.loader = true;
    this.allServ.api
      .getAllFormByUserId(this.allServ.authServ.getLoggedUser().id)
      .toPromise()
      .then((data: any) => {
        this.formList = data.dataList;
        let rowData = this.params;
        let i = rowData.rowIndex;
        //let data = window.localStorage.getItem('MyArray')
        //let datas = JSON.parse(data)
        this.visibilityStatusSTR = this.formList[i].visibilityStatusSTR
         // let array = this.formList.toString();
        window.localStorage.setItem('MyArray', JSON.stringify(this.formList));
     //   this.allServ.loader = false;
      })
      .catch((error: any) => {
       // this.allServ.loader = false;
        this.allServ.toastr.error('Internal Server Error');
      });
  }

  editPublish() {
    let rowData = this.params;
    let i = rowData.rowIndex;
    console.log(rowData);
    alert();
  }
 publishUnpublishForm(currentForm) {
    this.allServ.loader = true;
    if (
      currentForm &&
      currentForm.visibilityStatus ==
        AppConst.FORM_VISIBILITY_STATUS.STATUS_PUBLISH
    ) {
      this.allServ.loader = true;
      this.allServ.api
        .unpublishForm(currentForm)
        .toPromise()
        .then((data: any) => {
          this.allServ.toastr.info('Form has been unpublished.');
          this.getFormList();
          this.allServ.loader = false;
        })
        .catch((error: any) => {
          this.allServ.loader = false;
        });
    } else {
      this.allServ.loader = true;
      this.allServ.api
        .publishForm(currentForm)
        .toPromise()
        .then((data: any) => {
          this.allServ.toastr.info('Form has been published.');
          this.getFormList();
          this.allServ.loader = false;
        })
        .catch((error: any) => {
          this.allServ.loader = false;
        });
    }

    this.allServ.loader = false;
  }

  viewPublish() {
    let rowData = this.params;
    let i = rowData.rowIndex;
    let data = window.localStorage.getItem('MyArray')
    let datas = JSON.parse(data)
    console.log(rowData);
    let datArray = datas[i];
    this.publishUnpublishForm(datArray);
    this.visibilityStatusSTR = datas[i].visibilityStatusSTR
    window.localStorage.setItem('visibilityStatusSTR', this.visibilityStatusSTR)
  }
}
