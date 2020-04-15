# SPA OAuth & OIDC client

Angular and [Polymer Elements](https://www.webcomponents.org/author/PolymerElements) based OAuth & OIDC SPA client

This SPA relies on two different OpenID certified OAuth & OIDC client and can be used alternatively with setting the `authSvcVer` (default: V1) parameter with relevant [`AuthSvcVer`](src/app/core/models/auth-svc-ver.enum.ts) enumerated version in [`Constants`](src/app/core/constants.ts) TS class:

```javascript
public static authSvcVer: AuthSvcVer = AuthSvcVer.V1; 
```
* V1: [angular-oauth2-oidc](https://github.com/manfredsteyer/angular-oauth2-oidc)  
* V2: [oidc-client-js](https://github.com/IdentityModel/oidc-client-js)

There are two different authorization service implementations per aforementioned client libraries and each are configured using Constants TS class:

* *realmName:* Realm name defined in authorization server
* *webRoot:* Client root URI
* *idmRoot:* Authorization server root URI
* *authUrl:* Authorization endpoint URL based on Keycloak endpoint standards
* *redirectV1Uri:* Redirect URI for authorization service V1 
* *redirectV2Uri:* Redirect URI for authorization service V2. It requires a specific callback page.
* *signoutV2Uri:* Signout URI for authorization service V2. It requires a specific callback page.
* *userInfoEpUri:* URI for user info endpoint based on Keycloak endpoint standards
* *clientId:* Client ID configured in authorization server
* *scope:* Requested access scope list. Needs to include `openid` to enable OpenID Connect. `profile email roles` are needed to retrieve realted user info and assigned roles to user.
* *responseType:* Response type. Needs to be set as `code` to enable PKCE with AuthZ code flow. 

# Sample Screenshots
![screenshots](/doc/images/screenshots.jpg)

# Angular Related Instructions

This project was generated with [Angular CLI](https://github.com/angular/angular-cli).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
