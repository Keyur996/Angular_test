import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CustomersService } from '../customers.service';
import { Customer } from '../models/customer.model';

@Component({
  selector: 'app-customer-add-edit',
  templateUrl: './customer-add-edit.component.html',
  styleUrls: ['./customer-add-edit.component.css'],
})
export class CustomerAddEditComponent implements OnInit {
  customer: Customer = {
    name: '',
    address: '',
    phone: null,
  };
  isEdit: boolean = false;

  constructor(
    private $customersService: CustomersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.get('id')) {
        this.isEdit = true;
        this.$customersService.getCustomer(paramMap.get('id') + '').subscribe({
          next: (customer: Customer) => {
            this.customer = customer;
          },
        });
      }
    });
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.customer.id) {
      const customer: Customer = {
        id: this.customer.id,
        ...form.value,
      };
      this.$customersService.updateCustomer(customer);
    } else {
      this.$customersService.addCustomer(form.value);
    }
  }
}
