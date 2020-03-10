import { Component, ComponentFactoryResolver, Input, ViewChild, OnInit, ViewContainerRef, ComponentFactory, Type, ComponentRef } from '@angular/core';
import { CellDirective } from './cell.directive';
import { CellTypeService } from './cell-types/cell-type-service';
import { CellComponent } from './cell-types/cell.component';
import { ColumnConfig } from '../column-config.model';
import { Row } from '../row';

@Component({
    selector: 'mdt-table-cell',
    template: '<ng-template mdtCellHost></ng-template>'
})
export class TableCellComponent implements OnInit {
    
    @ViewChild(CellDirective, { static: true }) 
    cellHost: CellDirective;
    @Input() 
    row: Row;
    @Input() 
    column: ColumnConfig;

    constructor(
        private readonly cellTypeService: CellTypeService,
        private readonly componentFactoryResolver: ComponentFactoryResolver) {         
    }

    ngOnInit() {
        this.initCell();
    }

    initCell() {
        const cellComponentType: Type<any> = this.cellTypeService.getCellType(this.column.type);
        const componentFactory: ComponentFactory<any> 
            = this.componentFactoryResolver.resolveComponentFactory(cellComponentType);
        const viewContainerRef: ViewContainerRef = this.cellHost.viewContainerRef;
        viewContainerRef.clear();
        const componentRef: ComponentRef<any> = viewContainerRef.createComponent(componentFactory);
        const cell = componentRef.instance as CellComponent;
        cell.row = this.row;
        cell.column = this.column;
    }
}
