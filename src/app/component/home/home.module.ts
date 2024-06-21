import {NgModule} from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {NavBarModule} from "../navbar/navbar.module";
import {HomeComponent} from "./home/home.component";
import {HomeRoutingModule} from "./home-routing.module";
import {StatsModule} from "../stats/stats.module";

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    SharedModule, HomeRoutingModule, NavBarModule, StatsModule,
  ],
})
export class HomeModule {
}
