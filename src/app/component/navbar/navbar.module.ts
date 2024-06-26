import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar.component';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [NavbarComponent],
  imports: [SharedModule],
  exports: [NavbarComponent]
})
export class NavBarModule {}
