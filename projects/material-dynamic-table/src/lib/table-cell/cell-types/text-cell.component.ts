import { Component, Input, OnInit } from '@angular/core';
import { CellComponent } from './cell.component';
import { ColumnConfig } from '../../column-config.model';
import { Row } from '../../row';

@Component({
    selector: 'mdt-text-cell',
    template: '{{ row.cells[column.name] }}'
})
export class TextCellComponent implements CellComponent, OnInit {
    @Input() column: ColumnConfig;
    @Input() row: Row;

    constructor() {
    }

    ngOnInit() {
        console.log('TextCellComponent.columnConfig=' + this.column);
        console.log('TextCellComponent - column.name=' + this.column.name);
        console.log('TextCellComponent - row[column.name]=' + this.row.cells[this.column.name]);
        console.log('TextCellComponent - row.toString() = ' + this.row.toString());
    }
}