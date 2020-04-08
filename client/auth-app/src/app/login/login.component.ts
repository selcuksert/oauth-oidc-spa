import { Component, OnInit, Injector } from '@angular/core';
import { AuthV1Service } from "../core/services/auth-v1.service";
import { AuthV2Service } from '../core/services/auth-v2.service';
import { Constants } from '../core/constants';
import { Auth } from '../core/intf/auth';
import { AuthSvcVer } from '../core/models/auth-svc-ver.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = 'Application Access Page';
  private authService: Auth;

  constructor(private injector: Injector) {
    if (AuthSvcVer.V1 === Constants.authSvcVer) {
      this.authService = <AuthV1Service>injector.get(AuthV1Service);
    }
    else {
      this.authService = <AuthV2Service>injector.get(AuthV2Service);
    }
  }

  ngOnInit(): void {
    this.authService.isLoggedIn().then(loggedIn => {
      if (loggedIn) {
        this.login();
      }
    })
  }

  public login(): void {
    this.authService.login();
  }

}
