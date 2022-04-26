import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, ReplaySubject, Subject, Subscription } from 'rxjs';
import { fadeInAnimation } from 'src/app/animation/fadein.animation';
import { AllServicesService } from 'src/app/services/all-services.service';
import { AppConst } from 'src/app/shared/app-const';
import { environment } from 'src/environments/environment';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  CountryISO,
  PhoneNumberFormat,
  SearchCountryField,
} from 'ngx-intl-tel-input';
import { Toast } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
declare const $: any;

@Component({
  selector: 'app-form',
  animations: [fadeInAnimation],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss', '../../shared/form.scss'],
})
export class FormComponent implements OnInit {
  [x: string]: any;

  questionModal;
  questionLoader;
  deleteLoader;
  deleteQuestionModal;
  deleteDefaultModal;
  questionForm;
  JumpQuestion;
  question;
  isQuestionEdit;
  formId;
  pageId;
  startIndex;
  questionTypeList;
  questionList;
  appConst;
  form;
  formLink;
  publishUnpublishLoader;
  pageType;
  formForm;
  selectQuestionModel;
  formLoader;
  formModal;
  seqNumber;
  jumpedQuestion;
  jumpQuestionModal;
  jumpQuestionControl;
  selectedQuestion;
  parentid;
  optionSelectionMap = [];
  selectedQuestOpt;
  isThankYou;
  currentIndex;
  theme: any = {};
  themeLoader;
  themeModal;
  npsSelected;
  pageTypeConst = {
    welcome: 'welcome',
    question: 'question',
    submitted: 'submitted',
  };
  colorArray = [
    {
      themeName: 'Theme 1',
      themeTextColor: '#023564',
      background: '#66B2FB',
      buttonTextColor: '#E6F3FF',
      buttonColor: '#023564',
      answerColor: '#023564',
      questionColor: '#023564',
    },
    {
      themeName: 'Theme 2',
      themeTextColor: '#3D3D3D',
      background: '#F2EEE9',
      buttonTextColor: '#1B535F',
      buttonColor: '#97D5E2',
      answerColor: '#437E93',
      questionColor: '#3D3D3D',
    },
    {
      themeName: 'Theme 3',
      themeTextColor: '#262626',
      background: '#E3D8DF',
      buttonTextColor: '#808080',
      buttonColor: '#FFFFFF',
      answerColor: '#262626',
      questionColor: '#262626',
    },
    {
      themeName: 'Theme 4',
      themeTextColor: '#FFFFFF',
      background: '#5EC1AB',
      buttonTextColor: '#808080',
      buttonColor: '#FFFFFF',
      answerColor: '#FFFFFF',
      questionColor: '#FFFFFF',
    },
    {
      themeName: 'Theme 5',
      themeTextColor: '#FFFFFF',
      background: '#2C2C2C',
      buttonTextColor: '#1F080E',
      buttonColor: '#D25476',
      answerColor: '#E0FBFF',
      questionColor: '#FFFFFF',
    },
    {
      themeName: 'Theme 6',
      themeTextColor: '#FFFFFF',
      background: '#0716C2',
      buttonTextColor: '#808080',
      buttonColor: '#FFFFFF',
      answerColor: '#FFFFFF',
      questionColor: '#FFFFFF',
    },
    {
      themeName: 'Theme 7',
      themeTextColor: '#FFFFFF',
      background: '#5A1D81',
      buttonTextColor: '#FFFFFF',
      buttonColor: '#000000',
      answerColor: '#FFFFFF',
      questionColor: '#FFFFFF',
    },
    {
      themeName: 'Theme 8',
      themeTextColor: '#000000',
      background: '#F5A43A',
      buttonTextColor: '#FFFFFF',
      buttonColor: '#0142AC',
      answerColor: '#0142AC',
      questionColor: '#000000',
    },
    {
      themeName: 'Theme 9',
      themeTextColor: 'black',
      background: '#C94C29',
      buttonTextColor: '#FFFFFF',
      buttonColor: '#000000',
      answerColor: '#FFB4B4',
      questionColor: '#000000',
    },
    {
      themeName: 'Theme 10',
      themeTextColor: 'black',
      background: '#EBC1E0',
      buttonTextColor: '#FFFFFF',
      buttonColor: '#000000',
      answerColor: '#000000',
      questionColor: '#000000',
    },
  ];

  colorArray1 = [
    {
      themeTextColor: 'black',
      background: 'purple',
      buttonTextColor: 'white',
      buttonColor: 'green',
      answerColor: 'yellow',
      questionColor: 'orange',
    },
    {
      themeTextColor: 'black',
      background: 'red',
      buttonTextColor: 'black',
      buttonColor: 'green',
      answerColor: 'orange',
      questionColor: 'yellow',
    },
    {
      themeTextColor: 'black',
      background: 'yellow',
      buttonTextColor: 'black',
      buttonColor: 'green',
      answerColor: 'orange',
      questionColor: 'red',
    },
    {
      themeTextColor: 'black',
      background: 'orange',
      buttonTextColor: 'black',
      buttonColor: 'green',
      answerColor: 'red',
      questionColor: 'yellow',
    },
    {
      themeTextColor: 'black',
      background: 'blue',
      buttonTextColor: 'black',
      buttonColor: 'green',
      answerColor: 'orange',
      questionColor: 'yellow',
    },
    {
      themeTextColor: 'black',
      background: 'gray',
      buttonTextColor: 'black',
      buttonColor: 'green',
      answerColor: 'orange',
      questionColor: 'yellow',
    },
    {
      themeTextColor: 'black',
      background: 'black',
      buttonTextColor: 'red',
      buttonColor: 'gray',
      answerColor: 'orange',
      questionColor: 'yellow',
    },
    {
      themeTextColor: 'black',
      background: 'green',
      buttonTextColor: 'black',
      buttonColor: 'red',
      answerColor: 'orange',
      questionColor: 'yellow',
    },
    {
      themeTextColor: 'black',
      background: 'lightgray',
      buttonTextColor: 'black',
      buttonColor: 'green',
      answerColor: 'orange',
      questionColor: 'yellow',
    },
    {
      themeTextColor: 'black',
      background: 'blueviolet',
      buttonTextColor: 'black',
      buttonColor: 'green',
      answerColor: 'orange',
      questionColor: 'yellow',
    },
    {
      themeTextColor: 'black',
      background: 'maroon',
      buttonTextColor: 'black',
      buttonColor: 'green',
      answerColor: 'orange',
      questionColor: 'yellow',
    },
    {
      themeTextColor: 'black',
      background: 'olive',
      buttonTextColor: 'black',
      buttonColor: 'green',
      answerColor: 'orange',
      questionColor: 'yellow',
    },
    {
      themeTextColor: 'black',
      background: 'peru',
      buttonTextColor: 'black',
      buttonColor: 'green',
      answerColor: 'orange',
      questionColor: 'yellow',
    },
    {
      themeTextColor: 'black',
      background: 'yellowgreen',
      buttonTextColor: 'black',
      buttonColor: 'green',
      answerColor: 'white',
      questionColor: 'red',
    },
    {
      themeTextColor: 'black',
      background: 'violet',
      buttonTextColor: 'black',
      buttonColor: 'green',
      answerColor: 'orange',
      questionColor: 'yellow',
    },
    {
      themeTextColor: 'black',
      background: 'tomato',
      buttonTextColor: 'white',
      buttonColor: 'green',
      answerColor: 'black',
      questionColor: 'yellow',
    },
    {
      themeTextColor: 'black',
      background: 'sandybrown',
      buttonTextColor: 'black',
      buttonColor: 'green',
      answerColor: 'red',
      questionColor: 'yellow',
    },
    {
      themeTextColor: 'black',
      background: 'plum',
      buttonTextColor: 'white',
      buttonColor: 'green',
      answerColor: 'orange',
      questionColor: 'yellow',
    },
    {
      themeTextColor: 'black',
      background: 'rebeccapurple',
      buttonTextColor: 'white',
      buttonColor: 'green',
      answerColor: 'orange',
      questionColor: 'yellow',
    },
    {
      themeTextColor: 'black',
      background: 'darkolivegreen',
      buttonTextColor: 'black',
      buttonColor: 'green',
      answerColor: 'orange',
      questionColor: 'yellow',
    },
  ];
  initials;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  //preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
  preferredCountries = [CountryISO.India, CountryISO.Canada];
  phoneForm = new FormGroup({
    phone: new FormControl(undefined, [Validators.required]),
  });

  public countries = AppConst.countries;
  styleNone = 'none';
  changePreferredCountries() {}

  constructor(
    public allServ: AllServicesService,
    private route: ActivatedRoute,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {
    this.appConst = AppConst;
    this.allServ.shared.loadAdminLteCss();
    this.allServ.shared.loadAdminlteScript();
    this.allServ.shared.loadReadMoreScript();
    this.allServ.shared.loadCSVExportScript();

    this.JumpQuestion = new FormGroup({
      jumpQuestionId: new FormControl('', []),
    });

  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor =
      '#f4f6f9';
  }

  ngOnInit(): void {
    setInterval(() => {
      $('[data-toggle="tooltip"]').tooltip();
    }, 1000);

    let name = this.allServ.authServ.getLoggedUser().name;
    this.initials = name
      .split(' ')
      .map(function (str) {
        return str ? str[0].toUpperCase() : '';
      })
      .join('');
    this.selectedQuestion = null;

    this.formInit();
    this.startIndex = 1;
    this.seqNumber = 0;
    this.formModal = $('#formCreateModal2');
    this.themeModal = $('#themeModal');
    this.pageType = this.pageTypeConst.welcome;
    this.formId = this.route.snapshot.queryParams.formId;
    this.questionModal = $('#addQuestionModal');
    this.selectQuestionModel = $('#selectQuestionModal');
    this.deleteQuestionModal = $('#deleteQuestionModal');
    this.jumpQuestionModal = $('#jumpQuestionModal');
    this.deleteDefaultModal = $('#deleteDefaultModal');
    this.questionFormInit();
    this.jumpFormInit(0);
    this.pageId = -1;
    this.questionTypeList = AppConst.QUESTION_TYPE_LIST;
    this.getQuestionList(null);
    $('[data-toggle="tooltip"]').tooltip();
    this.getForm();

    const window_width = $(window).width();
    let $sidebar = $('.sidebar');
    let $sidebar_responsive = $('body > .navbar-collapse');
    let $sidebar_img_container = $sidebar.find('.sidebar-background');

    if (window_width > 767) {
      if ($('.fixed-plugin .dropdown').hasClass('show-dropdown')) {
        $('.fixed-plugin .dropdown').addClass('open');
      }
    }

    $('.fixed-plugin a').click(function (event) {
      // Alex if we click on switch, stop propagation of the event, so the dropdown will not be hide, otherwise we set the  section active
      if ($(this).hasClass('switch-trigger')) {
        if (event.stopPropagation) {
          event.stopPropagation();
        } else if (window.event) {
          window.event.cancelBubble = true;
        }
      }
    });

    $('.fixed-plugin .badge').click(function () {
      let $full_page_background = $('.full-page-background');

      $(this).siblings().removeClass('active');
      $(this).addClass('active');

      var new_color = $(this).data('color');

      if ($sidebar.length !== 0) {
        $sidebar.attr('data-color', new_color);
      }

      if ($sidebar_responsive.length != 0) {
        $sidebar_responsive.attr('data-color', new_color);
      }
    });

    $('.fixed-plugin .img-holder').click(function () {
      let $full_page_background = $('.full-page-background');

      $(this).parent('li').siblings().removeClass('active');
      $(this).parent('li').addClass('active');

      var new_image = $(this).find('img').attr('src');

      if ($sidebar_img_container.length != 0) {
        $sidebar_img_container.fadeOut('fast', function () {
          $sidebar_img_container.css(
            'background-image',
            'url("' + new_image + '")'
          );
          $sidebar_img_container.fadeIn('fast');
        });
      }

      if ($full_page_background.length != 0) {
        $full_page_background.fadeOut('fast', function () {
          $full_page_background.css(
            'background-image',
            'url("' + new_image + '")'
          );
          $full_page_background.fadeIn('fast');
        });
      }

      if ($sidebar_responsive.length != 0) {
        $sidebar_responsive.css('background-image', 'url("' + new_image + '")');
      }
    });
  }

  getForm() {
    //this.publishUnpublishLoader = true;
    this.allServ.loader = true;
    this.allServ.api
      .getFormById(this.formId)
      .toPromise()
      .then((data: any) => {
        this.form = data.data;
        if (this.form.theme) this.theme = this.form.theme;
        else {
          this.theme = {};
          this.form.theme = this.theme;
        }
        if (this.form.welcomePageVisibility == 0) this.startIndex = 1;
        else this.startIndex = 0;
        this.formInit();
        this.formLink = `${window.location.protocol}//${window.location.host}/${
          environment.basepath != '' ? environment.basepath + '/' : ''
        }form-response?link=${this.form.formLink}`;

        this.allServ.loader = false;

        //this.publishUnpublishLoader = false;
      })
      .catch((_error: any) => {
        //this.publishUnpublishLoader = false;
        this.allServ.loader = false;
      });
  }

  publishUnpublishForm() {
    if (
      this.form &&
      this.form.visibilityStatus ==
        AppConst.FORM_VISIBILITY_STATUS.STATUS_PUBLISH
    ) {
      this.allServ.loader = true;
      this.allServ.api
        .unpublishForm({ id: this.formId })
        .toPromise()
        .then((_data: any) => {
          this.allServ.toastr.info('Form has been unpublished.');
          this.getForm();
          this.allServ.loader = false;
        })
        .catch((_error: any) => {
          this.allServ.loader = false;
        });
    } else {
      this.allServ.loader = true;
      this.allServ.api
        .publishForm({ id: this.formId })
        .toPromise()
        .then((_data: any) => {
          this.allServ.toastr.info('Form has been published.');
          this.getForm();
          this.allServ.loader = false;
        })
        .catch((_error: any) => {
          this.allServ.loader = false;
        });
    }
  }

  set() {
    //  $(".question-para").readMore('destroy');
    //  $(".question-para").readMore({
    //    lines: 2
    //  });
    // $(".question-div div .question-option-btn").click(function (_e) {
    //   // if ($(this).hasClass('question-div')) {
    //   //   e.stopPropagation();
    //   // };
    //   //  e.stopPropagation();
    // });
  }

  formInit() {
    const reg = '(https?://)+([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    this.formForm = new FormGroup({
      title: new FormControl(this.form ? this.form.title : null, [
        Validators.required,
        Validators.maxLength(500),
      ]),
      thankYouMessage: new FormControl(
        this.form ? this.form.thankYouMessage : null,
        [Validators.maxLength(500)]
      ),
      redirectUrl: new FormControl(
        this.form ? this.form.redirectUrl : null,
        [Validators.pattern(reg)]
      ),
      description: new FormControl(this.form ? this.form.description : null, [
        Validators.maxLength(500),
      ]),
      otherOpt: new FormControl(this.form ? this.form.otherOpt : null, []),

      userId: new FormControl(this.allServ.authServ.getLoggedUser().id),
      id: new FormControl(this.form ? this.form.id : null),
      iconCss: new FormControl(),
    });
  }

  jumpFormInit(id) {
    if (!id) return;
    let index = this.optionSelectionMap[id];
    let quest = null;

    this.JumpQuestion = new FormGroup({
      jumpQuestionId: new FormControl('', []),
    });

    if (index > 0) {
      this.questionList.forEach((element) => {
        if (element.questId == index) quest = element;
      });
      this.selectedQuestOpt = quest.id;
    } else {
      this.selectedQuestOpt = '';
    }

    //this.JumpQuestion.controls["jumpQuestionId"].value=quest.id
    console.log();
  }

  questionFormInit() {
    this.questionForm = new FormGroup({
      question: new FormControl(
        this.isQuestionEdit ? this.question.question : null,
        [Validators.required, Validators.maxLength(500)]
      ),
      description: new FormControl(
        this.isQuestionEdit ? this.question.description : null,
        [Validators.maxLength(500)]
      ),
      otherOpt: new FormControl(
        this.isQuestionEdit ? this.question.otherOpt : null,
        []
      ),
      id: new FormControl(this.isQuestionEdit ? this.question.id : null),
      userId: new FormControl(this.allServ.authServ.getLoggedUser().id),
      formId: new FormControl(this.formId),
      questionTypeId: new FormControl(
        this.isQuestionEdit ? this.question.questionTypeId : '',
        [Validators.required]
      ),
      questionOptionDTOList: new FormArray([]),
      newQuestionOption: new FormControl(),
      unHappyQuestion: new FormControl(
        this.question ? this.question.unHappyQuestion : null
      ),
      happyQuestion: new FormControl(
        this.question ? this.question.happyQuestion : null
      ),
    });
    if (
      this.isQuestionEdit &&
      this.question.questionOptionDTOList.length != 0
    ) {
      this.question.questionOptionDTOList.forEach((o, _i) => {
        this.optionSelectionMap[o.questionOption] = o.nextQuestionId;
        const control = new FormControl(o.questionOption);
        (this.questionForm.controls.questionOptionDTOList as FormArray).push(
          new FormGroup({ questionOption: control })
        );
      });
    }
  }
  addQuestionOption() {
    const control = new FormControl(this.questionForm.value.newQuestionOption);
    if (control.value == 'Other') return;
    (this.questionForm.controls.questionOptionDTOList as FormArray).push(
      new FormGroup({ questionOption: control })
    );
    this.questionForm.patchValue({ newQuestionOption: null });
    this.jumpedQuestion = null;
  }

  deleteQuestionOption(i) {
    // console.log((this.questionForm.controls.questionOptionDTOList as FormArray).get(i));

    (this.questionForm.controls.questionOptionDTOList as FormArray).removeAt(i);
  }

  getQuestionList(currentQuestion) {
    debugger;
    this.allServ.loader = true;
    this.allServ.api
      .getAllQuestionByFormId(this.formId)
      .toPromise()
      .then((data: any) => {
        this.questionList = data.dataList;
        if (this.questionList && this.questionList.length != 0) {
          if (currentQuestion) this.question = currentQuestion;
          this.seqNumber =
            this.questionList[this.questionList.length - 1].sequence;
        } else {
          this.question = null;
          this.seqNumber = 0;
        }
        this.allServ.loader = false;
      })
      .catch((_error: any) => {
        this.allServ.loader = false;
      });
  }

  submitQuestion() {
    let currentQuestion = this.questionForm.value;
    this.questionLoader = true;
    if (this.isQuestionEdit) {
      this.allServ.api
        .editQuestion(this.questionForm.value)
        .toPromise()
        .then((_data: any) => {
          this.getQuestionList(currentQuestion);
          this.questionLoader = false;
          //this.questionModal.modal('hide');
          this.hideModalById('addQuestionModal');
        })
        .catch((_error: any) => {
          this.questionLoader = false;
        });
    } else {
      this.questionForm.value.sequence = ++this.seqNumber;
      this.allServ.api
        .addQuestion(this.questionForm.value)
        .toPromise()
        .then((_data: any) => {
          if (_data && _data.statusCode && _data.statusCode == '403') {
            this.allServ.toastr.warning(_data.message, 'Access Error');
          } else {
            this.getQuestionList(currentQuestion);
          }
          this.questionLoader = false;
          this.question = currentQuestion;
          //this.questionModal.modal('hide');
          this.hideModalById('addQuestionModal')
        })
        .catch((_error: any) => {
          this.questionLoader = false;
        });
    }
  }

  showQuestionModal() {
    this.questionForm.controls.question.reset();
    this.questionForm.controls.description.reset();
    this.cancelQModal();
    this.isQuestionEdit = false;
    //this.questionFormInit();
    //$(".modal-backdrop").remove();


    // setTimeout(() => {
    //   $(".modal-backdrop").remove();
    // }, 200);

    setTimeout(() => {
      $(".modal-backdrop").remove();
      //this.questionModal.modal('{ backdrop: 'static', keyboard: false }');
      //this.questionModal.modal('show')

      $('#addQuestionModal').modal('show')
    }, 500);


  }

  showSelectQuestionModel() {
    this.selectQuestionModel.modal({ backdrop: 'static', keyboard: false });
  }

  showJumpQuestionModal(control, i) {
    this.currentIndex = i;
    let optionId = control.questionOptionDTOList[i];
    this.jumpFormInit(optionId.questionOption);
    this.jumpQuestionControl = control;
    this.parentid = i;
    this.jumpQuestionModal.modal({ backdrop: 'static', keyboard: false });
  }
  showQuestionModalForEdit(questionId) {
    this.allServ.loader = true;
    this.allServ.api
      .getQuestionDetailByQuestionId(questionId)
      .toPromise()
      .then((data: any) => {
        this.question = data.data;
        this.isQuestionEdit = true;
        this.questionFormInit();
        this.questionModal.modal({ backdrop: 'static', keyboard: false });
        this.allServ.loader = false;
      })
      .catch((_error: any) => {
        this.allServ.loader = false;
      });
  }

  hideShowQuestion(_questionId) {
    this.allServ.loader = true;
    this.question.hidden = !this.question.hidden;
    this.allServ.api
      .hideShowQuestion(this.question)
      .toPromise()
      .then((data: any) => {
        this.question = data.data;
        this.getQuestionList(null);
        this.questionFormInit();
        //this.questionModal.modal({ backdrop: 'static', keyboard: false });
        this.allServ.loader = false;
      })
      .catch((_error: any) => {
        this.allServ.loader = false;
      });
  }

  hideModalById(id){
    $(`#${id}`).modal('hide')
  }
  cancelQuestionModal() {
    //this.questionModal.modal('hide');
    this.hideModalById('addQuestionModal');
    this.isQuestionEdit = false;
  }

  cancelQModal() {
    //$("#selectQuestionModal .close").trigger("click");
    this.selectQuestionModel.modal('hide');
  }

  cancelJumpModal() {
    this.jumpQuestionControl = null;
    this.jumpQuestionModal.modal('hide');
    this.JumpQuestion.reset();
    this.JumpQuestion.resetForm();
    this.selectedQuestOpt = '';
  }

  getQuestionDetails(questionId) {
    debugger;
    this.allServ.loader = true;
    this.allServ.api
      .getQuestionDetailByQuestionId(questionId)
      .toPromise()
      .then((data: any) => {
        this.question = null;
        setTimeout(() => {
          this.question = data.data.question;
          this.question = data.data;
          this.allServ.loader = false;
          this.pageType = this.pageTypeConst.question;
        }, 10);
      })
      .catch((_error: any) => {
        this.allServ.loader = false;
      });
  }

  showDeleteQuestionModal(questionId) {
    this.allServ.loader = true;
    this.allServ.api
      .getQuestionDetailByQuestionId(questionId)
      .toPromise()
      .then((data: any) => {
        this.question = data.data;
        this.allServ.loader = false;
      })
      .catch((_error: any) => {
        this.allServ.loader = false;
      });
    this.deleteQuestionModal.modal({ backdrop: 'static', keyboard: false });
  }

  showDeleteDefaultModal(pageID) {
    this.pageId = pageID;

    this.deleteDefaultModal.modal({ backdrop: 'static', keyboard: false });
  }
  cancelConfirmModal() {
    this.deleteQuestionModal.modal('hide');
  }
  cancelConfirmDefaultModal() {
    this.deleteDefaultModal.modal('hide');
  }

  deleteQuestion() {
    this.deleteLoader = true;
    this.allServ.api
      .deleteQuestion({ id: this.question.id })
      .toPromise()
      .then((_data: any) => {
        this.getQuestionList(null);
        this.deleteLoader = false;
        this.deleteQuestionModal.modal('hide');
      })
      .catch((_error: any) => {
        this.deleteLoader = false;
      });
  }

  deleteDefaultPage() {
    this.deleteLoader = true;
    if (this.pageId == 0) {
      this.form.welcomePageVisibility = 1;
      this.startIndex = 0;
    } else {
      this.form.thanksPageVisibility = 1;
    }
    this.allServ.api
      .deleteDefaultPage(this.form)
      .toPromise()
      .then((_data: any) => {
        this.getQuestionList(null);
        this.deleteLoader = false;
        this.deleteDefaultModal.modal('hide');
      })
      .catch((_error: any) => {
        this.deleteLoader = false;
      });
  }

  get questionText() {
    try {
      let control: any = this.questionForm.controls.questionTypeId;
      let value = control.value;
      return this.questionTypeList.find((q) => q.id == value).display;
    } catch (err) {
      return '';
    }
  }

  handleQuestionTypeID(value) {
    // this.cancelQModal();
    this.questionForm.controls.questionTypeId.setValue(value);
    //  this.questionForm.controls.questionTypeId.setValue(value);
    //this.questionForm.patchValue({
    //     questionTypeId: value
    //});
    this.showQuestionModal();
    console.log(this.questionForm.value.questionTypeId);
  }

  handleQuestionTypeValueChange() {
    if (
      this.questionForm.value.questionTypeId ==
        AppConst.QUESTION_TYPE.SHORT_TEXT_ID ||
      this.questionForm.value.questionTypeId ==
        AppConst.QUESTION_TYPE.LONG_TEXT_ID
    ) {
      this.questionForm.controls['questionOptionDTOList'].clear();
    }
  }

  showlogout() {

    $("#logoutmodalform").modal('show');
      //this.questionModal.modal({ backdrop: 'static', keyboard: false });
  }

  cancelQuestionModalnew(){
    this.hideModalById("logoutmodalform");
  }

  logout() {
    $("#logoutmodalform").modal('hide');
    this.allServ.loader = true;
    this.allServ.api
      .logout()
      .toPromise()
      .then((_d) => {
        this.allServ.authServ.destroyLoginSession();
        this.allServ.loader = false;
      })
      .catch((_e) => {
        this.allServ.loader = false;
        this.allServ.toastr.error(
          'Unable to logout at this moment. Please try again later.',
          'Internal Server Error.'
        );
      });
  }

  preview() {
    let link = `${window.location.protocol}//${window.location.host}/${
      environment.basepath != '' ? environment.basepath + '/' : ''
    }form-response?link=${this.form.formLink}&isPreview=true`;
    window.open(link, '_blank');
  }

  showWelcomePage() {
    this.pageType = this.pageTypeConst.welcome;
  }

  showClosingPage() {
    this.pageType = this.pageTypeConst.submitted;
  }

  handleKeyPressAddOption(evn) {
    if (evn.keyCode == 13) {
      this.addQuestionOption();
    }
  }

  renameFormModal(_formId, isThankYou) {
    this.isThankYou = isThankYou;
    this.formModal.modal({ backdrop: 'static', keyboard: false });
  }

  showThemeModal() {
    this.themeModal.modal({ backdrop: 'static', keyboard: false });
  }

  cancelFormModal() {
    this.formModal.modal('hide');
  }

  cancelThemeModal() {
    this.themeModal.modal('hide');
  }

  submitForm() {
    this.formLoader = true;
    this.allServ.api
      .renameForm(this.formForm.value)
      .toPromise()
      .then((_data: any) => {
        this.formLoader = false;
        this.getForm();
        this.formModal.modal('hide');
      })
      .catch((_error: any) => {
        this.formLoader = false;
      });
  }

  handleKeyPressFormRename(evn) {
    // if (evn.keyCode == 13) {
    //   this.submitForm();
    // }
  }

  ngOnDestroy() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor =
      'white';
  }

  dropped(event: CdkDragDrop<string[]>) {
    this.questionLoader = true;
    moveItemInArray(this.questionList, event.previousIndex, event.currentIndex);
    let currentQuestion = null;
    this.allServ.api
      .reArrangeQuestion({
        formId: this.formId,
        startIndex: event.previousIndex,
        endIndex: event.currentIndex,
      })
      .toPromise()
      .then((_data: any) => {
        //this.questionList = data.dataList;
        this.questionLoader = false;
      })
      .catch((_error: any) => {
        this.questionLoader = false;
      });
  }

  get isPreviewMode() {
    try {
      return this.route.snapshot.queryParams.mode == 'preview';
    } catch (err) {
      return false;
    }
  }

  setNPSFormControlValue() {
    this.npsSelected =false;
    
  }

  addNpsJump(event, isHappy) {
    var data = event.target.value;

    if (
      data &&
      ((isHappy && data != 'Select Question For Satisfied User') ||
        (!isHappy && data != 'Select Question For Not Satisfied User'))
    ) {
      if (isHappy) this.questionForm.happyQuestion = data;
      else this.questionForm.unHappyQuestion = data;
    } else {
      if (isHappy) {
        this.questionForm.happyQuestion = 0;
        this.questionForm.value.happyQuestion = 0;
      } else {
        this.questionForm.unHappyQuestion = 0;
        this.questionForm.value.unHappyQuestion = 0;
      }
    }
  }

  addJumpQuestion(event) {
    var data = event.target.value;

    var arrayControl = this.questionForm.controls
      .questionOptionDTOList as FormArray;

    if (data && 'Select Next Question' != data) {
      this.optionSelectionMap[
        this.question.questionOptionDTOList[this.parentid].questionOption
      ] = Number(data);
    } else {
      this.optionSelectionMap[
        this.question.questionOptionDTOList[this.parentid].questionOption
      ] = 0;
    }

    this.question.questionOptionDTOList.forEach((element, index) => {
      arrayControl.value[index].nextQuestionId =
        this.optionSelectionMap[element.questionOption];
    });

    this.questionForm.controls.questionOptionDTOList = arrayControl;
    this.cancelJumpModal();
  }

  async uploadFile(evt) {
    // evt is an array of the file(s) dropped on our div. Here we're assuming only one file has been uploaded

    let payload = new FormData();
    var fileData = evt.target.files[0];

    if (fileData.size > 10 * 1024 * 1024)
      this.allServ.toastr.error('Maximum allowed size is 10mb.');

    if (
      !(fileData.type.startsWith('image') || fileData.type.startsWith('video'))
    )
      this.allServ.toastr.error(
        'Currently supported format is video and Image.'
      );
    let data;
    this.questionLoader = true;
    this.convertFile(fileData).subscribe((response) => {
      // payload.append("file",fileData);

      payload.append('id', this.formId);
      payload.append('type', fileData.type);
      payload.append('encodedFileData', response);

      this.allServ.api
        .uploadFile(payload)
        .toPromise()
        .then((_data: any) => {
          //this.getQuestionList(null);
          //this.selectedQuestion = quest;
          this.theme = _data.data;

          this.pageType = this.pageTypeConst.welcome;
          this.questionLoader = false;
        })
        .catch((_error: any) => {
          this.questionLoader = false;
        });
    });
  }

  convertFile(file: File): Observable<any> {
    const result = new ReplaySubject<any>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event) =>
      result.next(btoa(event.target.result.toString()));
    return result;
  }

  getUrl(background, backgroundType): Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.onload = (e) => result.next(btoa(e.target.result.toString()));
    reader.readAsDataURL(new Blob([background]));
    console.log(result);
    return result;
  }

  loadStaticIamge(path): Observable<string> {
    const result = new ReplaySubject<string>(1);
    this.http.get(path, { responseType: 'blob' }).subscribe((res) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        var base64data = reader.result;
        result.next(base64data.toString());
      };
      reader.readAsDataURL(res);

      console.log(res);
    });
    return result;
  }

  updateButtonColor(event) {
    this.theme.buttonColor = event;
  }

  updateButtonTextColor(event) {
    this.theme.buttonTextColor = event;
  }

  updateQuestionColor(event) {
    this.theme.questionColor = event;
  }

  updateAnswerColor(event) {
    this.theme.answerColor = event;
  }

  updateBackgroundColor(event1, event) {
    event1.stopPropagation();
    this.updateButtonTextColor(event.buttonTextColor);
    this.updateButtonColor(event.buttonColor);
    this.updateAnswerColor(event.answerColor);
    this.updateQuestionColor(event.questionColor);
    this.theme.bgColor = event.background;

    console.log(this.theme);
    this.saveTheme();
  }
  opacityChange(event) {
    this.theme.opacity = event.target.value;
  }
  resetImage() {
    this.theme.backgroundData = '';
    this.theme.bgType = '';
    this.theme.backgroundType = '';
    console.log(this.theme);

    this.saveTheme()
  }
  SetBackGround(path) {
    let payload = new FormData();
    this.loadStaticIamge(path).subscribe((response) => {
      payload.append('id', this.formId);
      payload.append('type', 'image/jpeg');
      payload.append('encodedFileData', response.substring(23));

      this.allServ.api
        .uploadFile(payload)
        .toPromise()
        .then((_data: any) => {
          //this.getQuestionList(null);
          //this.selectedQuestion = quest;
          this.theme = _data.data;
          this.form.theme = this.theme;
          this.pageType = this.pageTypeConst.welcome;
          this.questionLoader = false;

          console.log(this.theme);

          this.saveTheme();
        })
        .catch((_error: any) => {
          this.questionLoader = false;
        });
    });
  }

  saveTheme() {
    this.themeLoader = true;
    this.allServ.api
      .saveTheme(this.form)
      .toPromise()
      .then((data: any) => {
        this.form = data.data;
        this.theme = this.form.theme;
        this.allServ.toastr.info('Theme Has been updated');
        this.themeLoader = false;
        this.themeModal.modal('hide');
      })
      .catch((error: any) => {
        this.allServ.toastr.info('error while saving theme');
        this.themeLoader = false;
      });
  }
  removeTheme() {
    this.themeLoader = true;
    this.allServ.api
      .removeTheme({ id: this.formId })
      .toPromise()
      .then((data: any) => {
        this.allServ.toastr.info('Theme Has been Removed');
        this.themeLoader = false;
        this.form = data.data;
        this.theme = {};
        this.themeModal.modal('hide');
      })
      .catch((error: any) => {
        this.allServ.toastr.info('error while removing theme');
        this.themeLoader = false;
      });
  }

  sanatizeInput(input) {
    return this.sanitizer.bypassSecurityTrustHtml(input);
  }
}
