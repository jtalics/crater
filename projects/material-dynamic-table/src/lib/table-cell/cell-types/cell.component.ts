import { ColumnConfig } from '../../column-config.model';
import { Row } from '../../row';

export interface CellComponent {
    column: ColumnConfig;
    row: Row;
}