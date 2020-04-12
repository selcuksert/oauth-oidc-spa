import { Injectable } from '@angular/core';
import { UserManager, User, UserManagerSettings, Log } from "oidc-client";
import { Constants } from '../constants';
import { Auth } from '../intf/auth';
import { Subject, BehaviorSubject } from 'rxjs';
import { User as AppUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthV2Service implements Auth {

  private user: User;
  private appUser: AppUser;
  private userManager: UserManager;
  private loginChangedSubject = new Subject<boolean>();

  private userSource = new BehaviorSubject(this.appUser);
  userSource$ = this.userSource.asObservable();
  
  messageSource = new BehaviorSubject(new String());
  messageSource$ = this.messageSource.asObservable();

  loginChanged$ = this.loginChangedSubject.asObservable();

  constructor() {
    const authSettings: UserManagerSettings = {
      authority: Constants.authUrl,
      client_id: Constants.clientId,
      redirect_uri: Constants.redirectV2Uri,
      scope: Constants.scope,
      response_type: Constants.responseType,
      post_logout_redirect_uri: Constants.signoutV2Uri,
      loadUserInfo: true
    };
    this.userManager = new UserManager(authSettings);

    Log.logger = console;
    Log.level = Log.DEBUG;
  }
  private generateUserInfo(user: User): void {
    if (user && user.profile) {
      this.appUser = new AppUser();
      const userInfo = user.profile;
      this.appUser.email = userInfo['email'];
      this.appUser.name = userInfo['name'];
      this.appUser.title = userInfo['title'];
      this.appUser.username = userInfo['preferred_username'];
      this.appUser.role = userInfo['role'];

      this.userSource.next(this.appUser);
    }
  }

  getUserInfo(): void {
    // No need to implement for this version
  }

  login() {
    this.userManager.signinRedirect();
  }

  completeLogin() {
    return this.userManager.signinRedirectCallback().then(user => {
      this.user = user;
      this.loginChangedSubject.next(!!user && !user.expired);

      this.generateUserInfo(user);

      return user;
    });
  }

  isLoggedIn(): Promise<boolean> {
    return this.userManager.getUser().then(user => {
      const loggedIn = !!user && !user.expired;
      if (this.user !== user) {
        this.loginChangedSubject.next(loggedIn);
      }
      this.user = user;

      this.generateUserInfo(user);

      return loggedIn;
    })
  }

  logout() {
    this.userManager.signoutRedirect();
  }

  completeLogout() {
    this.user = null;
    return this.userManager.signoutRedirectCallback();
  }

  getAccessToken() {
    return this.userManager.getUser().then(user => {
      if (!!user && !user.expired) {
        return user.access_token;
      }

      return null;
    })
  }

}
