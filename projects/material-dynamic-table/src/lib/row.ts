import { CellComponent } from './table-cell/cell-types/cell.component';

export class Row {

    id: number;
    cells: {};

    constructor(cells: {}) {
        this.id = 666;
        // console.log('CELLSLENGTH=' + cells.length);
        // console.log('CELL[0]=' + cells[0]);
        // console.log('CELLSLENGTH[1]=' + cells.length);
        // console.log('CELLSLENGTH=' + cells.length);
        // console.log('CELLSLENGTH=' + cells.length);
        this.cells = cells;
    }

    toString(): string {
        let s = 'Row = [id=' + this.id + ', cells = {';
        // tslint:disable-next-line: forin
        for (const key in this.cells) {
            const value = this.cells[key];
            s += key + ': ' + value + ', ';
        }
        return s += '}]';
    }
}
