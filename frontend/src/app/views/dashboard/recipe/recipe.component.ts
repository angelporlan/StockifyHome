import { Component } from '@angular/core';
import { TitleComponent } from '../../../components/dashboard/title/title.component';
import { NameFoodsBoxComponent } from '../../../components/dashboard/recipe/name-foods-box/name-foods-box.component';
import { TranslatePipe } from '@ngx-translate/core';
import { RecipeViewComponent } from '../../../components/dashboard/recipe/recipe-view/recipe-view.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe',
  imports: [TitleComponent, NameFoodsBoxComponent, TranslatePipe, RecipeViewComponent, CommonModule],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css'
})
export class RecipeComponent {
  recipeActive: boolean = false;
  recipe: any = null;

  getRecipe(recipe: any): void {
    this.recipeActive = true;
    this.recipe = recipe;
  }
}
