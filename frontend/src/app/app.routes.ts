import { Routes } from '@angular/router';

//views
import { AuthComponent } from './views/auth/auth.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: AuthComponent },
  { path: 'dashboard', component: DashboardComponent },
]
