import { NgModule } from '@angular/core';
import { NavBarModule } from '../navbar/navbar.module';
import { UserComponent } from './user/user.component';
import {SharedModule} from "../../shared/shared.module";
import {UserRoutingModule} from "./user-routing.module";

@NgModule({
  declarations: [ UserComponent ],
  imports: [ SharedModule, UserRoutingModule, NavBarModule ]
})
export class UserModule {}
