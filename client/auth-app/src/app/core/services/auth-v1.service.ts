import { Injectable, Input } from '@angular/core';
import { OAuthService, AuthConfig, UserInfo } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { Constants } from '../constants';
import { Auth } from '../intf/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthV1Service implements Auth {
  private user: User;
  private userinfo: UserInfo;

  private userSource = new BehaviorSubject(this.user);
  userSource$ = this.userSource.asObservable();

  constructor(private oauthService: OAuthService) {
    this.configure();
  }

  authConfig: AuthConfig = {
    issuer: Constants.authUrl,
    redirectUri: Constants.redirectV1Uri,
    postLogoutRedirectUri: Constants.webRoot,
    userinfoEndpoint: Constants.userInfoEpUri,
    clientId: Constants.clientId,
    scope: Constants.scope,
    responseType: Constants.responseType,
    disableAtHashCheck: false,
    showDebugInformation: true
  }

  public login() {
    this.oauthService.initLoginFlow();
  }

  public logout() {
    this.oauthService.logOut();
  }

  public isLoggedIn(): Promise<Boolean> {
    if (this.oauthService.hasValidAccessToken()) {
      return this.oauthService.loadUserProfile().then(userinfo => {
        const loggedIn = !!userinfo;
        return loggedIn;
      });
    }
    else {
      return new Promise(resolve => { return resolve(false); });
    }
  }

  public getUserInfo() {
    if (!this.user) {
      let userInfo = this.oauthService.getIdentityClaims();

      if (userInfo) {
        this.user = new User();
        this.user.email = userInfo['email'];
        this.user.name = userInfo['name'];
        this.user.title = userInfo['title'];
        this.user.username = userInfo['preferred_username'];
        this.user.role = userInfo['role'];

        this.userSource.next(this.user);
      }
    }
  }

  getAccessToken(): Promise<String> {
    let token = new String();
    if (this.oauthService.hasValidAccessToken()) {
      token = this.oauthService.getAccessToken();
    }
    return new Promise(resolve => { return resolve(token); });
  }

  private configure() {
    this.oauthService.configure(this.authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

}
