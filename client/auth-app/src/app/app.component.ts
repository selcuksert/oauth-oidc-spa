import { Component, Injector } from '@angular/core';
import { User } from './core/models/user';
import { AuthV2Service } from './core/services/auth-v2.service';
import { AuthV1Service } from './core/services/auth-v1.service';
import { Auth } from './core/intf/auth';
import { Constants } from './core/constants';
import { AuthSvcVer } from './core/models/auth-svc-ver.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'auth-app';
  private authService: Auth;
  public userInfo: String;

  constructor(private injector: Injector) {
    if (AuthSvcVer.V1 === Constants.authSvcVer) {
      this.authService = <AuthV1Service>injector.get(AuthV1Service);
    }
    else {
      this.authService = <AuthV2Service>injector.get(AuthV2Service);
    }

    this.authService.userSource$.subscribe((user: User) => {
      if (user) {
        this.userInfo = `${user.name} | ${user.role}`
      }
    })
  }

  ngOnInit(): void {
    this.userInfo = '';
  }

}
