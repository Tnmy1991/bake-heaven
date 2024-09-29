import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { SalesOrderComponent } from './components/sales-order/sales-order.component';
import { PurchaseOrderComponent } from './components/purchase-order/purchase-order.component';
import { CreateWatermarkComponent } from './components/create-watermark/create-watermark.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'apply-watermark',
    component: CreateWatermarkComponent,
  },
  {
    path: 'purchase-order',
    component: PurchaseOrderComponent,
  },
  {
    path: 'sales-order',
    component: SalesOrderComponent,
  },
  {
    path: 'create-order',
    component: OrderFormComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
];
