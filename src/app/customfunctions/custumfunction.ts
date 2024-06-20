import {HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";

export function handleError(error: HttpErrorResponse): Observable<never> {
  console.log(error);
  let errorMessage: string;
if (error.error instanceof ErrorEvent) {
  errorMessage = `A client error occurred - ${error.error.message}`;
} else {
  if (error.error.reason) {
    errorMessage = error.error.reason;
    console.log(errorMessage);
  } else {
    errorMessage = `An error occurred - Error status ${error.status}`;
  }
}
return throwError(() => errorMessage);
}
