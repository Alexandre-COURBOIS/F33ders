import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./Pages/login/login.component";
import {RegisterComponent} from "./Pages/register/register.component";
import {ForgotPasswordComponent} from "./Pages/forgot-password/forgot-password.component";
import {HomeComponent} from "./Pages/home/home.component";
import {NotFound404Component} from "./Pages/not-found404/not-found404.component";
import {ProfileComponent} from "./Pages/profile/profile.component";
import {ContactComponent} from "./Pages/contact/contact.component";
import {ChampionDetailsComponent} from "./Pages/champion-details/champion-details.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'forgot-password/:token', component: ForgotPasswordComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'champion-details', component: ChampionDetailsComponent},
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
