import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AllServicesService } from 'src/app/services/all-services.service';
import { AppConst } from 'src/app/shared/app-const';
import { trigger, style, animate, transition } from '@angular/animations';
import { fadeInAnimation } from 'src/app/animation/fadein.animation';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';
import { HttpParams } from '@angular/common/http';
declare const $: any;

@Component({
  selector: 'app-form-response',
  animations: [fadeInAnimation
  ],
  templateUrl: './form-response.component.html',
  styleUrls: ['./form-response.component.scss', '../../shared/form.scss']
})
export class FormResponseComponent implements OnInit {

  link;
  appConst;
  form;
  activeQuestion;
  formloader;
  surveyForm;
  surveyPayload: any = [];
  currentPage;
  maxPage;
  showWelcome;
  showThankYou;
  prevIndex;
  questionOption : any =[];
  questionIndex :any =[];
  pageQuestionIndex:any =[];
  nextIndex;
  bgtype;
  bgData;
  type;
  isNpsFeedBack;
  npsSelected;
  pageTypeConst = {
    welcome: 'welcome',
    question: 'question',
    submitted: 'submitted',
  }
  pageType = this.pageTypeConst.welcome;
  isPreview;
  hiddenAnswers;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  heightVar ="93%";
  theme;
  styleObj;
  //preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
  preferredCountries = [CountryISO.India, CountryISO.Canada];
  public countries = AppConst.countries;
  constructor(public allServ: AllServicesService, private route: ActivatedRoute) {
    this.appConst = AppConst;
  }

  ngOnInit(): void {
    this.pageType = this.pageTypeConst.welcome;
    this.link = this.route.snapshot.queryParams.link;
    this.isPreview = this.route.snapshot.queryParams.isPreview != null ? this.route.snapshot.queryParams.isPreview == 'true' : false;
    if (!this.link) {
      this.allServ.router.navigateByUrl("errorpage");
    }
    this.currentPage = 1;
    this.formInit();
    this.getFormForResponse();
    this.npsSelected =false;
  }

  getFormForResponse() {
    this.allServ.loader = true;
    let params = new HttpParams();
    Object.keys(this.route.snapshot.queryParams).forEach(key => {
     params = params.append(key,this.route.snapshot.queryParams[key]);
    });
   
   this.allServ.api.getFormQuestionForResponse(params).toPromise().then((data: any) => {
      this.form = data.data;
      this.showWelcome=this.form.welcomePageVisibility;
      this.showThankYou=this.form.thanksPageVisibility;
      this.maxPage = this.form.questionDTOList.length;
      this.hiddenAnswers= this.form.hiddenAnswerDto;
      if (this.maxPage == 0 || (!this.isPreview && this.form.visibilityStatus == AppConst.FORM_VISIBILITY_STATUS.STATUS_UNPUBLISH)) {
        this.allServ.router.navigateByUrl("/errorpage");
      }
      this.formInit();
      this.allServ.loader = false;
    }).catch((error: any) => {
      this.allServ.router.navigateByUrl("/errorpage");
      this.allServ.loader = false;
    });
  }

  formInit() {

    this.surveyForm = new FormGroup({
      formList: new FormArray([])
    });

    if (this.form && this.form.questionDTOList && this.form.questionDTOList.length != 0) {
      this.theme = this.form.theme;
      this.form.questionDTOList.forEach((o, i) => {
        this.questionIndex[o.questId]=i;
        this.pageQuestionIndex[i]=o.questId;
        if (o.questionTypeId == AppConst.QUESTION_TYPE.CHECK_BOX_ID) {

          let checkboxForm = new FormGroup({
            data: new FormControl(o),
            options: new FormArray([])
          });

          o.questionOptionDTOList.forEach((o2, i2) => {
            let checkboxOptionForm = new FormGroup({
              answer: new FormControl(null),
              other: new FormControl(null),
              data: new FormControl(o2),
              
            });
            (checkboxForm.controls.options as FormArray).push(checkboxOptionForm);
          });

          (this.surveyForm.controls.formList as FormArray).push(checkboxForm);


        } else if (o.questionTypeId == AppConst.QUESTION_TYPE.EMAIL) {
          let form = new FormGroup({
            answer: new FormControl(null, [Validators.email]),
            data: new FormControl(o)
          });
          (this.surveyForm.controls.formList as FormArray).push(form);
        } else if (o.questionTypeId == AppConst.QUESTION_TYPE.PHONE_NUMBER) {
          // let form = new FormGroup({
          //   answer: new FormControl(null, [Validators.pattern('^[0-9 ()+-]+$')]),
          //   //answer: new FormControl(null, [Validators.pattern('^([0-9]|#|\+|\*)+$')]),           
          //   data: new FormControl(o)
          // });
         
          
          let form = new FormGroup({
            answer: new FormControl(undefined, []),
            data: new FormControl(o)
          });
          (this.surveyForm.controls.formList as FormArray).push(form);
        }else if (o.questionTypeId == AppConst.QUESTION_TYPE.NPS) {
        
          let form = new FormGroup({
            answer: new FormControl(null, []),
            data: new FormControl(o),
            npsResponse: new FormControl(null)
          });
          (this.surveyForm.controls.formList as FormArray).push(form);
        } 
        
        else {

          let form = new FormGroup({
            answer: new FormControl(null, []),
            data: new FormControl(o)
          });
          (this.surveyForm.controls.formList as FormArray).push(form);
        }

      });
    }

    console.log(this.surveyForm);

  }

  handleCheckBox(formArrayIndex, AnswerValue, checkBoxValue) {
    console.log(formArrayIndex);
    console.log(AnswerValue);
    console.log(checkBoxValue);
  }

  getSurveyPayload() {
    this.surveyPayload = [];
    if(this.hiddenAnswers)
      this.surveyPayload = this.hiddenAnswers;
    this.surveyForm.value.formList.forEach((o, i) => {
      if (o.data.questionTypeId == AppConst.QUESTION_TYPE.CHECK_BOX_ID) {

        o.options.forEach((o2, i2) => {
          if (o2.answer && o2.answer != "") {
            this.surveyPayload.push($.extend(true, {}, {
              formId: this.form.id,
              questionId: o.data.id,
              answer: o2.data.id ? o2.data.questionOption :o.options[i2].other
            }));
          }
        });


      } else if(o.data.questionTypeId == AppConst.QUESTION_TYPE.PHONE_NUMBER){
        this.surveyPayload.push($.extend(true, {}, {
          formId: this.form.id,
          questionId: o.data.id,
          answer: o.answer.internationalNumber
        }));
      }else if (this.form.questionDTOList[this.currentPage-1].questionTypeId ==AppConst.QUESTION_TYPE.NPS &&
        this.surveyForm?.controls.formList.controls[this.currentPage-1].controls.npsResponse.value){
          let value =  this.surveyForm?.controls.formList.controls[this.currentPage-1].controls.answer.value +" :Comment :"+ this.surveyForm?.controls.formList.controls[this.currentPage-1].controls.npsResponse.value;
          this.surveyForm?.controls.formList.controls[this.currentPage-1].controls.answer.patchValue(value);
          this.surveyPayload.push($.extend(true, {}, {
            formId: this.form.id,
            questionId: o.data.id,
            answer: value
          }));
        }  
     
      else {
        if (o.answer && o.answer != "") {
          this.surveyPayload.push($.extend(true, {}, {
            formId: this.form.id,
            questionId: o.data.id,
            answer: o.answer
          }));
        }
      }
    });


    // this.form.questionDTOList.forEach((o, i) => {
    //   if (o.questionTypeId == AppConst.QUESTION_TYPE.CHECK_BOX_ID) {
    //     o.questionOptionDTOList.forEach((o2, i2) => {
    //       if (this.surveyForm.value.formList[i + i2].answer && this.surveyForm.value.formList[i + i2].answer != "") {
    //         let payload = $.extend(true, {}, this.surveyForm.value.formList[i + i2]);
    //         payload.answer = o2.questionOption;
    //         this.surveyPayload.push(payload);
    //       } else {
    //       }
    //     });
    //   } else {
    //     if (this.surveyForm.value.formList[i].answer && this.surveyForm.value.formList[i].answer != "") {
    //       this.surveyPayload.push($.extend(true, {}, this.surveyForm.value.formList[i]));
    //     }
    //   }
    // });
  }

  submitSurvey() {
   
    this.getSurveyPayload();
    if (!this.surveyPayload || this.surveyPayload.length == 0) {
      this.allServ.toastr.warning('Atleast one response needed!');
    } else {
      this.allServ.loader = true;
      this.allServ.api.addAnswer(this.surveyPayload).toPromise().then((data: any) => {
        this.pageType = this.pageTypeConst.submitted;
        this.allServ.loader = false;
        if(this.form.redirectUrl)
          window.location =this.form.redirectUrl,false;
      
      }).catch((error: any) => {
        this.allServ.loader = false;
      });
    }

  }

  next() {
  
    if (this.currentPage != this.maxPage) {
      
     var questId =  this.pageQuestionIndex[this.currentPage-1]
      if(this.questionOption[questId]){
          this.prevIndex =  this.currentPage ;
          let next = this.questionIndex[this.questionOption[questId]];
          this.currentPage = next>0 ? next+1:this.currentPage++;
       }      
       else{
         if(this.questionIndex[questId] && this.form.questionDTOList[this.currentPage-1].questionTypeId ==AppConst.QUESTION_TYPE.NPS &&
          this.surveyForm?.controls.formList.controls[this.currentPage-1].controls.npsResponse.value){
            let value =  this.surveyForm?.controls.formList.controls[this.currentPage-1].controls.answer.value +" :Comment :"+ this.surveyForm?.controls.formList.controls[this.currentPage-1].controls.npsResponse.value;
            this.surveyForm?.controls.formList.controls[this.currentPage-1].controls.answer.patchValue(value);
          }
        this.currentPage++;
        this.prevIndex =0;
      }
      this.type = this.surveyForm?.controls.formList.controls[this.currentPage-1].controls.data.value.backgroundType;
      this.bgtype = this.surveyForm?.controls.formList.controls[this.currentPage-1].controls.data.value.bgType;
      this.bgData = this.surveyForm?.controls.formList.controls[this.currentPage-1].controls.data.value.background;
      
        
    }
  }

  previous() {
    if (this.currentPage != 1) {
      
      if(this.prevIndex>0)
        this.currentPage=this.prevIndex;
      else
        this.currentPage--;
      this.prevIndex =0;
      this.type = this.surveyForm?.controls.formList.controls[this.currentPage-1].controls.data.value.backgroundType;
      this.bgtype = this.surveyForm?.controls.formList.controls[this.currentPage-1].controls.data.value.bgType;
      this.bgData = this.surveyForm?.controls.formList.controls[this.currentPage-1].controls.data.value.background;
      this.isNpsFeedBack =false
  
    }
  }

  handleKeyPress(evn) {
    if (evn.keyCode == 13) {
      switch (this.pageType) {
        case this.pageTypeConst.welcome:
          this.pageType = this.pageTypeConst.question;
          break;
        case this.pageTypeConst.question:
          if (this.currentPage == this.maxPage) {
            this.submitSurvey();
          } else {
            this.next();
          }
          break;
        case this.pageTypeConst.submitted:
          this.pageType = this.pageTypeConst.welcome;
          window.location.reload();
          break;
      }
    }
  }

  // again() {
  //   window.location.reload();
  // }

  start() {
    this.pageType = this.pageTypeConst.question;
     this.type = this.surveyForm?.controls.formList.controls[0].controls.data.value.backgroundType;
    this.bgtype = this.surveyForm?.controls.formList.controls[0].controls.data.value.bgType;
    this.bgData = this.surveyForm?.controls.formList.controls[0].controls.data.value.background;
  }

  // checkFormGroup() {
  //   console.log(this.surveyForm);
  // }

  setNPSFormControlValue(control, value) {
    this.npsSelected =true;
    control.patchValue({ answer: value });
  }

  selectionChange(selectedIndex,question,isRadio){
    if(selectedIndex == 0)
      return
      let nextQuestion = 0;
      if(isRadio)
          nextQuestion =selectedIndex;
      else
         nextQuestion = question.value.data.questionOptionDTOList[selectedIndex-1].nextQuestionId;

    var questId =  question.value.data.questId;
     if(this.questionOption[questId])
      delete this.questionOption[questId];
    this.questionOption[questId]=nextQuestion
   
  }

  getButtonStyle(){
    if(this.theme){
        if(this.theme.buttonTextColor){
          this.styleObj.color=this.theme.buttonTextColor;
        }
        if(this.theme.buttonColor){
          this.styleObj.backgroundColor=this.theme.buttonColor;
        }

    }
    return this.styleObj;
  }


}
