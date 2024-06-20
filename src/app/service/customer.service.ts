import {HttpClient, HttpEvent} from '@angular/common/http';
import {catchError, Observable, tap} from 'rxjs';
import {CustomerState, CustomHttpResponse, Page} from '../interface/appstates';
import {User} from '../interface/user';
import {environment} from "../../environments/environment.development";
import {Stats} from '../interface/stats';
import {Injectable} from "@angular/core";
import {Customer} from "../interface/customer";
import {Invoice} from "../interface/invoice";
import {handleError} from "../customfunctions/custumfunction";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) {
  }

  customers$ = (page: number = 0) => <Observable<CustomHttpResponse<Page<Customer> & User & Stats>>>
    this.http.get<CustomHttpResponse<Page<Customer> & User & Stats>>
    (`${environment.API_HOST}/customer/list?page=${page}`)
      .pipe(
        tap(console.log),
        catchError(handleError)
      );

  customer$ = (customerId: number) => <Observable<CustomHttpResponse<CustomerState>>>
    this.http.get<CustomHttpResponse<CustomerState>>
    (`${environment.API_HOST}/customer/get/${customerId}`)
      .pipe(
        tap(console.log),
        catchError(handleError)
      );

  update$ = (customer: Customer) => <Observable<CustomHttpResponse<CustomerState>>>
    this.http.put<CustomHttpResponse<CustomerState>>
    (`${environment.API_HOST}/customer/update`, customer)
      .pipe(
        tap(console.log),
        catchError(handleError)
      );

  searchCustomers$ = (name: string = '', page: number = 0) => <Observable<CustomHttpResponse<Page<Customer> & User>>>
    this.http.get<CustomHttpResponse<Page<Customer> & User>>
    (`${environment.API_HOST}/customer/search?name=${name}&page=${page}`)
      .pipe(
        tap(console.log),
        catchError(handleError)
      );

  newCustomers$ = (customer: Customer) => <Observable<CustomHttpResponse<Customer & User>>>
    this.http.post<CustomHttpResponse<Customer & User>>
    (`${environment.API_HOST}/customer/create`, customer)
      .pipe(
        tap(console.log),
        catchError(handleError)
      );

  newInvoice$ = () => <Observable<CustomHttpResponse<Customer[] & User>>>
    this.http.get<CustomHttpResponse<Customer[] & User>>
    (`${environment.API_HOST}/customer/invoice/new`)
      .pipe(
        tap(console.log),
        catchError(handleError)
      );

  createInvoice$ = (customerId: number, invoice: Invoice) => <Observable<CustomHttpResponse<Customer[] & User>>>
    this.http.post<CustomHttpResponse<Customer[] & User>>
    (`${environment.API_HOST}/customer/invoice/addtocustomer/${customerId}`, invoice)
      .pipe(
        tap(console.log),
        catchError(handleError)
      );

  invoices$ = (page: number = 0) => <Observable<CustomHttpResponse<Page<Invoice> & User>>>
    this.http.get<CustomHttpResponse<Page<Invoice> & User>>
    (`${environment.API_HOST}/customer/invoice/list?page=${page}`)
      .pipe(
        tap(console.log),
        catchError(handleError)
      );

  invoice$ = (invoiceId: number) => <Observable<CustomHttpResponse<Customer & Invoice & User>>>
    this.http.get<CustomHttpResponse<Customer & Invoice & User>>
    (`${environment.API_HOST}/customer/invoice/get/${invoiceId}`)
      .pipe(
        tap(console.log),
        catchError(handleError)
      );

  downloadReport$ = () => <Observable<HttpEvent<Blob>>>
    this.http.get(`${environment.API_HOST}/customer/download/report`,
      {reportProgress: true, observe: 'events', responseType: 'blob'})
      .pipe(
        tap(console.log),
        catchError(handleError)
      );
}
