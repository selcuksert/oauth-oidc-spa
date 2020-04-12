# SPA OAuth & OIDC client

This SPA relies on two different OpenID certified OAuth & OIDC client and can be used alternatively with setting the [`authSvcVer`](/blob/272d0ff33231812662a17888cfa0b02729267f78/client/auth-app/src/app/core/constants.ts#L5) (default: V1) parameter with relevant version in Constants TS class:

* V1: [angular-oauth2-oidc](https://github.com/manfredsteyer/angular-oauth2-oidc)  
* V2: [oidc-client-js](https://github.com/IdentityModel/oidc-client-js) 

# Instructions

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.6.

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
