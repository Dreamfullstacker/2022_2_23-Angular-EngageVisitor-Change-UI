import { Component, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable, Subscription } from 'rxjs';
import { fadeInAnimation } from 'src/app/animation/fadein.animation';
import { AllServicesService } from 'src/app/services/all-services.service';
import { AppConst } from 'src/app/shared/app-const';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
declare const $: any;

@Component({
  selector: 'app-user-header',
  animations: [fadeInAnimation
  ],
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss']
})
export class UserHeaderComponent implements OnInit, OnDestroy {

  appConst;
  initials;
  deleteLoader;
  isPremium;
  questionModal:any;

  constructor(private renderer: Renderer2,
    public allServ: AllServicesService, private elementRef: ElementRef , private modalService: BsModalService) {
    this.appConst = AppConst;
    this.allServ.shared.loadAdminLteCss();
    this.allServ.shared.loadAdminlteScript();
    this.allServ.shared.loadReadMoreScript();
    this.allServ.shared.loadCSVExportScript();

  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#f4f6f9';
  }

  showQuestionModal() {

    this.questionModal.modal({ backdrop: 'static', keyboard: false });
  }

  cancelQuestionModal() {
    this.questionModal.modal('hide');

    }

  ngOnInit(): void {
    this.questionModal = $("#addQuestionModal1234");
    this.allServ.api.checkAccess(this.allServ.authServ.getLoggedUser()).toPromise().then(((data: any) => {
      this.allServ.loader = false;
      this.isPremium =data.data;
    })).catch((error: any) => {
      this.allServ.loader = false;
      this.allServ.toastr.error("Internal Server Error");
    });
    // this.renderer.removeClass(document.body, 'layout-top-nav');
    // this.renderer.removeClass(document.body, 'hold-transition');
    // this.renderer.removeClass(document.body, 'sidebar-mini');
    // this.renderer.removeClass(document.body, 'layout-fixed');
    // this.renderer.removeClass(document.body, 'layout-footer-fixed');
    // this.renderer.removeClass(document.body, 'layout-navbar-fixed');

    // this.renderer.addClass(document.body, 'layout-top-nav');


    // this.renderer.addClass(document.body, 'hold-transition');
    // this.renderer.addClass(document.body, 'sidebar-mini');
    // this.renderer.addClass(document.body, 'layout-fixed');
    // this.renderer.addClass(document.body, 'layout-footer-fixed');
    // this.renderer.addClass(document.body, 'layout-navbar-fixed');



    let name = this.allServ.authServ.getLoggedUser().name;
    this.initials = name.split(' ').map(function (str) { return str ? str[0].toUpperCase() : ""; }).join('');









  }
  showUpgradeModal(){
    this.modalService.show(UpgradeComponent,{class: ".modal-xl"})
  }

  previewForm() {

  }

  publishUnpublishForm() {

  }

  logout() {
    this.allServ.loader = true;
    this.deleteLoader = true;
    this.allServ.api.logout().toPromise().then(d => {
      this.allServ.authServ.destroyLoginSession();
      this.deleteLoader = false;
      this.questionModal.modal('hide');
      this.allServ.loader = false;
    }).catch(e => {
      this.allServ.loader = false;
      this.deleteLoader = false;
      this.allServ.toastr.error("Unable to logout at this moment. Please try again later.", "Internal Server Error.");
      this.questionModal.modal('hide');
    });
  }

  ngOnDestroy() {
    this.deleteLoader = null;
    // this.renderer.removeClass(document.body, 'layout-top-nav');
    // this.renderer.removeClass(document.body, 'hold-transition');
    // this.renderer.removeClass(document.body, 'sidebar-mini');
    // this.renderer.removeClass(document.body, 'layout-fixed');
    // this.renderer.removeClass(document.body, 'layout-footer-fixed');
    // this.renderer.removeClass(document.body, 'layout-navbar-fixed');
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'white';



  }

}
