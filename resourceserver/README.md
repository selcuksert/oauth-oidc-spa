
# Resource Server

Spring Security OAuth2 Boot based [resource server](https://docs.spring.io/spring-security-oauth2-boot/docs/current/reference/htmlsingle/#boot-features-security-oauth2-resource-server) that provides a ToDo list as a resource using an external [test API](http://jsonplaceholder.typicode.com/todos) of JSONPlaceholder

## Configuration

The `application.properties` file contains several parameters to integrate the resource server with resource, client and authorization server:

* *custom.security.provider<span></span>.realm.name:* Realm name defined in authorization server
* *custom.security.provider.jwt.claim.key:* This resource server uses realm level roles to authorize API request. This parameter needs to be set with the top level JSON field name that JWT access token contains realm access data. e.g (for Keycloak):
    ````json
    "realm_access": {
        "roles": [
            "todos_api.all",
            "offline_access",
            "uma_authorization"
        ]
    }
    ````    
* *custom.security.provider.jwt.role.key:* This resource server uses realm level roles to authorize API request. This parameter needs to be set with the sub level JSON field name that JWT access token contains roles (see above)
* *custom.proxy.enabled:* Boolean to identify whether resource server is behind a proxy
* *custom.proxy.host:* Proxy server host (valid when `custom.proxy.enabled: true`)
* *custom.proxy.port:* Proxy server port (valid when `custom.proxy.enabled: true`)
* *custom.service.todos.url:* Resource URL (for this one JSONPlaceholder /todos API)
* *spring.security.oauth2.resourceserver.jwt.jwk-set-uri:* URI of token verification endpoint exposed by authorization server. Resource Server verifies the Token’s signature to ensure the JWT was not tampered. This endpoint provides the public key that the server needs for validation.

## Additional References

### Reference Documentation
For further reference, please consider the following sections:

* [Official Apache Maven documentation](https://maven.apache.org/guides/index.html)
* [Spring Boot Maven Plugin Reference Guide](https://docs.spring.io/spring-boot/docs/2.2.5.RELEASE/maven-plugin/)
* [Spring Security](https://docs.spring.io/spring-boot/docs/2.2.5.RELEASE/reference/htmlsingle/#boot-features-security)
* [OAuth2 Client](https://docs.spring.io/spring-boot/docs/2.2.5.RELEASE/reference/htmlsingle/#boot-features-security-oauth2-client)
* [Spring Web](https://docs.spring.io/spring-boot/docs/2.2.5.RELEASE/reference/htmlsingle/#boot-features-developing-web-applications)

### Guides
The following guides illustrate how to use some features concretely:

* [Securing a Web Application](https://spring.io/guides/gs/securing-web/)
* [Spring Boot and OAuth2](https://spring.io/guides/tutorials/spring-boot-oauth2/)
* [Authenticating a User with LDAP](https://spring.io/guides/gs/authenticating-ldap/)
* [Building a RESTful Web Service](https://spring.io/guides/gs/rest-service/)
* [Serving Web Content with Spring MVC](https://spring.io/guides/gs/serving-web-content/)
* [Building REST services with Spring](https://spring.io/guides/tutorials/bookmarks/)

