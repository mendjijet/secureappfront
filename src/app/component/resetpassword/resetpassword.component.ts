import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { DataState } from '../../enum/datastate.enum';
import {UserService} from "../../service/user.service";
import {catchError, map, Observable, of, startWith} from "rxjs";
import {RegisterState} from "../../interface/appstates";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetpasswordComponent {
  resetPasswordState$: Observable<RegisterState> = of({ dataState: DataState.LOADED });
  readonly DataState = DataState;

  constructor(private userService: UserService) { }

  resetPassword(resetPasswordForm: NgForm): void {
    this.resetPasswordState$ = this.userService.requestPasswordReset$(resetPasswordForm.value.email)
      .pipe(
        map(response => {
          console.log(response);
          resetPasswordForm.reset();
          return { dataState: DataState.LOADED, registerSuccess: true, message: response.message };
        }),
        startWith({ dataState: DataState.LOADING, registerSuccess: false }),
        catchError((error: string) => {
          return of({ dataState: DataState.ERROR, registerSuccess: false, error })
        })
      );
  }

}
