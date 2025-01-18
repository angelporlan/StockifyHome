import { Routes } from '@angular/router';

//views
import { AuthComponent } from './views/auth/auth.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: AuthComponent },
]
