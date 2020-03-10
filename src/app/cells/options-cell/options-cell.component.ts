import { Component, Input } from '@angular/core';
import { CellComponent, ColumnConfig } from 'material-dynamic-table';
import { Row } from 'projects/material-dynamic-table/src/lib/row';

@Component({
    selector: 'ld-options-cell',
    templateUrl: './options-cell.component.html'
})
export class OptionsCellComponent implements CellComponent {
    @Input()
    column: ColumnConfig;

    @Input()
    row: Row;

    constructor() {
    }

    showDetails() {
        let s = 'Row is: {';

        // for (const [key, value] of this.row.cells) {
        //     s += key + ' ' + value;
        // }
        s += this.row.toString();

        s += '}';
        alert(`${s}.`);
    }
}