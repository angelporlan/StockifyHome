import { Routes } from '@angular/router';

// views
import { AuthComponent } from './views/auth/auth.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';

// dashboard children
import { MainContentComponent } from './views/dashboard/main-content/main-content.component';
import { HousesComponent } from './views/dashboard/houses/houses.component';
import { ProductsComponent } from './views/dashboard/products/products.component';
import { ProductComponent } from './views/dashboard/product/product.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: AuthComponent },
  { path: 'dashboard', component: DashboardComponent, children: [
    { path: 'main', component: MainContentComponent },
    { path: 'houses', component: HousesComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'product/:id', component: ProductComponent },
  ]
  },
]
