import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { CustomHttpError } from '../models/error';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messageSource: BehaviorSubject<CustomHttpError>;
  messageSource$: Observable<CustomHttpError>;

  constructor() {
    this.messageSource = new BehaviorSubject(CustomHttpError.prototype);
    this.messageSource$ = this.messageSource.asObservable();
  }
}
