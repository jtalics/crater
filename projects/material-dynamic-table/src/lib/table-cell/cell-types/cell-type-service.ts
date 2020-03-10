import { Type } from '@angular/core';
import { TextCellComponent } from './text-cell.component';
/**
 * Given the name of the type, return the Type
 */
export class CellTypeService {
    private registeredCellTypes: {
        [key: string]: Type<any>;
    } = {};
    registerCellType(type: string, component: Type<any>) {
        this.registeredCellTypes[type] = component;
    }
    getCellType(type: string): Type<any> {
        const component = this.registeredCellTypes[type];
        if (component == null) {
            return TextCellComponent;
        }
        return component;
    }
}
