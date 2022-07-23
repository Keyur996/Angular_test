import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerAddEditComponent } from './customers/customer-add-edit/customer-add-edit.component';
import { CustomerListComponent } from './customers/customer-list/customer-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/customers', pathMatch: 'full' },
  { path: 'customers', component: CustomerListComponent },
  { path: 'customers/new', component: CustomerAddEditComponent },
  { path: 'customers/update/:id', component: CustomerAddEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
