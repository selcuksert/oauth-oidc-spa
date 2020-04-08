import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';
import { TodosComponent } from './todos/todos.component';
import { LoginComponent } from './login/login.component';

import { OAuthService, NullValidationHandler, AuthConfig } from 'angular-oauth2-oidc';
import { SigninComponent } from './temp/signin/signin.component';
import { SignoutComponent } from './temp/signout/signout.component';
import { AuthInterceptor } from './core/intc/auth.interceptor';

const appRoutes: Routes = [
  { path: 'todos', component: TodosComponent },
  { path: '', component: LoginComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signout', component: SignoutComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    LoginComponent,
    SigninComponent,
    SignoutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: ['http://localhost:8081/api', 'http://localhost:4200'],
        sendAccessToken: true
      }
    })
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [RouterModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
