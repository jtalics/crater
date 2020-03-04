import {SelectionModel} from '@angular/cdk/collections';
import { Slot } from '../../../../src/app/slot';

export interface MdtSelectionModel<T> {

    selection: SelectionModel<T>;

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected(): boolean; 

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle(): any;

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: T): string;
}
