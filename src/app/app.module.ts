import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import {  MatButtonModule, } from '@angular/material/button';
import {  MatInputModule } from '@angular/material/input';
import {  MatDialogModule } from '@angular/material/dialog';
import {  MatDatepickerModule } from '@angular/material/datepicker';
import {  MatNativeDateModule } from '@angular/material/core';
import {  MatMenuModule } from '@angular/material/menu';
import {  MatIconModule } from '@angular/material/icon';
import {  MatPaginatorModule } from '@angular/material/paginator';
import {  MatCheckboxModule } from '@angular/material/checkbox';

import { OptionsCellComponent } from './cells/options-cell/options-cell.component';

import { TextFilterComponent } from './filters/text-filter/text-filter.component';
import { DateFilterComponent } from './filters/date-filter/date-filter.component';

import { CellTypeService, ColumnFilterService, DynamicTableModule } from 'material-dynamic-table';

import { AppComponent } from './app.component';
import { Global } from './global';

@NgModule({
  declarations: [
    AppComponent,
    OptionsCellComponent,
    TextFilterComponent,
    DateFilterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DynamicTableModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatIconModule,
    MatPaginatorModule,
    MatCheckboxModule
  ],
  entryComponents: [
    OptionsCellComponent,  
    TextFilterComponent,
    DateFilterComponent
  ],
  providers: [Global],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(private readonly cellTypeService: CellTypeService, private readonly columnFilterService: ColumnFilterService) {
    cellTypeService.registerCellType('options', OptionsCellComponent);

    columnFilterService.registerFilter('string', TextFilterComponent);
    columnFilterService.registerFilter('date', DateFilterComponent);
  }
}