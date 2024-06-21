import {NgModule} from '@angular/core';
import {InvoicesComponent} from './invoices/invoices.component';
import {NewinvoiceComponent} from './newinvoice/newinvoice.component';
import {InvoiceDetailComponent} from './invoice-detail/invoice-detail.component';
import {InvoiceRoutingModule} from './invoice-routing.module';
import {NavBarModule} from '../navbar/navbar.module';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [InvoicesComponent, NewinvoiceComponent, InvoiceDetailComponent],
  imports: [SharedModule, InvoiceRoutingModule, NavBarModule]
})
export class InvoiceModule {
}
