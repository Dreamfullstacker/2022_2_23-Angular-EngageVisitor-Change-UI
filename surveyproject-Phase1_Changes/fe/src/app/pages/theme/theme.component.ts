import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Observable, ReplaySubject } from 'rxjs';
import { AllServicesService } from 'src/app/services/all-services.service';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit {

  public theme;
  public formId;
  imageData
  themeLoader;
  constructor(public _bsModalRef: BsModalRef,public allServ: AllServicesService,) { }


  ngOnInit(): void {
  }

  onClose():void {
    console.log('closed');
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
  this.imageData=response;
  payload.append("id",this.formId);
  payload.append("type",fileData.type);
  payload.append("encodedFileData",this.imageData)


  this.allServ.api.uploadFile(payload).toPromise().then((_data: any) => {
    this.theme.backgroundData =this.imageData;
  }).catch((_error: any) => {
    
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
  saveTheme(){

    // this.allServ.api.saveTheme(this.theme).toPromise().then((data: any) => {
    //   this.allServ.toastr.info("Theme Has been updated");
    //   this.themeLoader = false;
    //   this._bsModalRef.hide();
    // }).catch((error: any) => {
    //   this.allServ.toastr.info("error while saving theme");
    //   this._bsModalRef.hide();
    // });
  }
  cancelThemeModal(){
    this._bsModalRef.hide();
  }


  updateButtonColor(event){
    console.log(event)
    this.theme.buttoncolor=event
  }

  updateQuestionColor(event){
    this.theme.questionColor =event;
  }
  updateAnswerColor(event){
    this.theme.answerColor =event;
  }
  updateButtonTextColor(event){
    this.theme.buttonTextColor =event;
  }
  updateBackGroundColor(event){
    this.theme.bgColor =event;
  }
  opacityChange(event){
    this.theme.opacity=event.target.value;
  }

  changeFonts(event){
    this.theme.font =event.family;
    console.log(event)
  }

}
