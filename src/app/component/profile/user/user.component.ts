import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {BehaviorSubject, catchError, map, Observable, of, startWith} from "rxjs";
import {State} from "../../../interface/state";
import {CustomHttpResponse, Profile} from "../../../interface/appstates";
import {UserService} from "../../../service/user.service";
import {DataState} from '../../../enum/datastate.enum';
import {NgForm} from "@angular/forms";
import { EventType } from '../../../enum/event-type.enum';
import { Key } from '../../../enum/key.enum';
@Component({
  selector: 'app-profile',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent implements OnInit {
  profileState$: Observable<State<CustomHttpResponse<Profile>>>;
  readonly DataState = DataState;
  private dataSubject = new BehaviorSubject<CustomHttpResponse<Profile>>(null);
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();
  private showLogsSubject = new BehaviorSubject<boolean>(false);
  showLogs$ = this.showLogsSubject.asObservable();

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.profileState$ = this.userService.profile$()
      .pipe(
        map(response => {
          console.log(response);
          this.dataSubject.next(response);
          return {dataState: DataState.LOADED, appData: response};
        }),
        startWith({dataState: DataState.LOADING}),
        catchError((error: string) => {
          return of({dataState: DataState.ERROR, appData: this.dataSubject.value, error})
        })
      )
  }

  updateProfile(profileForm: NgForm): void {
    this.isLoadingSubject.next(true);
    this.profileState$ = this.userService.update$(profileForm.value)
      .pipe(
        map(response => {
          console.log(response);
          this.dataSubject.next({...response, data: response.data});
          this.isLoadingSubject.next(false);
          return {dataState: DataState.LOADED, appData: this.dataSubject.value};
        }),
        startWith({dataState: DataState.LOADED, appData: this.dataSubject.value}),
        catchError((error: string) => {
          this.isLoadingSubject.next(false);
          return of({dataState: DataState.LOADED, appData: this.dataSubject.value, error})
        })
      )
  }

  updatePassword(passwordForm: NgForm): void {
    this.isLoadingSubject.next(true);
    if (passwordForm.value.newPassword === passwordForm.value.confirmNewPassword) {
      this.profileState$ = this.userService.updatePassword$(passwordForm.value)
        .pipe(
          map(response => {
            console.log(response);
            this.dataSubject.next({...response, data: response.data});
            passwordForm.reset();
            this.isLoadingSubject.next(false);
            return {dataState: DataState.LOADED, appData: this.dataSubject.value};
          }),
          startWith({dataState: DataState.LOADED, appData: this.dataSubject.value}),
          catchError((error: string) => {
            passwordForm.reset();
            this.isLoadingSubject.next(false);
            return of({dataState: DataState.LOADED, appData: this.dataSubject.value, error})
          })
        )
    } else {
      passwordForm.reset();
      this.isLoadingSubject.next(false);
    }
  }

  updateRole(roleForm: NgForm): void {
    this.isLoadingSubject.next(true);
    this.profileState$ = this.userService.updateRoles$(roleForm.value.roleName)
      .pipe(
        map(response => {
          console.log(response);
          this.dataSubject.next({...response, data: response.data});
          this.isLoadingSubject.next(false);
          return {dataState: DataState.LOADED, appData: this.dataSubject.value};
        }),
        startWith({dataState: DataState.LOADED, appData: this.dataSubject.value}),
        catchError((error: string) => {
          this.isLoadingSubject.next(false);
          return of({dataState: DataState.LOADED, appData: this.dataSubject.value, error})
        })
      )
  }

  updateAccountSettings(settingsForm: NgForm): void {
    this.isLoadingSubject.next(true);
    this.profileState$ = this.userService.updateAccountSettings$(settingsForm.value)
      .pipe(
        map(response => {
          console.log(response);
          this.dataSubject.next({...response, data: response.data});
          this.isLoadingSubject.next(false);
          return {dataState: DataState.LOADED, appData: this.dataSubject.value};
        }),
        startWith({dataState: DataState.LOADED, appData: this.dataSubject.value}),
        catchError((error: string) => {
          this.isLoadingSubject.next(false);
          return of({dataState: DataState.LOADED, appData: this.dataSubject.value, error})
        })
      )
  }

  toggleMfa(): void {
    this.isLoadingSubject.next(true);
    this.profileState$ = this.userService.toggleMfa$()
      .pipe(
        map(response => {
          console.log(response);
          this.dataSubject.next({...response, data: response.data});
          this.isLoadingSubject.next(false);
          return {dataState: DataState.LOADED, appData: this.dataSubject.value};
        }),
        startWith({dataState: DataState.LOADED, appData: this.dataSubject.value}),
        catchError((error: string) => {
          this.isLoadingSubject.next(false);
          return of({dataState: DataState.LOADED, appData: this.dataSubject.value, error})
        })
      )
  }

  updatePicture(image: File): void {
    if (image) {
      this.isLoadingSubject.next(true);
      this.profileState$ = this.userService.updateImage$(this.getFormData(image))
        .pipe(
          map(response => {
            console.log(response);
            this.dataSubject.next({
              ...response,
              data: {
                ...response.data,
                user: {...response.data.user, imageUrl: `${response.data.user.imageUrl}?time=${new Date().getTime()}`}
              }
            });
            this.isLoadingSubject.next(false);
            return {dataState: DataState.LOADED, appData: this.dataSubject.value};
          }),
          startWith({dataState: DataState.LOADED, appData: this.dataSubject.value}),
          catchError((error: string) => {
            this.isLoadingSubject.next(false);
            return of({dataState: DataState.LOADED, appData: this.dataSubject.value, error})
          })
        )
    }
  }

  toggleLogs(): void {
    this.showLogsSubject.next(!this.showLogsSubject.value);
  }

  private getFormData(image: File): FormData {
    const formData = new FormData();
    formData.append('image', image);
    return formData;
  }

  protected readonly EventType = EventType;
}
