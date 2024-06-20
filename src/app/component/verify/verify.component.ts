import {Component, OnInit} from '@angular/core';
import {DataState} from '../../enum/datastate.enum';
import {UserService} from "../../service/user.service";
import {BehaviorSubject, catchError, map, Observable, of, startWith, switchMap} from "rxjs";
import {AccountType, VerifySate} from "../../interface/appstates";
import {NgForm} from "@angular/forms";
import {User} from "../../interface/user";
import {ActivatedRoute, ParamMap} from "@angular/router";

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.css'
})
export class VerifyComponent implements OnInit {
  verifyState$: Observable<VerifySate>;
  readonly DataState = DataState;
  private userSubject = new BehaviorSubject<User>(null);
  user$ = this.userSubject.asObservable();
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();
  private readonly ACCOUNT_KEY: string = 'key';

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService) {
  }

  ngOnInit(): void {
    this.verifyState$ = this.activatedRoute.paramMap.pipe(
      switchMap((params: ParamMap) => {
        console.log(this.activatedRoute);
        const type: AccountType = this.getAccountType(window.location.href);
        return this.userService.verify$(params.get(this.ACCOUNT_KEY), type)
          .pipe(
            map(response => {
              console.log(response);
              type === 'password' ? this.userSubject.next(response.data.user) : null;
              return {
                type,
                title: 'Verified!',
                dataState: DataState.LOADED,
                message: response.message,
                verifySuccess: true
              };
            }),
            startWith({
              title: 'Verifying...',
              dataState: DataState.LOADING,
              message: 'Please wait while we verify the information',
              verifySuccess: false
            }),
            catchError((error: string) => {
              return of({title: error, dataState: DataState.ERROR, error, message: error, verifySuccess: false})
            })
          )
      })
    );
  }

  renewPassword(resetPasswordform: NgForm): void {
    this.isLoadingSubject.next(true);
    this.verifyState$ = this.userService.renewPassword$({
      userId: this.userSubject.value.id,
      password: resetPasswordform.value.password,
      confirmPassword: resetPasswordform.value.confirmPassword
    })
      .pipe(
        map(response => {
          console.log(response);
          this.isLoadingSubject.next(false);
          return {
            type: 'account' as AccountType,
            title: 'Success',
            dataState: DataState.LOADED,
            message: response.message,
            verifySuccess: true
          };
        }),
        startWith({
          type: 'password' as AccountType,
          title: 'Verified!',
          dataState: DataState.LOADED,
          verifySuccess: false
        }),
        catchError((error: string) => {
          this.isLoadingSubject.next(false);
          return of({
            type: 'password' as AccountType,
            title: 'Verified!',
            dataState: DataState.LOADED,
            error,
            verifySuccess: true
          })
        })
      )
  }

  private getAccountType(url: string): AccountType {
    return url.includes('password') ? 'password' : 'account';
  }

}
