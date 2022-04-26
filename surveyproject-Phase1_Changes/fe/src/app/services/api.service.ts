import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  authBasePath = 'auth';
  questionAPIBasePath = "question";
  answerAPIBasePath = "answer";
  formAPIBasePath = "form";
  masterAPIBasePath = "master"
  userAPIBasePath = "user";
  dbAPIBasePath = "db";
  openAPIBasePath = "open";
  constructor(private http: HttpClient) { }

  //******************Auth API***********************//
  login(user: User) {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(user.email + ':' + user.password) });
    return this.http.post(`${environment.api}/${this.authBasePath}/login`, null, { headers });
  }

  logout() {
    return this.http.post(`${environment.api}/${this.authBasePath}/logout`, null);
  }

  //******************User API***********************//
  getUserById(userId) {
    return this.http.get(`${environment.api}/${this.userAPIBasePath}/getUserById/${userId}`);
  }

  createUser(data) {
    return this.http.post(`${environment.api}/${this.openAPIBasePath}/${this.userAPIBasePath}/createUser`, data);
  }

  updateUser(data) {
    return this.http.post(`${environment.api}/${this.userAPIBasePath}/updateUser`, data);
  }

  updatePassword(data) {
    return this.http.post(`${environment.api}/${this.userAPIBasePath}/updatePassword`, data);
  }

  forgotPassword(data) {
    return this.http.post(`${environment.api}/${this.openAPIBasePath}/${this.userAPIBasePath}/forgotPassword`, data);
  }
  setBrandLogo(data){
    return this.http.post(`${environment.api}/${this.userAPIBasePath}/setBrandLogo`, data);
  }
  //******************Form API***********************//

  getAllFormByUserId(userId) {
    return this.http.get(`${environment.api}/${this.formAPIBasePath}/getAllFormByUserId/${userId}`);
  }

  getAllTemplateList() {
    return this.http.post(`${environment.api}/${this.formAPIBasePath}/getAllTemplates`,{});
  }

  getFormById(formId) {
    return this.http.get(`${environment.api}/${this.formAPIBasePath}/getFormById/${formId}`);
  }

  createForm(data) {
    return this.http.post(`${environment.api}/${this.formAPIBasePath}/createForm`, data);
  }

  renameForm(data) {
    return this.http.post(`${environment.api}/${this.formAPIBasePath}/renameForm`, data);
  }

  publishForm(data) {
    return this.http.post(`${environment.api}/${this.formAPIBasePath}/publishForm`, data);
  }

  unpublishForm(data) {
    return this.http.post(`${environment.api}/${this.formAPIBasePath}/unpublishForm`, data);
  }

  deleteForm(data) {
    return this.http.post(`${environment.api}/${this.formAPIBasePath}/deleteForm`, data);
  }
  saveTheme(data) {
    return this.http.post(`${environment.api}/${this.formAPIBasePath}/saveTheme`, data);
  }
  removeTheme(data) {
    return this.http.post(`${environment.api}/${this.formAPIBasePath}/removeTheme`, data);
  }
  deleteDefaultPage(data) {
    return this.http.post(`${environment.api}/${this.formAPIBasePath}/deleteDefaultPage`, data);
  }
  //******************Question API***********************//

  getAllQuestionByFormId(formId) {
    return this.http.get(`${environment.api}/${this.questionAPIBasePath}/getAllQuestionByFormId/${formId}`);
  }

  getQuestionDetailByQuestionId(questionId) {
    return this.http.get(`${environment.api}/${this.questionAPIBasePath}/getQuestionDetailByQuestionId/${questionId}`);
  }

  hideShowQuestion(data) {
    return this.http.post(`${environment.api}/${this.questionAPIBasePath}/hideShowQuestion`,data);
  }

  getFormQuestionForResponse(formLink) {
    return this.http.get(`${environment.api}/${this.openAPIBasePath}/${this.questionAPIBasePath}/getFormQuestionForResponse?${formLink}`);
  }

  addQuestion(data) {
    return this.http.post(`${environment.api}/${this.questionAPIBasePath}/addQuestion`, data);
  }
  checkAccess(data) {
    return this.http.post(`${environment.api}/${this.userAPIBasePath}/checkAccess`, data);
  }

  editQuestion(data) {
    return this.http.post(`${environment.api}/${this.questionAPIBasePath}/editQuestion`, data);
  }

  deleteQuestion(data) {
    return this.http.post(`${environment.api}/${this.questionAPIBasePath}/deleteQuestion`, data);
  }
   
  reArrangeQuestion(data){
    return this.http.post(`${environment.api}/${this.questionAPIBasePath}/reArrangeQuestion`, data);
  }

  uploadFile(data){
    return this.http.post(`${environment.api}/${this.formAPIBasePath}/uploadFile`, data);
  }

  //******************Answer API***********************//

  getAllAnswerByFormId(formId) {
    return this.http.get(`${environment.api}/${this.answerAPIBasePath}/getAllAnswerByFormId/${formId}`);
  }

  getAllAnswerDetailByFormId(formId) {
    return this.http.get(`${environment.api}/${this.answerAPIBasePath}/getAllAnswerDetailByFormId/${formId}`);
  }

  getAnswerDetailByEndUserIdAndFormId(endUserId, formId) {
    return this.http.get(`${environment.api}/${this.answerAPIBasePath}/getAnswerDetailByEndUserIdAndFormId/${endUserId}/${formId}`);
  }

  addAnswer(data) {
    return this.http.post(`${environment.api}/${this.openAPIBasePath}/${this.answerAPIBasePath}/addAnswer`, data);
  }

  //******************Master API***********************//

  getQuestionType() {
    return this.http.get(`${environment.api}/${this.masterAPIBasePath}/getQuestionType`);
  }

  cancelBilling(url){
    return this.http.get(url);
  }
  cancelBillingUpdate(data){
    return this.http.post(`${environment.api}/${this.userAPIBasePath}/cancelBilling`, data);
  }

  applyCoupon(data){
    return this.http.post(`${environment.api}/${this.userAPIBasePath}/applyPromo`, data);
  }

  getDatabaseRecords(query){
    return this.http.post(`${environment.api}/${this.dbAPIBasePath}/getData`, query);
  }



}
