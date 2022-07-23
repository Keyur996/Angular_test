import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomersService } from '../customers.service';
import { Customer } from '../models/customer.model';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
})
export class CustomerListComponent implements OnInit {
  customers: Customer[] = [];
  constructor(
    private $customerService: CustomersService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.$customerService.getAllCustomers();
    this.$customerService.getCustomerChanged().subscribe({
      next: (fetchedCustomers: Customer[]) => {
        this.customers = fetchedCustomers;
      },
    });
  }

  onEdit(customer: Customer) {
    this.router.navigate([`/customers/update/${customer.id}`], {
      relativeTo: this.route,
    });
  }

  onDelete(customer: Customer) {
    this.$customerService.deleteCustomer(customer.id + '');
  }
}
