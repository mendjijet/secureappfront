import {NgModule} from '@angular/core';
import {AuthRoutingModule} from "./auth-routin-module";
import {LoginComponent} from "./login/login.component";
import {ResetpasswordComponent} from "./resetpassword/resetpassword.component";
import {VerifyComponent} from "./verify/verify.component";
import {RegisterComponent} from "./register/register.component";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [
    LoginComponent,
    ResetpasswordComponent,
    VerifyComponent,
    RegisterComponent,
  ],
  imports: [
    SharedModule, AuthRoutingModule,
  ],
})
export class AuthModule {
}
