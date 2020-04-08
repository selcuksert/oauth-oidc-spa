package com.corp.concepts.auth.config;

import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.oauth2.jwt.Jwt;

import com.corp.concepts.auth.config.jwt.CustomJwtAuthenticationConverter;

@EnableWebSecurity
public class ResourceServerConfig extends WebSecurityConfigurerAdapter {
	
	private Converter<Jwt, AbstractAuthenticationToken> jwtConverter; 
	
	public ResourceServerConfig(CustomJwtAuthenticationConverter jwtConverter) {
		this.jwtConverter = jwtConverter;
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.cors().and().authorizeRequests()
				.antMatchers("/api/todo/**").hasAnyRole("todos_api.byid", "todos_api.all")
				.antMatchers("/api/todos").hasRole("todos_api.all")
				.anyRequest().denyAll().and()
				.oauth2ResourceServer().jwt()
				.jwtAuthenticationConverter(jwtConverter);
	}

}
