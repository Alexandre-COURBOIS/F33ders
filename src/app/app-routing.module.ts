import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./Pages/login/login.component";
import {RegisterComponent} from "./Pages/register/register.component";
import {ForgotPasswordComponent} from "./Pages/forgot-password/forgot-password.component";
import {HomeComponent} from "./Pages/home/home.component";
import {NotFound404Component} from "./Pages/not-found404/not-found404.component";
import {ProfileComponent} from "./Pages/profile/profile.component";
import {ContactComponent} from "./Pages/contact/contact.component";
import {ProfileGamerComponent} from "./Pages/profile-gamer/profile-gamer.component";
import {ChampionDetailsComponent} from "./Pages/champion-details/champion-details.component";
import {ChampionComponent} from "./Pages/champion/champion.component";
import {MentionsComponent} from "./Pages/mentions/mentions.component";
import {ActivateAccountComponent} from "./Pages/activate-account/activate-account.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'forgot-password/:token', component: ForgotPasswordComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'single-gamer', component: ProfileGamerComponent},
  {path: 'champion-details', component: ChampionDetailsComponent},
  {path: 'champions', component: ChampionComponent},
  {path: 'mentions', component: MentionsComponent},
  {path: 'activation/:token', component: ActivateAccountComponent},
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
