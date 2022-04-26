import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { CustomSignupComponent } from './pages/AppSumoSignup/CustomSignup.component';
import { ApplicationGuard, LoginPageGuard, PermissionGuard } from './config/guard.service';
import { FormListingComponent } from './pages/form-listing/form-listing.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { FormComponent } from './pages/form/form.component';
import { ResultComponent } from './pages/result/result.component';
import { ShareComponent } from './pages/share/share.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { FormResponseComponent } from './pages/form-response/form-response.component';
import { ErrorComponent } from './pages/error/error.component';
import { TermsConditionComponent } from './pages/terms-condition/terms-condition.component';
import { DbComponentComponent } from './pages/db-component/db-component.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [ApplicationGuard] },
  { path: 'login', component: LoginComponent, canActivate: [LoginPageGuard] },
  { path: 'signup', component: SignupComponent },
  { path: 'AppSumo', component: CustomSignupComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'settings', component: SettingsComponent, canActivate: [ApplicationGuard] },
  { path: 'form-listing', component: FormListingComponent, canActivate: [ApplicationGuard] },
  { path: 'form-create', component: FormComponent, canActivate: [ApplicationGuard] },
  { path: 'form-result', component: ResultComponent, canActivate: [ApplicationGuard] },
  { path: 'form-share', component: ShareComponent, canActivate: [ApplicationGuard] },
  { path: 'form-response', component: FormResponseComponent },
  { path: 'terms', component: TermsConditionComponent },
  { path: 'errorpage', component: ErrorComponent },
  { path: 'dbDetails', component: DbComponentComponent, canActivate: [PermissionGuard]  },
  { path: '**', redirectTo: 'errorpage' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
