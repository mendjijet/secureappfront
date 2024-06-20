import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, tap, throwError} from "rxjs";
import {AccountType, CustomHttpResponse, Profile} from "../interface/appstates";
import {environment} from "../../environments/environment.development";
import {Key} from "../enum/key.enum";
import {User} from "../interface/user";
import {JwtHelperService} from "@auth0/angular-jwt";
import {handleError} from "../customfunctions/custumfunction";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {
  }

  login$ = (email: string, password: string) => <Observable<CustomHttpResponse<Profile>>>
    this.http.post<CustomHttpResponse<Profile>>(`${environment.API_HOST}/user/login`, {email, password}).pipe(
      tap(console.log), catchError(handleError)
    );

  save$ = (user: User) => <Observable<CustomHttpResponse<Profile>>>
    this.http.post<CustomHttpResponse<Profile>>
    (`${environment.API_HOST}/user/register`, user)
      .pipe(
        tap(console.log),
        catchError(handleError)
      );

  requestPasswordReset$ = (email: string) => <Observable<CustomHttpResponse<Profile>>>
    this.http.get<CustomHttpResponse<Profile>>
    (`${environment.API_HOST}/user/resetpassword/${email}`)
      .pipe(
        tap(console.log),
        catchError(handleError)
      );

  verifyCode$ = (email: string, code: string) => <Observable<CustomHttpResponse<Profile>>>
    this.http.get<CustomHttpResponse<Profile>>
    (`${environment.API_HOST}/user/verify/code/${email}/${code}`)
      .pipe(
        tap(console.log),
        catchError(handleError)
      );

  verify$ = (key: string, type: AccountType) => <Observable<CustomHttpResponse<Profile>>>
    this.http.get<CustomHttpResponse<Profile>>
    (`${environment.API_HOST}/user/verify/${type}/${key}`)
      .pipe(
        tap(console.log),
        catchError(handleError)
      );

  renewPassword$ = (form: { userId: number, password: string, confirmPassword: string }) => <Observable<CustomHttpResponse<Profile>>>
    this.http.put<CustomHttpResponse<Profile>>
    (`${environment.API_HOST}/user/new/password`, form)
      .pipe(
        tap(console.log),
        catchError(handleError)
      );

  profile$ = () => <Observable<CustomHttpResponse<Profile>>>
    this.http.get<CustomHttpResponse<Profile>>
    (`${environment.API_HOST}/user/profile`)
      .pipe(
        tap(console.log),
        catchError(handleError)
      );

  update$ = (user: User) => <Observable<CustomHttpResponse<Profile>>>
    this.http.patch<CustomHttpResponse<Profile>>
    (`${environment.API_HOST}/user/update`, user)
      .pipe(
        tap(console.log),
        catchError(handleError)
      );

  refreshToken$ = () => <Observable<CustomHttpResponse<Profile>>>
    this.http.get<CustomHttpResponse<Profile>>
    (`${environment.API_HOST}/user/refresh/token`, {headers: {Authorization: `Bearer ${localStorage.getItem(Key.REFRESH_TOKEN)}`}})
      .pipe(
        tap(response => {
          console.log(response);
          localStorage.removeItem(Key.TOKEN);
          localStorage.removeItem(Key.REFRESH_TOKEN);
          localStorage.setItem(Key.TOKEN, response.data.access_token);
          localStorage.setItem(Key.REFRESH_TOKEN, response.data.refresh_token);
        }),
        catchError(handleError)
      );

  updatePassword$ = (form: {
    currentPassword: string,
    newPassword: string,
    confirmNewPassword: string
  }) => <Observable<CustomHttpResponse<Profile>>>
    this.http.patch<CustomHttpResponse<Profile>>
    (`${environment.API_HOST}/user/update/password`, form)
      .pipe(
        tap(console.log),
        catchError(handleError)
      );

  updateRoles$ = (roleName: string) => <Observable<CustomHttpResponse<Profile>>>
    this.http.patch<CustomHttpResponse<Profile>>
    (`${environment.API_HOST}/user/update/role/${roleName}`, {})
      .pipe(
        tap(console.log),
        catchError(handleError)
      );

  updateAccountSettings$ = (settings: {
    enabled: boolean,
    notLocked: boolean
  }) => <Observable<CustomHttpResponse<Profile>>>
    this.http.patch<CustomHttpResponse<Profile>>
    (`${environment.API_HOST}/user/update/settings`, settings)
      .pipe(
        tap(console.log),
        catchError(handleError)
      );

  toggleMfa$ = () => <Observable<CustomHttpResponse<Profile>>>
    this.http.patch<CustomHttpResponse<Profile>>
    (`${environment.API_HOST}/user/togglemfa`, {})
      .pipe(
        tap(console.log),
        catchError(handleError)
      );

  updateImage$ = (formData: FormData) => <Observable<CustomHttpResponse<Profile>>>
    this.http.patch<CustomHttpResponse<Profile>>
    (`${environment.API_HOST}/user/update/image`, formData)
      .pipe(
        tap(console.log),
        catchError(handleError)
      );

  isAuthenticated = (): boolean => (this.jwtHelper.decodeToken<string>(localStorage.getItem(Key.TOKEN))
    && !this.jwtHelper.isTokenExpired(localStorage.getItem(Key.TOKEN)));

  logOut() {
    localStorage.removeItem(Key.TOKEN);
    localStorage.removeItem(Key.REFRESH_TOKEN);
  }

}
