import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./Pages/login/login.component";
import {RegisterComponent} from "./Pages/register/register.component";
import {ForgotPasswordComponent} from "./Pages/forgot-password/forgot-password.component";
import {HomeComponent} from "./Pages/home/home.component";
import {NotFound404Component} from "./Pages/not-found404/not-found404.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'forgot-password/:token', component: ForgotPasswordComponent},
  {path: '404NotFound', component: NotFound404Component},
  /*  {path: '', redirectTo: 'login', pathMatch: 'full'},*/
  {path: '**', redirectTo: '404NotFound'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
