import { Component, Input, OnInit } from '@angular/core';
import { CellComponent } from './cell.component';
import { ColumnConfig } from '../../column-config.model';
import { Row } from '../../row';

@Component({
    selector: 'mdt-date-cell',
    template: '{{ row.cells[column.name] | date:dateFormat }}'
})
export class DateCellComponent implements CellComponent, OnInit {
    @Input() column: ColumnConfig;
    @Input() row: Row;

    dateFormat = 'short';

    constructor() {
    }

    ngOnInit() {
        // console.log('DateCellComponent.columnConfig=' + this.column);
        if (this.column.options) {
            if (this.column.options.dateFormat) {
                this.dateFormat = this.column.options.dateFormat;
            }
        }
    }
}