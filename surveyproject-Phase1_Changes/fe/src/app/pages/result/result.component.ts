import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fadeInAnimation } from 'src/app/animation/fadein.animation';
import { AllServicesService } from 'src/app/services/all-services.service';
import { AppConst } from 'src/app/shared/app-const';
declare const $: any;
declare const CSVExport: any;

@Component({
  selector: 'app-result',
  animations: [fadeInAnimation
  ],
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  formId;
  form;
  appConst;
  answerList;
  answer;
  downloadLoader;
  date = new Date();
  downloadSingleLoader;
  selectedEndUserId;
  totalResponses;
  question=[];
  answers=[];
  columnDefs = [
    // { field: 'id' },
    // { field: 'userId' },
    { field: 'createdDateStr', headerName: 'Answer Date' }
  ];

  columnDefs1 = [
    // { field: 'id' },
    // { field: 'userId' },
    { field: 'createdDateStr', headerName: 'Answer Date' },
    // { field: 'question' },
    // { field: 'description' },
    // { field: 'answer' , headerName: 'Answer' }
  ]
  gridApi: any;

  constructor(public allServ: AllServicesService, private route: ActivatedRoute) {
    this.appConst = AppConst;
  }

  ngOnInit(): void {
    this.formId = this.route.snapshot.queryParams.formId;
    this.getAnswerList();
    this.getForm();
    //$('[data-toggle="tooltip"]').tooltip();
  }

  getForm() {
    this.allServ.loader = true;
    this.allServ.api.getFormById(this.formId).toPromise().then((data: any) => {
      this.form = data.data;
      this.allServ.loader = false;
    }).catch((error: any) => {
      this.allServ.loader = false;
    });
  }


  getAnswerList() {
    this.allServ.loader = true;
    this.allServ.api.getAllAnswerDetailByFormId(this.formId).toPromise().then((data: any) => {
      if(data && data.statusCode &&  data.statusCode == "403" ){
        this.allServ.toastr.warning(data.message, "Access Error");
      }
      this.totalResponses= data.data.length;
      this.answerList = data.data;
     this.onSelectionChanged(this.answerList[0].id);
      this.allServ.loader = false;
    }).catch((error: any) => {
      this.allServ.loader = false;
    });
  }

  onSelectionChanged(event) {
    this.getAnswerDetail(event);
  }

  onGridReady(params) {
    this.gridApi = params.api;
    var columnDefs = this.gridApi.getColumnDefs();
    
    this.answer =this.answerList;
    for(let i=0;i<this.answerList.length;i++){
      columnDefs.push({ field: this.question[i] ,headerName:this.question[i]})
      for(let j=0;j<this.answerList[i].questionDTOList.length;j++){
        
        this.answer[i][this.question[j]] =this.answerList[i].questionDTOList[j].answer
       
      }
      
    }
      this.columnDefs1 = columnDefs; 
 }

  getAnswerDetail(endUserId) {
    this.selectedEndUserId = endUserId;
    console.log(this.allServ.authServ.getLoggedUser());
    this.allServ.loader = true;
    this.allServ.api.getAnswerDetailByEndUserIdAndFormId(endUserId, this.formId).toPromise().then((data: any) => {
      this.answer = null;
      setTimeout(() => {
       this.answer = data.data;
       
      
        data.data.filter((e:any)=>this.question.push(e.question))
        this.allServ.loader = false;
      }, 10)

    }).catch((error: any) => {
      this.allServ.loader = false;
    });
  }

  downloadAllResponses() {
    this.downloadLoader = true;
    let responses: any = [];
    let count = 0;
    this.allServ.api.getAllAnswerDetailByFormId(this.formId).toPromise().then((data: any) => {
      if(data && data.statusCode &&  data.statusCode == "403" ){
        this.allServ.toastr.warning(data.message, "Access Error");
      }
      data.data.forEach((o, i) => {

        o.questionDTOList.forEach((o2, j) => {

          let response: any = {};
          response.s_no = ++count;
          response.form_title = this.form.title;
          response.form_description = this.form.description;
          response.response_id = o.id;
          response.response_date = o.createdDateStr;
          response.title = o.title;
          response.question = o2.question;
          response.question_description = o2.description;
          response.answer = ""

          o2.answerDTOList.forEach((o3, k) => {
            if (response.answer == "") {
              response.answer = o3.answer;
            } else {
              response.answer = response.answer + " | " + o3.answer;
            }
          });

          responses.push(response);

        });

      });

    }).catch((error: any) => {
      this.downloadLoader = false;
      count = 0;
    }).finally(() => {
      count = 0;
      this.downloadLoader = false;
      let id = window.localStorage.getItem('id');
      var x = new CSVExport(responses, responses[0].form_title + "_" + this.date + "_" + id);
      return false;
    });


  }

  downloadResponse() {
    this.downloadSingleLoader = true;
    let responses: any = [];
    let count = 0;
    this.answer.forEach((m, j) => {
      m.questionDTOList.forEach((o,j)=>{
      let response: any = {};
      response.s_no = ++count;
      response.form_title = this.form.title;
      response.form_description = this.form.description;
      response.response_id = this.selectedEndUserId;
      response.response_date = o.createdDateStr;
      response.question = o.question;
      response.question_description = o.description;
      response.answer = ""

      o.answerDTOList.forEach((o2, j) => {
        if (response.answer == "") {
          response.answer = o2.answer;
        } else {
          response.answer = response.answer + " | " + o2.answer;
        }
      });
      responses.push(response);
    })
    });
    count = 0;
    this.downloadSingleLoader = false;
    let id = window.localStorage.getItem('id');
    var x = new CSVExport(responses, responses[0].form_title + "_" + this.date + "_" + id);
    return false;
  }

}
