import {ChangeDetectionStrategy, Component} from '@angular/core';
import { DataState } from '../../enum/datastate.enum';
import {UserService} from "../../service/user.service";
import {catchError, map, Observable, of, startWith} from "rxjs";
import {RegisterState} from "../../interface/appstates";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent {
  registerState$: Observable<RegisterState> = of({ dataState: DataState.LOADED });
  readonly DataState = DataState;

  constructor(private userService: UserService) { }

  register(registerForm: NgForm): void {
    this.registerState$ = this.userService.save$(registerForm.value)
      .pipe(
        map(response => {
          console.log(response);
          registerForm.reset();
          return { dataState: DataState.LOADED, registerSuccess: true, message: response.message };
        }),
        startWith({ dataState: DataState.LOADING, registerSuccess: false }),
        catchError((error: string) => {
          return of({ dataState: DataState.ERROR, registerSuccess: false, error })
        })
      );
  }

  createAccountForm(): void {
    this.registerState$ = of({ dataState: DataState.LOADED, registerSuccess: false });
  }
}
