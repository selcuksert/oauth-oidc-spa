package com.corp.concepts.auth.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.corp.concepts.auth.model.Todo;

@Service
public class TodoService {
	private RestTemplate restTemplate;

	@Value("${custom.service.todos.url}")
	private String serviceUrl;

	public TodoService(RestTemplate restTemplate) {
		this.restTemplate = restTemplate;
	}

	public List<Todo> getTodoList() {
		ResponseEntity<List<Todo>> response = restTemplate.exchange(serviceUrl,
				HttpMethod.GET, null, new ParameterizedTypeReference<List<Todo>>() {
				});

		List<Todo> respList = response.getBody();

		return respList;
	}
	
	public Todo getTodoById(int id) {
		ResponseEntity<Todo> response = restTemplate.exchange(serviceUrl+"/"+id,
				HttpMethod.GET, null, Todo.class);

		Todo todo = response.getBody();

		return todo;
	}
}
