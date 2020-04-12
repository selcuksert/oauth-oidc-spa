# oauth-oidc-spa
This repository hosts a sample project on [OAuth & OIDC Authorization Code Flow with PKCE](https://tools.ietf.org/html/rfc7636) that comprises of an Angular &amp; Polymer based SPA (Single Page App) [client](/client/auth-app), Spring Boot based [resource server](/resourceserver) and an Keycloak [authorization server](/idp).

## Authorization Code Flow & PKCE
The project relies on [OAuth & OIDC Authorization Code Flow with PKCE](https://tools.ietf.org/html/rfc7636) that is the [recommended method](https://developer.okta.com/blog/2019/08/22/okta-authjs-pkce) to use for SPA clients instead of implicit flow:

![PKCE](/doc/images/OAuth2-OIDC.jpg)

The libraries/solutions in place are in [Certified OpenID Connect Implementations](https://openid.net/developers/certified/) list:

* [**Client:**](/client/auth-app) Two alternatives are available for use:
  * [angular-oauth2-oidc](https://github.com/manfredsteyer/angular-oauth2-oidc)   
  * [oidc-client-js](https://github.com/IdentityModel/oidc-client-js)
* [**Authorization Server:**](/idp) [Keycloak](https://www.keycloak.org/)
* [**Resource Server:**](/resourceserver)  Spring Security OAuth2 Boot based [resource server](https://docs.spring.io/spring-security-oauth2-boot/docs/current/reference/htmlsingle/#boot-features-security-oauth2-resource-server) that provides a ToDo list as a resource using an external [test API](http://jsonplaceholder.typicode.com/todos) of JSONPlaceholder

The basic project architecture is as follows (in Archimate standard):

![Architecture](/doc/images/arch.jpg)


