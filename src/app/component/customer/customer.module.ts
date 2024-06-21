import {NgModule} from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {CustomersComponent} from "./customers/customers.component";
import {CustomerRoutingModule} from "./customer-routing.module";
import {CustomerDetailComponent} from "./customer-detail/customer-detail.component";
import {NewcustomerComponent} from "./newcustomer/newcustomer.component";
import {NavBarModule} from "../navbar/navbar.module";

@NgModule({
  declarations: [
    CustomerDetailComponent,
    NewcustomerComponent,
    CustomersComponent
  ],
  imports: [
    SharedModule, CustomerRoutingModule, NavBarModule,
  ],
})
export class CustomerModule {
}
