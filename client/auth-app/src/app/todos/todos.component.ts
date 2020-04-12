import { Component, OnInit, Injector } from '@angular/core';
import { Todo } from "../core/models/todo";
import { TodoService } from "../core/services/todo.service";
import { AuthV1Service } from '../core/services/auth-v1.service';
import { AuthV2Service } from '../core/services/auth-v2.service';
import { Auth } from '../core/intf/auth';
import { Constants } from '../core/constants';
import { AuthSvcVer } from '../core/models/auth-svc-ver.enum';

import "@polymer/paper-item";
import "@polymer/paper-item/paper-icon-item";
import "@polymer/paper-item/paper-item-body";
import "@polymer/paper-item/paper-item-shared-styles";
import "@polymer/paper-listbox";
import "@polymer/paper-styles/color";
import "@polymer/paper-styles/paper-styles-classes";
import "@polymer/paper-dialog/paper-dialog";
import "@polymer/app-layout/app-layout";
import "@polymer/app-layout/app-scroll-effects/effects/waterfall";
import "@polymer/iron-icons/iron-icons";
import "@polymer/paper-icon-button/paper-icon-button";
import "@polymer/paper-button/paper-button";
import "@polymer/paper-input/paper-input";
import "@polymer/paper-spinner/paper-spinner";
import { MessageService } from '../core/services/message.service';
import { CustomHttpError } from '../core/models/error';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todoList: Todo[];
  status: Object;
  message: String;
  dialog: any;
  todoId: String;
  loading: Boolean;

  private authService: Auth;

  constructor(private injector: Injector, private todoService: TodoService, private messageService: MessageService) {
    if (AuthSvcVer.V1 === Constants.authSvcVer) {
      this.authService = <AuthV1Service>injector.get(AuthV1Service);
    }
    else {
      this.authService = <AuthV2Service>injector.get(AuthV2Service);
    }

    this.messageService.messageSource$.subscribe((error) => {
      this.openErrorDialog(error);
    })
  }

  ngOnInit(): void {
    this.loading = false;
  }

  ngAfterViewChecked(): void {
    this.authService.getUserInfo();
  }

  public getTodoList(): void {
    this.todoList = [];
    this.loading = true;
    this.todoService.getTodos().subscribe((resp) => {
      this.loading = false;
      this.todoList = resp.body;
    });
  }

  public getTodoById(): void {
    this.todoList = [];
    this.dialog.close();
    this.loading = true;
    this.todoService.getTodoById(this.todoId).subscribe((resp) => {
      this.loading = false;
      this.todoList.push(resp.body);
      this.todoId = "";
    });
  }

  public openByIdDialog(): void {
    this.dialog = document.getElementById('getByIdDialog');
    this.dialog.positionTarget = document.getElementById('todoListArea');
    this.dialog.open();
  }

  public logout(): void {
    this.authService.logout();
  }

  private openErrorDialog(error: CustomHttpError): void {
    this.loading = false;
    this.dialog = document.getElementById('msgDialog');
    if (this.dialog) {
      this.dialog.positionTarget = document.getElementById('todoListArea');
      this.todoList = [];
      this.todoId = "";
      this.message = error.customMessage;
      this.dialog.open();

      // Session expired. Drive client to logout flow.
      if (401 === error.httpError.status) {
        this.logout();
      }
    }
  }
}
