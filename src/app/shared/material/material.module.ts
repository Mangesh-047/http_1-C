import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button'

import { DialogComponent } from './dialog/dialog.component'

const mat = [
  MatSnackBarModule,
  MatDialogModule,
  MatButtonModule
]
@NgModule({
  declarations: [
    DialogComponent
  ],
  imports: [
    CommonModule,
    ...mat
  ],
  exports: [
    ...mat
  ]
})
export class MaterialModule { }
