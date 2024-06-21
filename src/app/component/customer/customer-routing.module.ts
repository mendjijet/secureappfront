import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthenticationGuard} from "../../guard/authentication.guard";
import {CustomersComponent} from "./customers/customers.component";
import {NewcustomerComponent} from "./newcustomer/newcustomer.component";
import {CustomerDetailComponent} from "./customer-detail/customer-detail.component";

const customerRoutes: Routes = [
  {path: 'customers', component: CustomersComponent, canActivate: [AuthenticationGuard]},
  {path: 'customer/new', component: NewcustomerComponent, canActivate: [AuthenticationGuard]},
  {path: 'customer/:id', component: CustomerDetailComponent, canActivate: [AuthenticationGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(customerRoutes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule {
}
