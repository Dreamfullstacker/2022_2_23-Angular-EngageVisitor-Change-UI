import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AllServicesService } from 'src/app/services/all-services.service';

@Component({
  selector: 'app-db-component',
  templateUrl: './db-component.component.html',
  styleUrls: ['./db-component.component.scss']
})
export class DbComponentComponent implements OnInit {

  constructor(public allServ: AllServicesService) { }
  queryForm;
  columns;
  dataRows;
 // declare const $: any;
  ngOnInit(): void {


    this.queryForm = new FormGroup({
      query: new FormControl( null, Validators.required)
    });


    // this.allServ.api.getDatabaseRecords({query:"select * from user"}).toPromise()
    // .then((data: any) => {
    //  console.log(data)
    // })
    // .catch((error: any) => {
    //   this.allServ.toastr.info('You are not aauthorize to view db Details');
    //  // this.themeLoader = false;
    // });
  }



  executeQuery(){
    
    this.allServ.api.getDatabaseRecords({query:this.queryForm.value.query}).toPromise().then((data: any) => {
     //console.log(data)

     this.dataRows = data;
    // this.columns = this.getKeys(data[0]);
   }).catch((e: any) => {
    console.log(e)
    if(e.status =="403")
    this.allServ.toastr.error( "You dont have access to execute query.","You dont have access",)
    else
    this.allServ.toastr.error(e.message,"Error in Query")
    
  });

  }
   getKeys(obj: any): Array<string> {
    return Object.keys(obj);
  }

}
