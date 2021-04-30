# oauth-oidc-spa
This repository hosts a sample project on [OAuth & OIDC Authorization Code Flow with PKCE](https://tools.ietf.org/html/rfc7636) that comprises of an Angular &amp; Polymer based SPA (Single Page App) [client](/client/auth-app), Spring Boot based [resource server](/resourceserver), Keycloak [authorization server](/idp) and an [OpenLDAP](https://www.openldap.org/) based directory server.

This is a PoC for the Linkedin Blog: [Single Page Application Security with OAuth and OpenID Connect](https://www.linkedin.com/pulse/single-page-application-security-oauth-openid-connect-selcuk-sert?trk=public_profile_article_view)

## Authorization Code Flow & PKCE
The project relies on [OAuth & OIDC Authorization Code Flow with PKCE](https://tools.ietf.org/html/rfc7636) that is the [recommended method](https://developer.okta.com/blog/2019/08/22/okta-authjs-pkce) to use for SPA clients instead of implicit flow:

![PKCE](/doc/images/OAuth2-OIDC.jpg)

The libraries/solutions in place are in [Certified OpenID Connect Implementations](https://openid.net/developers/certified/) list:

* [**Client:**](/client/auth-app) Two alternatives are available for use:
  * [angular-oauth2-oidc](https://github.com/manfredsteyer/angular-oauth2-oidc)   
  * [oidc-client-js](https://github.com/IdentityModel/oidc-client-js)
* [**Authorization Server:**](/idp) [Keycloak](https://www.keycloak.org/)

The basic project architecture is as follows (in Archimate standard):

![Architecture](/doc/images/arch.jpg)


