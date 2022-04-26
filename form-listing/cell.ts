import { Component, OnInit } from '@angular/core';
import { AllServicesService } from 'src/app/services/all-services.service';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.html'
})
export class CellCustomComponent implements OnInit {
  data: any;
  params: any;
  formList;
  icon: string;
  id= -1;
  constructor(public allServ: AllServicesService) {}

  agInit(params) {
    console.log(params.colDef.field)
    console.log(params.data.Name)
    // this.getFormList();

    this.params = params;
    this.data = params.value;
    this.icon = this.params.icon || null;
    this.id = params.data.id;
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
        window.localStorage.setItem('MyArray', JSON.stringify(this.formList));
     //   this.allServ.loader = false;
      })
      .catch((error: any) => {
       // this.allServ.loader = false;
        //this.allServ.toastr.error('Internal Server Error');
      });
  }

  share(){
    let rowData = this.params;
    let i = rowData.rowIndex;
    this.allServ.router.navigate(['/form-share'], { queryParams:{ formId: this.id} });
  }

  rename() {
    let rowData = this.params;
    let i = rowData.rowIndex;
    console.log(rowData, i);
    //alert('rename');
    this.params.context.renameFormModal(this.id)
  }

  deleteRow() {
    let rowData = this.params;
    let i = rowData.rowIndex;
    console.log(rowData, i);
    this.params.context.deleteFormModal(this.id)

  }

  edit() {
    let rowData = this.params;
    let i = rowData.rowIndex;
    this.allServ.router.navigate(['/form-create'], { queryParams:{ formId: this.id} });
  }
}
