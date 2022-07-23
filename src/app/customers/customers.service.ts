import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Customer } from './models/customer.model';

const BACKEND_URL = 'https://fst-invoice.herokuapp.com/api';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  private customers: Customer[] = [];
  private $customerChanged: BehaviorSubject<Customer[]> = new BehaviorSubject<
    Customer[]
  >([]);

  constructor(
    private $http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  addCustomer(customer: Customer) {
    this.$http.post<any>(`${BACKEND_URL}/customers`, customer).subscribe({
      next: (res) => {
        this.router.navigate(['/customers'], { relativeTo: this.route });
      },
    });
  }

  getCustomerChanged() {
    return this.$customerChanged.asObservable();
  }

  getAllCustomers() {
    this.$http.get<Customer[]>(`${BACKEND_URL}/customers`).subscribe({
      next: (response) => {
        this.customers = [...response];
        this.$customerChanged.next(this.customers);
      },
      error: (err) => {
        console.log('Error While Getting All customers', err);
      },
    });
  }

  getCustomer(id: string) {
    return this.$http.get<Customer>(`${BACKEND_URL}/customers/${id}`);
  }

  updateCustomer(customer: Customer) {
    this.$http
      .put<any>(`${BACKEND_URL}/customers/${customer.id}`, customer)
      .subscribe({
        next: (res: any) => {
          this.router.navigate(['/customers'], { relativeTo: this.route });
        },
      });
  }

  deleteCustomer(id: string) {
    this.$http.delete<any>(`${BACKEND_URL}/customers/${id}`).subscribe({
      next: (res) => {
        this.customers = this.customers.filter((_cust) => _cust.id !== res.id);
        this.$customerChanged.next(this.customers);
      },
    });
  }
}
