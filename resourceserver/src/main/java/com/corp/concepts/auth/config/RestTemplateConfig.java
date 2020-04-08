package com.corp.concepts.auth.config;

import java.net.InetSocketAddress;
import java.net.Proxy;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.web.client.RestTemplate;

@Configuration
public class RestTemplateConfig {
	private RestTemplate restTemplate;

	@Value("${custom.proxy.host}")
	private String proxyHost;

	@Value("${custom.proxy.port}")
	private int proxyPort;

	@Value("${custom.proxy.enabled}")
	private boolean proxyEnabled;

	public RestTemplateConfig(RestTemplateBuilder builder) {
		this.restTemplate = builder.build();
	}

	@Bean
	public RestTemplate getRestTemplate() {
		if (proxyEnabled) {
			SimpleClientHttpRequestFactory clientHttpReq = new SimpleClientHttpRequestFactory();
			Proxy proxy = new Proxy(Proxy.Type.HTTP, new InetSocketAddress(proxyHost, proxyPort));
			clientHttpReq.setProxy(proxy);

			restTemplate.setRequestFactory(clientHttpReq);
		}

		return restTemplate;
	}

}
