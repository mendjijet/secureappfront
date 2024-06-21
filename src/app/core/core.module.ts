import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {TokenInterceptor} from "../interceptor/token.interceptor";
import {CacheInterceptor} from "../interceptor/cache.interceptor";
import {UserService} from "../service/user.service";
import {HttpCacheService} from "../service/http.cache.service";
import {CustomerService} from "../service/customer.service";


@NgModule({
  imports: [HttpClientModule],
  providers: [UserService, HttpCacheService, CustomerService,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true}]
})
export class CoreModule {
}
