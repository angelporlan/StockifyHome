import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/dashboard/sidebar/sidebar.component';
import { HeaderComponent } from '../../components/dashboard/header/header.component';
import { Router, NavigationEnd, RouterModule } from '@angular/router'; 
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  imports: [SidebarComponent, HeaderComponent, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'], 
})
export class DashboardComponent {
  title: string = 'Dashboard';

  private readonly routes = {
    main: '/dashboard/main',
    houses: '/dashboard/houses',
    products: '/dashboard/products',
  };

  constructor(private router: Router) {
    this.initializeTitleUpdater();
  }

  private initializeTitleUpdater(): void {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map((event: NavigationEnd) => this.determineTitle(event.urlAfterRedirects))
      )
      .subscribe(title => (this.title = title));
  }


  private determineTitle(url: string): string {
    if (url.includes(this.routes.main)) {
      return this.getTimeBasedGreeting();
    } else if (url.includes(this.routes.houses)) {
      return 'Houses';
    } else if (url.includes(this.routes.products)) {
      return 'Products';
    }
    return 'Dashboard';
  }

  private getTimeBasedGreeting(): string {
    const hour = new Date().getHours();
    if (hour >= 7 && hour < 12) {
      return 'Good Morning';
    } else if (hour >= 12 && hour < 20) {
      return 'Good Afternoon';
    }
    return 'Good Night';
  }
}