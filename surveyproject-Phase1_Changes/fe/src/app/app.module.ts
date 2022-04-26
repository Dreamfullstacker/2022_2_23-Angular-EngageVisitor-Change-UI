import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { SignupComponent } from './pages/signup/signup.component';
import { CustomSignupComponent } from './pages/AppSumoSignup/CustomSignup.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from './config/http-interceptor.service';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormListingComponent } from './pages/form-listing/form-listing.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { UserHeaderComponent } from './pages/layout/user-header/user-header.component';
import { UserHeaderCommonComponent } from './pages/layout/user-header-common/user-header-common.component';
import { UserSidenavComponent } from './pages/layout/user-sidenav/user-sidenav.component';
import { UserFooterComponent } from './pages/layout/user-footer/user-footer.component';
import { FormHeaderComponent } from './pages/layout/form-header/form-header.component';
import { FormSidenavComponent } from './pages/layout/form-sidenav/form-sidenav.component';
import { ResultComponent } from './pages/result/result.component';
import { ShareComponent } from './pages/share/share.component';
import { FormComponent } from './pages/form/form.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { FormResponseComponent } from './pages/form-response/form-response.component';
import { LoaderComponent } from './pages/loader/loader.component';
import { ErrorComponent } from './pages/error/error.component';
import { TermsConditionComponent } from './pages/terms-condition/terms-condition.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { UploadDirective } from './directive/directives/upload.directive';
import { UpgradeComponent } from './pages/upgrade/upgrade.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaddleModule } from 'ngx-paddle-wrapper';
import { MatBadgeModule} from '@angular/material/badge';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ThemeComponent } from './pages/theme/theme.component';
import { AgGridModule } from 'ag-grid-angular';
import { ColorPickerModule } from 'ngx-color-picker';
import { FontPickerConfigInterface, FontPickerModule, FONT_PICKER_CONFIG } from 'ngx-font-picker';
import { allIcons, NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { CellCustomComponent } from './pages/form-listing/cell';
import { PuUnblishCustomComponent } from './pages/form-listing/publish_unPublish';
import { ResultsCustomComponent } from './pages/form-listing/results';
import { ThemeCustomComponent } from './pages/form-listing/theme';
import { DbComponentComponent } from './pages/db-component/db-component.component';
const DEFAULT_FONT_PICKER_CONFIG: FontPickerConfigInterface = {
  // Change this to your Google API key
  apiKey: 'AIzaSyA9S7DY0khhn9JYcfyRWb1F6Rd2rwtF_mA'
};
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SignupComponent,
    CustomSignupComponent,
    DashboardComponent,
    FormListingComponent,
    SettingsComponent,
    UserHeaderComponent,
    UserHeaderCommonComponent,
    UserSidenavComponent,
    UserFooterComponent,
    FormHeaderComponent,
    FormSidenavComponent,
    ResultComponent,
    ShareComponent,
    FormComponent,
    ForgotPasswordComponent,
    FormResponseComponent,
    LoaderComponent,
    ErrorComponent,
    TermsConditionComponent,
    UploadDirective,
    UpgradeComponent,
    ThemeComponent,
    CellCustomComponent,
    ThemeCustomComponent,
    PuUnblishCustomComponent,
    ResultsCustomComponent,
    DbComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AgGridModule.withComponents([CellCustomComponent,ThemeCustomComponent,ResultsCustomComponent,PuUnblishCustomComponent]),
    HttpClientModule,
    ReactiveFormsModule,
    NgxIntlTelInputModule,
    PaddleModule,
    MatBadgeModule,
    MatSlideToggleModule,
    ColorPickerModule,
    FontPickerModule,
    ModalModule.forRoot(),
	DragDropModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 2500,
      //extendedTimeOut: 10000000,
      tapToDismiss: true,
      newestOnTop: true,
      autoDismiss: true,
      maxOpened: 1,
      preventDuplicates: true,
      positionClass: 'toast-top-center',
      // progressBar: true,
      // progressAnimation: 'decreasing'
    }),
    BrowserAnimationsModule,
    NgxBootstrapIconsModule.pick(allIcons)
  ],
  providers: [
    { 
      provide: LocationStrategy, 
      useClass: PathLocationStrategy 
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
    {
      provide: FONT_PICKER_CONFIG,
      useValue: DEFAULT_FONT_PICKER_CONFIG
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
