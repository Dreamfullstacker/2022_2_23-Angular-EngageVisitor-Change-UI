import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AllServicesService } from 'src/app/services/all-services.service';
import { fadeInAnimation } from 'src/app/animation/fadein.animation';
import { AppConst } from 'src/app/shared/app-const';
import { ColDef } from 'ag-grid-community';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ThemeComponent } from '../theme/theme.component';
import { CellCustomComponent } from './cell';
import { PuUnblishCustomComponent } from './publish_unPublish';
import { ResultsCustomComponent } from './results';
import { ThemeCustomComponent } from './theme';
import { environment } from 'src/environments/environment';
import { wind } from 'ngx-bootstrap-icons';

declare const $: any;

@Component({
  selector: 'app-form-listing',
  animations: [fadeInAnimation],
  templateUrl: './form-listing.component.html',
  styleUrls: ['./form-listing.component.scss'],
})
export class FormListingComponent implements OnInit {
  deleteLoader;
  formLoader;
  formModal;
  formDeleteModal;
  formForm;
  formList;
  form;
  templates;
  selectedTemplate;
  title = 'custom-theme';
  columnDefs = (() => {
    var columns = [
      {
        headerClass: 'text-bold',
        field: 'Name',
        filter: true,
        sortable: true,
        width: 200
      },
    ];
    var additionalColumns = 'Message'.split(',').map((letter) => ({
      field: letter,
    }));
    additionalColumns.forEach((e: any) => {
      e.field = e.field;
      e.filter = true;
      e.sortable = true;
    });


    var themeColumn = {
      field: 'Theme',
      filter: true,
      sortable: true,
      cellRendererFramework: ThemeCustomComponent,
    };

    additionalColumns.push(themeColumn);

    additionalColumns = [];

    var resultsColumn = {
      headerClass: 'text-center',
      cellStyle: {textAlign: 'center'},
      field: 'Results',
      width: 170,
      cellRendererFramework: ResultsCustomComponent,
    };

    additionalColumns.push(resultsColumn);

    var publishUnpublishColumn = {
      headerClass: 'text-center',
      cellStyle: {textAlign: 'center'},
      field: 'Publish',
      cellClass: "grid-cell-centered",
      width: 170,
      cellRendererFramework: PuUnblishCustomComponent,
    };

    additionalColumns.push(publishUnpublishColumn);

    var acnames = ['Share', 'Rename', 'Edit', 'Delete'];
    for(var i= 0; i < acnames.length; i++) {
      var actionColumn = {
        headerClass: 'text-center',
      cellStyle: {textAlign: 'center'},
        field: acnames[i],
        width: 170,
        cellRendererFramework: CellCustomComponent,
        cellRendererParams: {
          context: this,
          icon: acnames[i]
        },
      };

      additionalColumns.push(actionColumn);
    }

    return columns.concat(additionalColumns as any[]);
  })();
  rowData;

  defaultColDef = {
    // make all cols more narrow
    filter: 'number',
    sortable: true,
    resizable: true,
  };

  sideBar = {
    toolPanels: [
      {
        id: 'columns',
        labelDefault: 'Columns',
        labelKey: 'columns',
        iconKey: 'columns',
        toolPanel: 'agColumnsToolPanel',
      },
      {
        id: 'filters',
        labelDefault: 'Filters',
        labelKey: 'filters',
        iconKey: 'filter',
        toolPanel: 'agFiltersToolPanel',
      },
    ],
    defaultToolPanel: null,
  };
  questionDTOList;
  publish;
  currentForm;
  isPrimeUser;
  isTableOrBox = '1';
  public modalRef: BsModalRef;
  constructor(
    public allServ: AllServicesService,
    private modalService: BsModalService
  ) {
    this.formInit();
  }

  ngOnInit(): void {
    console.log(
      'this is columnDefs',
      this.columnDefs,
      this.columnDefs.length,
      this.columnDefs[0].field
    );
    this.formInit();
    this.formModal = $('#formCreateModal');
    this.formDeleteModal = $('#formDeleteModal');
    this.selectedTemplate = null;

    this.getFormList();
    this.getTemplateList();

    setTimeout(() => {
      $('[data-toggle="tooltip"]').tooltip();
    }, 5000);
  }

  changeFont(event) {
    console.log(event.id);
    this.isTableOrBox = event.id;
  }

  changeValue() {
    if (this.isTableOrBox == '1') {
      this.isTableOrBox = '2';
    } else {
      this.isTableOrBox = '1';
    }
  }

  test(params) {
    console.log(params);
    alert('sadsads');
  }

  formInit() {
    this.formForm = new FormGroup({
      title: new FormControl(this.form ? this.form.title : null, [
        Validators.required,
        Validators.maxLength(250),
      ]),
      description: new FormControl(this.form ? this.form.description : null, [
        Validators.maxLength(500),
      ]),
      questionDTOList: new FormControl(
        this.form ? this.form.questionDTOList : null,
        []
      ),
      //questionDTOList: new FormControl(this.form ? this.form.questionDTOList : null),
      userId: new FormControl(this.allServ.authServ.getLoggedUser().id),
      id: new FormControl(this.form ? this.form.id : null),
    });
  }

  showMenu(form) {
    this.currentForm = form;
    this.publish =
      this.currentForm.visibilityStatus ==
      AppConst.FORM_VISIBILITY_STATUS.STATUS_PUBLISH
        ? 'Unpublish'
        : 'Publish';
  }

  getStyle(form) {
    var width = '252px';
    var style: any = { width: width, height: '150px', 'object-fit': 'cover' };
    if (form.theme && form.theme.opacity) {
      style.opacity = form.theme.opacity;
    }
    try {
      style.width =
        (<any>document.getElementsByClassName('form-test')[0]).offsetWidth -
        10 +
        'px';
    } catch (err) {}
    return style;
  }

  useThis(dataList) {
    //alert(dataList.id);
    var toSubmit = {
      description: dataList.description,
      id: null,
      questionDTOList: null,
      title: dataList.title,
      userId: this.allServ.authServ.getLoggedUser().id,
    };
    this.allServ.api
      .createForm(toSubmit)
      .toPromise()
      .then((data: any) => {
        if (data && data.statusCode && data.statusCode == '403') {
          this.allServ.toastr.warning(data.message, 'Access Error');
        } else {
          this.getFormList();
        }

        this.formLoader = false;
        this.formModal.modal('hide');
        this.form = null;
        if (data && data.statusCode && data.statusCode != '403') {
          // this.allServ.router.navigateByUrl(
          //   `form-create?formId=${data.data.id}`
          // );

          this.redirectQuestion(data.data.id)
        }
      })
      .catch((error: any) => {
        this.formLoader = false;
      });
  }

  showAll = false;

  redirectQuestion(formId){
    //console.log('redirectQuestion');
    this.allServ.router.navigateByUrl(
      `form-create?formId=${formId}`
    );

    //window.location.href =  `http://localhost:4200/form-create?formId=110`
    //window.location.href  = `${window.location.origin}/form-create?formId=${formId}`;
  }

  getFormList() {
    this.allServ.loader = true;
    this.allServ.api
      .getAllFormByUserId(this.allServ.authServ.getLoggedUser().id)
      .toPromise()
      .then((data: any) => {
        this.formList = data.dataList || [];

        window.localStorage.setItem('MyArray', JSON.stringify(this.formList));

        this.formList = this.formList || [];

        setTimeout(() => {
          this.rowData = (() => {
            var rowData = [];
            for (var i = 0; i < this.formList.length; i++) {
              var item = {};
              item['Name'] = this.formList[i].title;
              item['Message'] = this.formList[i]?.description;
              item['id'] = this.formList[i]?.id;
              item['totalResponse'] = this.formList[i].totalResponse;

              for (var j = 2; j < this.columnDefs.length; j++) {
                var colDef = this.columnDefs[j];
                item[colDef.field] = Math.floor(Math.random() * 100000);
              }

              rowData.push(item);
            }
            return rowData;
          })();
        }, 10000);
        this.allServ.loader = false;
      })
      .catch((error: any) => {
        console.log(error);
        this.allServ.loader = false;
        //this.allServ.toastr.error('Internal Server Error');
      });
  }

  getTemplateList() {
    this.allServ.api
      .getAllTemplateList()
      .toPromise()
      .then((data: any) => {
        this.templates = data.dataList;
      })
      .catch((error: any) => {
        //this.allServ.toastr.error('Internal Server Error');
      });
  }

  preview(dataList) {
    let link = `${window.location.protocol}//${window.location.host}/${
      environment.basepath != '' ? environment.basepath + '/' : ''
    }form-response?link=${dataList.formLink}&isPreview=true`;
    window.open(link, '_blank');
  }

  previews(form) {
    let link = `${window.location.protocol}//${window.location.host}/${
      environment.basepath != '' ? environment.basepath + '/' : ''
    }form-response?link=${form.formLink}&isPreview=true`;
    window.open(link, '_blank');
  }

  addFormModal() {
    this.form = null;
    this.formInit();
    this.formModal.modal({ backdrop: 'static', keyboard: false });
  }

  renameFormModal(formId) {
    this.allServ.loader = true;
    this.allServ.api
      .getFormById(formId)
      .toPromise()
      .then((data: any) => {
        this.form = data.data;
        this.formInit();
        this.allServ.loader = false;
        this.formModal.modal({ backdrop: 'static', keyboard: false });
      })
      .catch((error: any) => {
        this.allServ.loader = false;
      });
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

  cancelFormModal() {
    this.formModal.modal('hide');
    this.form = null;
  }

  deleteFormModal(formId) {
    this.form = {};
    this.form.id = formId;
    console.log(this.form);
    this.formDeleteModal.modal({ backdrop: 'static', keyboard: false });
  }

  cancelConfirmModal() {
    this.formDeleteModal.modal('hide');
    this.form = null;
  }

  deleteForm() {
    this.deleteLoader = true;
    this.allServ.api
      .deleteForm({ id: this.form.id })
      .toPromise()
      .then((data: any) => {
        this.getFormList();
        this.getTemplateList();
        this.deleteLoader = false;
        this.formDeleteModal.modal('hide');
      })
      .catch((error: any) => {
        this.deleteLoader = false;
      });
  }

  submitForm() {
    this.formLoader = true;
    if (this.form) {
      this.allServ.api
        .renameForm(this.formForm.value)
        .toPromise()
        .then((data: any) => {
          this.getFormList();
          this.formLoader = false;
          this.formModal.modal('hide');
          this.form = null;
        })
        .catch((error: any) => {
          this.formLoader = false;
        });
    } else {
      this.allServ.api
        .createForm(this.formForm.value)
        .toPromise()
        .then((data: any) => {
          if (data && data.statusCode && data.statusCode == '403') {
            this.allServ.toastr.warning(data.message, 'Access Error');
          } else {
            this.getFormList();
          }

          this.formLoader = false;
          this.formModal.modal('hide');
          this.form = null;
          if (data && data.statusCode && data.statusCode != '403') {
            this.allServ.router.navigateByUrl(
              `form-create?formId=${data.data.id}`
            );
          }
        })
        .catch((error: any) => {
          this.formLoader = false;
        });
    }
  }

  handleKeyPress(evn) {
    if (evn.keyCode == 13 && !this.formLoader && this.formForm.valid) {
      this.submitForm();
    }
  }

  set() {
    $('.title').readMore('destroy');
    $('.description').readMore('destroy');
    $('.title').readMore({
      lines: 1,
    });
    $('.description').readMore({
      lines: 2,
    });
    // $('[data-toggle="tooltip"]').tooltip();
  }

  ngOnDestroy() {
    $('.title').readMore('destroy');
    $('.description').readMore('destroy');
    this.deleteLoader = null;
    this.formLoader = null;
    this.formModal = null;
    this.formDeleteModal = null;
    this.formForm = null;
    this.formList = null;
    this.form = null;
  }

  onTemplateSelect(form) {
    if (form && 'Select the Template' != form) {
      this.form.questionDTOList = form.questionDTOList;
    }
  }

  themeDesign() {
    const initialState = {
      theme: this.currentForm.theme,
      formId: this.currentForm.id,
    };
    this.modalRef = this.modalService.show(ThemeComponent, {
      ignoreBackdropClick: false,
      initialState,
    });
  }
}
