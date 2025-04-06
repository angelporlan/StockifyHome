import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ProductStore } from '../../../../store/product.store';
import { CommonModule } from '@angular/common';
import { Product } from '../../../../interfaces/product';
import { ActionButtonComponent } from '../../action-button/action-button.component';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { OpenaiService } from '../../../../services/openai/openai.service';
import { AuthStore } from '../../../../store/auth.store';
import { LoaderModalComponent } from '../../../general/modals/loader-modal/loader-modal.component';
import { MatSnackBarService } from '../../../../services/matSnackBar/mat-snack-bar.service';

@Component({
  selector: 'app-name-foods-box',
  imports: [CommonModule, ActionButtonComponent, TranslatePipe, LoaderModalComponent],
  templateUrl: './name-foods-box.component.html',
  styleUrl: './name-foods-box.component.css'
})
export class NameFoodsBoxComponent {
  productStore = inject(ProductStore);
  unselectedProducts: Product[] = [];
  selectedProducts: Product[] = [];
  authStore = inject(AuthStore);
  isLoading: boolean = false;
  @Output() recipe = new EventEmitter<any>();

  constructor(private openaiService: OpenaiService, private matSnackService: MatSnackBarService, private translate: TranslateService) {  }

  ngOnInit(): void {
    this.unselectedProducts = this.productStore.selectedProducts() || [];
  }

  toggleProduct(product: any, isSelected: boolean): void {
    if (isSelected) {
      this.selectedProducts = this.selectedProducts.filter(p => p !== product);
      this.unselectedProducts.push(product);
    } else {
      this.unselectedProducts = this.unselectedProducts.filter(p => p !== product);
      this.selectedProducts.push(product);
    }
  }
  onCreateRecipe(): void {
    if (this.selectedProducts.length === 0) {
      this.matSnackService.showError(this.translate.instant('SNACKBARS.ERROR.CREATE_RECIPE'));
      return;
    }
    this.isLoading = true;
    const ingredients = this.selectedProducts.map(product => product.name);
    const lg = this.authStore.languagePreference() || 'es';
    this.openaiService.getRecipe(ingredients, lg).then((response) => {
      this.isLoading = false;
      this.recipe.emit(response);
    }).catch((error) => {
      console.error(error);
    });
  }
}
