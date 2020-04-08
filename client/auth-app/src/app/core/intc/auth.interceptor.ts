import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Auth } from '../intf/auth';
import { AuthSvcVer } from '../models/auth-svc-ver.enum';
import { Constants } from '../constants';
import { AuthV1Service } from '../services/auth-v1.service';
import { AuthV2Service } from '../services/auth-v2.service';
import { MessageService } from '../services/message.service';
import { CustomHttpError as Error } from  '../models/error';

/**
 * A custom interceptor appended to interceptor chain that automatically adds
 * Bearer token to egress HTTP API calls when using oidc-client library.
 * It simply checks whether `Constants.authSvcVer` set as `AuthSvcVer.V2` 
 * and adds an Authorization header with `Bearer <token>` retrieved 
 * within `User` object if it is set. Otherwise it just acts as an idempotent interceptor. 
 */
@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  private authService: Auth;

  constructor(private injector: Injector, private messageService: MessageService) {
    if (AuthSvcVer.V1 === Constants.authSvcVer) {
      this.authService = <AuthV1Service>injector.get(AuthV1Service);
    }
    else {
      this.authService = <AuthV2Service>injector.get(AuthV2Service);
    }
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // For V2 we need to set the AuthZ header intentionally.
    // V1 does this for us automatically.
    if (AuthSvcVer.V2 === Constants.authSvcVer) {
      return from(this.authService.getAccessToken().then(token => {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        const authReq = request.clone({ headers });
        return next.handle(authReq).pipe(tap(event => { }, error => {
          let respError = error as HttpErrorResponse;
          this.httpErrorHandler(error);
        })).toPromise();
      }));
    }

    // For other versions of auth service just handle the request as is.
    return next.handle(request).pipe(tap(event => { }, error => {
      let respError = error as HttpErrorResponse;
      this.httpErrorHandler(error);
    }));
  }

  private httpErrorHandler(error: HttpErrorResponse): void {
    let errorToSend = new Error(error);

    if (error.status === 403) {
      errorToSend.customMessage = "You are not authorized!";
    }
    else if (error.status === 401) {
      errorToSend.customMessage = "Session Expired!";
    }
    else if (error.status === 404) {
      if (error.error.message) {
        errorToSend.customMessage = error.error.message;
      }
    }
    else {
      errorToSend.customMessage = "Error occured. Please try again later.";
    }

    this.messageService.messageSource.next(errorToSend);
  }

}
