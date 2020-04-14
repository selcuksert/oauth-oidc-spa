package com.corp.concepts.auth;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * SpringBoot OAuth2 ResourceServer implementation
 * 
 * For details 
 * @see <a href="https://github.com/selcuksert/oauth-oidc-spa">Project GitHub page</a>
 * 
 * @author <a href="https://linkedin.com/in/selcuksert">Selcuk SERT</a>
 */
@SpringBootApplication
public class AuthApplication {

	public static void main(String[] args) {
		SpringApplication.run(AuthApplication.class, args);
	}

}
