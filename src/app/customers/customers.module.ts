import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerAddEditComponent } from './customer-add-edit/customer-add-edit.component';
import { CustomersComponent } from './customers.component';
import { MaterialModule } from '../shared/material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CustomerAddEditComponent,
    CustomersComponent,
    CustomerListComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
  ],
})
export class CustomersModule {}
