import { Component, effect, inject, DestroyRef } from '@angular/core';
import { SidebarComponent } from '../../components/dashboard/sidebar/sidebar.component';
import { HeaderComponent } from '../../components/dashboard/header/header.component';
import { Router, NavigationEnd, RouterModule } from '@angular/router'; 
import { filter, map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AuthStore } from '../../store/auth.store';
import { HouseService } from '../../services/house/house.service';
import { HouseStore } from '../../store/house.store';
import { ProductService } from '../../services/product/product.service';
import { ProductStore } from '../../store/product.store';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'], 
})
export class DashboardComponent {
  title: string = 'Dashboard';
  private destroy$ = new Subject<void>();
  authStore = inject(AuthStore);
  houseStore = inject(HouseStore);
  productStore = inject(ProductStore);
  destroyRef = inject(DestroyRef);

  private readonly routes = {
    main: '/dashboard/main',
    houses: '/dashboard/houses',
    products: '/dashboard/products',
    product: '/dashboard/product',
    user: '/dashboard/profile',
  };

  constructor(private router: Router, private houseService: HouseService, private productService: ProductService, private translate: TranslateService) {
    this.initializeTitleUpdater();
    this.observeSelectedHouse();
    this.destroyRef.onDestroy(() => this.destroy$.next());
  }

  ngOnInit(): void {
    this.getHouses();
    this.getProducts();
  }

  private initializeTitleUpdater(): void {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map((event: NavigationEnd) => this.determineTitle(event.urlAfterRedirects)),
        takeUntil(this.destroy$)
      )
      .subscribe(titleKey => {
        this.translate.get(titleKey).subscribe(translatedTitle => {
          this.title = translatedTitle;
        });
      });

    // - update title on language change
    this.translate.onLangChange.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.title = this.translate.instant(this.determineTitle(this.router.url));
    });
  }

  private observeSelectedHouse(): void {
    effect(() => {
      const house = this.houseStore.selectedHouse();
      if (house) {
        this.getProducts();
      }
    });
  }

  private determineTitle(url: string): string {
    if (url.includes(this.routes.main)) {
      return `${this.getTimeBasedGreeting()}, ${this.authStore.username()}`;
    } else if (url.includes(this.routes.houses)) {
      return 'DASHBOARD.TITLES.HOUSES';
    } else if (url.includes(this.routes.products)) {
      return 'DASHBOARD.TITLES.PRODUCTS';
    } else if (url.includes(this.routes.product)) {
      return 'DASHBOARD.TITLES.PRODUCT';
    }
    return 'DASHBOARD.TITLES.PROFILE';
  }

  private getTimeBasedGreeting(): string {
    const hour = new Date().getHours();
    if (hour >= 7 && hour < 12) {
      return this.translate.instant('DASHBOARD.TITLES.GOOD_MORNING');
    } else if (hour >= 12 && hour < 20) {
      return this.translate.instant('DASHBOARD.TITLES.GOOD_AFTERNOON');
    }
    return this.translate.instant('DASHBOARD.TITLES.GOOD_EVENING');
  }

  private getHouses(): void {
    this.houseService.getHouses().pipe(takeUntil(this.destroy$)).subscribe({
      next: (houses) => {
        this.houseStore.setHouses(houses);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  private getProducts(): void {
    this.productService.getProducts().pipe(takeUntil(this.destroy$)).subscribe({
      next: (products) => {
        this.productStore.setProducts(products);
      },
      error: (err) => {
        console.error(err.error.error);
        this.productStore.setProducts([]);
      }
    });
  }
}
