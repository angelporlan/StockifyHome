import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/dashboard/sidebar/sidebar.component';
import { HeaderComponent } from '../../components/dashboard/header/header.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [SidebarComponent, HeaderComponent, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
