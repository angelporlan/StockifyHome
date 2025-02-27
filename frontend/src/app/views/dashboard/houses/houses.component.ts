import { Component, inject } from '@angular/core';
import { InputSearchComponent } from '../../../components/dashboard/input-search/input-search.component';
import { HouseBoxesComponent } from '../../../components/dashboard/houses/house-boxes/house-boxes.component';
import { ActionButtonComponent } from '../../../components/dashboard/action-button/action-button.component';
import { InputModalComponent } from '../../../components/general/modals/input-modal/input-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { HouseService } from '../../../services/house/house.service';
import { HouseStore } from '../../../store/house.store';
import { MatSnackBarService } from '../../../services/matSnackBar/mat-snack-bar.service';
import { catchError, tap, throwError } from 'rxjs';
import { House } from '../../../interfaces/house';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-houses',
  imports: [InputSearchComponent, HouseBoxesComponent, ActionButtonComponent, TranslatePipe],
  templateUrl: './houses.component.html',
  styleUrl: './houses.component.css'
})
export class HousesComponent {
  inputText: string = '';
  houseStore = inject(HouseStore);
  // newHouse: House = {
  //   id: 0,
  //   name: '',
  //   createdAt: '',
  //   updatedAt: '',
  //   UserId: 0
  // };

  onSearchChange(event: any) {
    this.inputText = event
  }

  constructor(private dialog: MatDialog, private houseService: HouseService, private matSnackBarService: MatSnackBarService, private translate: TranslateService) { }

  openDialog() {
    this.dialog.open(InputModalComponent, {
      width: '400px',
      data: {
      title: this.translate.instant('DASHBOARD.HOUSES.ADD_HOUSE_DIALOG.TITLE'),
      labelInput: this.translate.instant('DASHBOARD.HOUSES.ADD_HOUSE_DIALOG.LABEL_INPUT'),
      placeholderInput: this.translate.instant('DASHBOARD.HOUSES.ADD_HOUSE_DIALOG.PLACEHOLDER_INPUT'),
      action: (name: string) => this.newHouse(name)
      }
    });
  }

  newHouse(newName: string) {
    return this.houseService.createHouse({ name: newName }).pipe(
      tap((createdHouse: House) => {
        this.houseStore.addHouse(createdHouse);
        this.matSnackBarService.showSuccess(this.translate.instant('SNACKBARS.SUCCESS.HOUSE_ADDED'));
      }),
      catchError((error) => {
        console.log('Error creating house: ', error);
        this.matSnackBarService.showError(this.translate.instant('SNACKBARS.ERROR.HOUSE_ADD'));
        return throwError(() => new Error('Error creating house'));
      })
    );
  }
}
