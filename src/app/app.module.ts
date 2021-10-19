import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './Pages/register/register.component';
import { LoginComponent } from './Pages/login/login.component';
import { ForgotPasswordComponent } from './Pages/forgot-password/forgot-password.component';
import { NotFound404Component } from './Pages/not-found404/not-found404.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { HomeComponent } from './Pages/home/home.component';
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {JwtModule} from "@auth0/angular-jwt";
import {JwtInterceptor} from "./Helpers/jwt.interceptor";
import {DatePipe} from "@angular/common";
import { ProfileComponent } from './Pages/profile/profile.component';
import { ContactComponent } from './Pages/contact/contact.component';
import {RecaptchaModule} from "ng-recaptcha";

export function tokenGetter() {
  return sessionStorage.getItem('_token');
}


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ForgotPasswordComponent,
    NotFound404Component,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ProfileComponent,
    ContactComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ToastrModule.forRoot(),
        BrowserAnimationsModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
            },
        }),
        RecaptchaModule,
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    DatePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
