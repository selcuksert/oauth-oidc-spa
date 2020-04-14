
# Resource Server

Spring Security OAuth2 Boot based [resource server](https://docs.spring.io/spring-security-oauth2-boot/docs/current/reference/htmlsingle/#boot-features-security-oauth2-resource-server) that provides a ToDo list as a resource using an external [test API](http://jsonplaceholder.typicode.com/todos) of JSONPlaceholder

## Configuration

The `application.properties` file contains several parameters to integrate the resource server with resource, client and authorization server:

* *custom.security.provider<span></span>.realm.name:* Realm name defined in authorization server
* *custom.security.provider.jwt.claim.key:* This resource server uses realm level roles instead of scopes to authorize API requests (see [`CustomJwtAuthenticationConverter`](src/main/java/com/corp/concepts/auth/config/jwt/CustomJwtAuthenticationConverter.java)). This parameter needs to be set with the top level JSON field name that JWT access token contains realm access data. For Keycloak this is `realm_access`:
    ```json
    "realm_access": {
        "roles": [
            "todos_api.all",
            "offline_access",
            "uma_authorization"
        ]
    }
    ```
* *custom.security.provider.jwt.role.key:* This resource server uses realm level roles to authorize API request. This parameter needs to be set with the sub level JSON field name that JWT access token contains roles. For Keycloak this is `roles` (see above)
* *custom.proxy.enabled:* Boolean to identify whether resource server is behind a proxy
* *custom.proxy.host:* Proxy server host (valid when `custom.proxy.enabled: true`)
* *custom.proxy.port:* Proxy server port (valid when `custom.proxy.enabled: true`)
* *custom.service.todos.url:* Resource URL (for this one JSONPlaceholder /todos API)
* *spring.security.oauth2.resourceserver.jwt.jwk-set-uri:* URI of token verification endpoint exposed by authorization server. Resource Server verifies the Token’s signature to ensure the JWT was not tampered. This endpoint provides the public key that the server needs for validation.

## Authorization Mechanism

After resource server validates token the request is validated whether it is authorized based on filter chain configuration in [`ResourceServerConfig`](src/main/java/com/corp/concepts/auth/config/ResourceServerConfig.java). The configuration simply checks whether invoked API endpoint's URL pattern's corresponding role setting (`hasRole()`, `hasAnyrole()`) match within role list in access JWT:

```java
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.cors().and().authorizeRequests()
				.antMatchers("/api/todo/**").hasAnyRole("development", "management")
				.antMatchers("/api/todos").hasRole("management")
				.anyRequest().denyAll().and()
				.oauth2ResourceServer().jwt()
				.jwtAuthenticationConverter(jwtConverter);
	}
```

Unauthorized access (call to `/api/todos` -> client has no granted authority of `ROLE_todos_api.all`):
```
2020-04-12 21:39:30.826 DEBUG 16372 --- [nio-8081-exec-1] o.s.s.w.u.matcher.AntPathRequestMatcher  : Checking match of request : '/api/todos'; against '/api/todos'
2020-04-12 21:39:30.829 DEBUG 16372 --- [nio-8081-exec-1] o.s.s.w.a.i.FilterSecurityInterceptor    : Secure object: FilterInvocation: URL: /api/todos; Attributes: [hasRole('ROLE_todos_api.all')]
2020-04-12 21:39:30.830 DEBUG 16372 --- [nio-8081-exec-1] o.s.s.w.a.i.FilterSecurityInterceptor    : Previously Authenticated: org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken@fe58526d: Principal: org.springframework.security.oauth2.jwt.Jwt@b0a0569f; Credentials: [PROTECTED]; Authenticated: true; Details: org.springframework.security.web.authentication.WebAuthenticationDetails@b364: RemoteIpAddress: 0:0:0:0:0:0:0:1; SessionId: null; Granted Authorities: ROLE_offline_access, ROLE_todos_api.byid, SCOPE_openid, SCOPE_email, ROLE_uma_authorization, SCOPE_profile
2020-04-12 21:39:30.841 DEBUG 16372 --- [nio-8081-exec-1] o.s.s.access.vote.AffirmativeBased       : Voter: org.springframework.security.web.access.expression.WebExpressionVoter@541a6ecb, returned: -1
2020-04-12 21:39:30.851 DEBUG 16372 --- [nio-8081-exec-1] o.s.s.w.a.ExceptionTranslationFilter     : Access is denied (user is not anonymous); delegating to AccessDeniedHandler

org.springframework.security.access.AccessDeniedException: Access is denied
```
Authorized access (call to `/api/todo/{id}` -> client has granted authority of `ROLE_todos_api.byid`):
```
2020-04-12 21:44:16.625 DEBUG 16372 --- [nio-8081-exec-5] o.s.s.w.u.matcher.AntPathRequestMatcher  : Checking match of request : '/api/todo/12'; against '/api/todo/**'
2020-04-12 21:44:16.626 DEBUG 16372 --- [nio-8081-exec-5] o.s.s.w.a.i.FilterSecurityInterceptor    : Secure object: FilterInvocation: URL: /api/todo/12; Attributes: [hasAnyRole('ROLE_todos_api.byid','ROLE_todos_api.all')]
2020-04-12 21:44:16.626 DEBUG 16372 --- [nio-8081-exec-5] o.s.s.w.a.i.FilterSecurityInterceptor    : Previously Authenticated: org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken@fe58526d: Principal: org.springframework.security.oauth2.jwt.Jwt@dc526178; Credentials: [PROTECTED]; Authenticated: true; Details: org.springframework.security.web.authentication.WebAuthenticationDetails@b364: RemoteIpAddress: 0:0:0:0:0:0:0:1; SessionId: null; Granted Authorities: ROLE_offline_access, ROLE_todos_api.byid, SCOPE_openid, SCOPE_email, ROLE_uma_authorization, SCOPE_profile
2020-04-12 21:44:16.628 DEBUG 16372 --- [nio-8081-exec-5] o.s.s.access.vote.AffirmativeBased       : Voter: org.springframework.security.web.access.expression.WebExpressionVoter@541a6ecb, returned: 1
2020-04-12 21:44:16.628 DEBUG 16372 --- [nio-8081-exec-5] o.s.s.w.a.i.FilterSecurityInterceptor    : Authorization successful
2020-04-12 21:44:16.628 DEBUG 16372 --- [nio-8081-exec-5] o.s.s.w.a.i.FilterSecurityInterceptor    : RunAsManager did not change Authentication object
2020-04-12 21:44:16.629 DEBUG 16372 --- [nio-8081-exec-5] o.s.security.web.FilterChainProxy        : /api/todo/12 reached end of additional filter chain; proceeding with original chain
2020-04-12 21:44:16.638 DEBUG 16372 --- [nio-8081-exec-5] o.s.web.servlet.DispatcherServlet        : GET "/api/todo/12", parameters={}
2020-04-12 21:44:16.639 DEBUG 16372 --- [nio-8081-exec-5] s.w.s.m.m.a.RequestMappingHandlerMapping : Mapped to com.corp.concepts.oauthrserver.controller.TodosController#todo(int)
2020-04-12 21:44:16.676 DEBUG 16372 --- [nio-8081-exec-5] o.s.web.client.RestTemplate              : HTTP GET http://jsonplaceholder.typicode.com/todos/12
2020-04-12 21:44:16.757 DEBUG 16372 --- [nio-8081-exec-5] o.s.web.client.RestTemplate              : Accept=[application/json, application/*+json]
2020-04-12 21:44:16.894 DEBUG 16372 --- [nio-8081-exec-5] o.s.web.client.RestTemplate              : Response 200 OK
```
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

