import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { DynamicTableComponent } from './dynamic-table.component';
import { TableCellComponent } from './table-cell/table-cell.component';

import { CellTypeService } from './table-cell/cell-types/cell-type-service';
import { CellDirective } from './table-cell/cell.directive';
import { ColumnFilterService } from './table-cell/cell-types/column-filter.service';

export { CellTypeService, CellDirective, ColumnFilterService };
export { CellComponent } from './table-cell/cell-types/cell.component';
export { ColumnFilter } from './column-filter.model';
export { ColumnConfig } from './column-config.model';
export { FilterDescription } from './filter-description';

import { TextCellComponent } from './table-cell/cell-types/text-cell.component';
import { DateCellComponent } from './table-cell/cell-types/date-cell.component';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatDialogModule,
    MatTooltipModule,
    MatCheckboxModule
  ],
  declarations: [
    DynamicTableComponent,
    TableCellComponent,
    CellDirective,
    TextCellComponent,
    DateCellComponent
  ],
  exports: [DynamicTableComponent],
  entryComponents: [
    TextCellComponent,
    DateCellComponent
  ],
  providers: [
    CellTypeService,
    ColumnFilterService
  ]
})
export class DynamicTableModule {
  constructor(private readonly cellTypeService: CellTypeService) {
    cellTypeService.registerCellType('string', TextCellComponent);
    cellTypeService.registerCellType('date', DateCellComponent);
  }
}
