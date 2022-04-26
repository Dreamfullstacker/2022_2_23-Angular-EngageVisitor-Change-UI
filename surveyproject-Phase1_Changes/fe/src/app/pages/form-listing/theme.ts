import { Component, OnInit } from '@angular/core';
import { AllServicesService } from 'src/app/services/all-services.service';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.html'
})
export class ThemeCustomComponent implements OnInit {
  data: any;
  params: any;
  form: any;
  formList: any;
  color: any;

  constructor(public allServ: AllServicesService) {}

  agInit(params) {
    this.params = params;
    this.data = params.value;
     let rowData = this.params;
        let i = rowData.rowIndex;
        let data = window.localStorage.getItem('MyArray')
        let datas = JSON.parse(data)
        //let formList = datas;
        //let array = this.formList.toString();
        this.form = datas[i];
    this.getFormList();
  }

  ngOnInit() {


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
        //let array = this.formList.toString();
        this.color = this.formList[i].theme.bgColor;
        console.log(this.color);
        window.localStorage.setItem('MyArray', JSON.stringify(this.formList));
        //this.allServ.loader = false;
      })
      .catch((error: any) => {
       // this.allServ.loader = false;
        // this.allServ.toastr.error('Internal Server Error');
      });
  }

  editTheme() {
    let rowData = this.params;
    let i = rowData.rowIndex;
    console.log(rowData);
   // alert();
  }

  viewTheme() {
    let rowData = this.params;
    console.log(rowData);
    //alert();
  }
}
