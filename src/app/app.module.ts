import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthModule} from "./component/auth/auth.module";
import {CustomerModule} from "./component/customer/customer.module";
import {HomeModule} from "./component/home/home.module";
import {InvoiceModule} from "./component/invoice/invoice.module";
import {CoreModule} from "./core/core.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AuthModule,
    CustomerModule,
    HomeModule,
    InvoiceModule,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
