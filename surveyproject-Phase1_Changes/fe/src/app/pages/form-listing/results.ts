import { Component, OnInit } from '@angular/core';
import { AllServicesService } from 'src/app/services/all-services.service';

@Component({
  selector: 'app-result',
  templateUrl: './results.html'
})
export class ResultsCustomComponent implements OnInit {
  data: any;
  params: any;
  formList;
  resultId:any;
  id = -1;
  totalResponse = 0;
  constructor(public allServ: AllServicesService) {}

  agInit(params) {
    console.log(params.colDef.field)
    console.log(params.data.Name)
    //this.getFormList();

    this.params = params;
    this.data = params.value;
    this.id = params.data.id;
    this.totalResponse = params.data.totalResponse;

  }

  ngOnInit() {
  //this.getFormList();
  }

 getFormList() {
   // this.allServ.loader = true;
    this.allServ.api
      .getAllFormByUserId(this.allServ.authServ.getLoggedUser().id)
      .toPromise()
      .then((data: any) => {
        this.formList = data.dataList;
     // let array = this.formList.toString();
     //   this.allServ.loader = false;
      })
      .catch((error: any) => {
       // this.allServ.loader = false;
        this.allServ.toastr.error('Internal Server Error');
      });
  }

 // edit() {
 //   let rowData = this.params;
 //   let i = rowData.rowIndex;
 //   console.log(rowData);
 //   alert();
 // }

  viewResults() {
    let rowData = this.params;
    let i = rowData.rowIndex;
    this.allServ.router.navigate(['/form-result'], { queryParams:{ formId: this.id} });
  }
}
