import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {BehaviorSubject, catchError, map, Observable, of, startWith} from "rxjs";
import {State} from "../../../interface/state";
import {DataState} from '../../../enum/datastate.enum';
import {CustomHttpResponse} from "../../../interface/appstates";
import {Customer} from "../../../interface/customer";
import {User} from "../../../interface/user";
import {CustomerService} from "../../../service/customer.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-newinvoice',
  templateUrl: './newinvoice.component.html',
  styleUrl: './newinvoice.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewinvoiceComponent implements OnInit {
  newInvoiceState$: Observable<State<CustomHttpResponse<Customer[] & User>>>;
  readonly DataState = DataState;
  private dataSubject = new BehaviorSubject<CustomHttpResponse<Customer[] & User>>(null);
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();

  constructor(private customerService: CustomerService) {
  }

  ngOnInit(): void {
    this.newInvoiceState$ = this.customerService.newInvoice$()
      .pipe(
        map(response => {
          console.log(response);
          this.dataSubject.next(response);
          return {dataState: DataState.LOADED, appData: response};
        }),
        startWith({dataState: DataState.LOADING}),
        catchError((error: string) => {
          return of({dataState: DataState.ERROR, error})
        })
      )
  }

  newInvoice(newInvoiceForm: NgForm): void {
    this.dataSubject.next({...this.dataSubject.value, message: null});
    this.isLoadingSubject.next(true);
    this.newInvoiceState$ = this.customerService.createInvoice$(newInvoiceForm.value.customerId, newInvoiceForm.value)
      .pipe(
        map(response => {
          console.log(response);
          newInvoiceForm.reset({status: 'PENDING'});
          this.isLoadingSubject.next(false);
          this.dataSubject.next(response);
          return {dataState: DataState.LOADED, appData: this.dataSubject.value};
        }),
        startWith({dataState: DataState.LOADED, appData: this.dataSubject.value}),
        catchError((error: string) => {
          this.isLoadingSubject.next(false);
          return of({dataState: DataState.LOADED, error})
        })
      )
  }

}
