import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './component/login/login.component';
import {ResetpasswordComponent} from './component/resetpassword/resetpassword.component';
import {VerifyComponent} from './component/verify/verify.component';
import {RegisterComponent} from './component/register/register.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {CustomerComponent} from './component/customer/customer.component';
import {ProfileComponent} from './component/profile/profile.component';
import {HomeComponent} from './component/home/home.component';
import {CustomersComponent} from './component/customers/customers.component';
import {NavbarComponent} from './component/navbar/navbar.component';
import {StatsComponent} from './component/stats/stats.component';
import {TokenInterceptor} from "./interceptor/token.interceptor";
import {ExtractArrayValue} from './pipe/extractvalue.pipe';
import {NewcustomerComponent} from './component/newcustomer/newcustomer.component';
import {NewinvoiceComponent} from './component/newinvoice/newinvoice.component';
import {InvoicesComponent} from './component/invoices/invoices.component';
import {InvoiceComponent} from './component/invoice/invoice.component';
import {CacheInterceptor} from "./interceptor/cache.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ResetpasswordComponent,
    VerifyComponent,
    RegisterComponent,
    CustomerComponent,
    ProfileComponent,
    HomeComponent,
    CustomersComponent,
    NavbarComponent,
    StatsComponent,
    ExtractArrayValue,
    NewcustomerComponent,
    NewinvoiceComponent,
    InvoicesComponent,
    InvoiceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}, {
    provide: HTTP_INTERCEPTORS,
    useClass: CacheInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
