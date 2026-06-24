/*************************************************************
 * innolab-front - material.module.ts
 *
 * created by : Ahmed Sghaier - a7mado008@gmail.com
 * created on : 21.10.18 - 13:05
 * version : 1.0
 * copyright : all right reserved 2018
 *************************************************************/

import { NgModule, ViewChild } from '@angular/core';
import { CommonModule} from '@angular/common';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatIconModule} from '@angular/material/icon';
import {  MatInputModule, MatToolbarModule, MatButtonModule,
  MatProgressSpinnerModule, MatTooltipModule, MatMenuModule, MatDatepickerModule, MatNativeDateModule,
  MatChipsModule, MatCardModule, MatGridListModule, MatDialogModule, MatProgressBarModule,
  MatExpansionModule, MatListModule, MatOptionModule, MatTableModule, MatTabsModule, MatStepperModule,
  MatSelectModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatSlideToggleModule, MatCheckboxModule} from '@angular/material';

@NgModule({
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatOptionModule,
    MatTableModule,
    MatSelectModule,
    MatPaginatorModule,
    MatChipsModule,
    MatFormFieldModule,
    MatGridListModule,
    MatCardModule,
    MatDialogModule,
    MatExpansionModule,
    MatTooltipModule,
    MatListModule,
    MatMenuModule,
    MatSortModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatSlideToggleModule,
    MatStepperModule,
    ScrollingModule
  ],
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatOptionModule,
    MatTableModule,
    MatSelectModule,
    MatPaginatorModule,
    MatChipsModule,
    MatFormFieldModule,
    MatGridListModule,
    MatCardModule,
    MatDialogModule,
    MatExpansionModule,
    MatTooltipModule,
    MatListModule,
    MatMenuModule,
    MatSortModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatSlideToggleModule,
    MatStepperModule,
    ScrollingModule
  ],
})

export class MaterialModule { };
