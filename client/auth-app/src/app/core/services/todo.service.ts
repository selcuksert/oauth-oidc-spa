import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Todo } from '../models/todo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todosUrl = 'http://localhost:8081/api/todos';  // URL to web api
  private todoUrl = 'http://localhost:8081/api/todo';  // URL to web api

  constructor(private http: HttpClient) {
  }

  /** GET todo list from the server */
  getTodos(): Observable<HttpResponse<Todo[]>> {
    return this.http.get<Todo[]>(this.todosUrl, { observe: 'response' });
  }

  /** GET task by id from the server */
  getTodoById(id: String): Observable<HttpResponse<Todo>> {
    const url = `${this.todoUrl}/${id}`;

    return this.http.get<Todo>(url, { observe: 'response' });
  }

}
