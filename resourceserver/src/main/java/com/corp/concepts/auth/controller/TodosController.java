package com.corp.concepts.auth.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;

import com.corp.concepts.auth.model.Todo;
import com.corp.concepts.auth.service.TodoService;

@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class TodosController {
	private TodoService todoService;

	public TodosController(TodoService todoService) {
		this.todoService = todoService;
	}

	@GetMapping(path = "/todos")
	public List<Todo> todos() {
		return todoService.getTodoList();
	}

	@GetMapping("/todo/{id}")
	public Todo todo(@PathVariable("id") int id) {
		Todo todo = null;
		try {
			todo = todoService.getTodoById(id);
		} catch (HttpClientErrorException he) {
			if (he.getStatusCode() == HttpStatus.NOT_FOUND) {
				throw new TodoNotFoundException();
			}
		}

		return todo;
	}

	@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "Task not found!")
	class TodoNotFoundException extends RuntimeException {
		private static final long serialVersionUID = 1L;
	}
}