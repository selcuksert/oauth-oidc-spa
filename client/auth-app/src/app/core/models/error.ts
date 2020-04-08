import { HttpErrorResponse } from '@angular/common/http';

export class CustomHttpError {
    customMessage: string;
    httpError: HttpErrorResponse;

    constructor(error: HttpErrorResponse) {
        this.httpError = error;
    }
}