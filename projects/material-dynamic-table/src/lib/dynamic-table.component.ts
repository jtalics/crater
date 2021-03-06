import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { ColumnConfig } from './column-config.model';
import { ColumnFilter } from './column-filter.model';
import { ColumnFilterService } from './table-cell/cell-types/column-filter.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Row } from './row';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'mdt-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.css']
})
export class DynamicTableComponent implements OnInit {

  @Input() 
  columnConfigs: ColumnConfig[];
  @Input() 
  dataSource: MatTableDataSource<Row>;
  @Input() 
  pageSize = 20;
  @Input() 
  pageSizeOptions = [20, 50, 100];
  @Input() 
  showFilters = true;
  @Input() 
  stickyHeader = false;
  @Input() 
  paginator: MatPaginator;
  @Input() 
  selectionModel: SelectionModel<any> = new SelectionModel<any>(true, []);

  displayedColumns: string[];

  @ViewChild(MatSort, { static: true }) 
  sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) 
  private internalPaginator: MatPaginator;

  private appliedFilters: { [key: string]: any; } = {};

  constructor(
    private readonly columnFilterService: ColumnFilterService, 
    private readonly dialog: MatDialog
  ) { }

  ngOnInit() {
    if (this.dataSource == null) {
      throw Error('DynamicTable must be provided with data source.');
    }
    if (this.columnConfigs == null) {
      throw Error('DynamicTable must be provided with column definitions.');
    }

    if (this.paginator === undefined) {
      this.paginator = this.internalPaginator;
    }

    this.displayedColumns =     
      this.columnConfigs.map((column, index) => this.prepareColumnName(column.name, index));
    this.displayedColumns.unshift('select');

    const dataSource = this.dataSource as any;
    dataSource.sort = this.sort;
    dataSource.paginator = this.paginator;
  }

  isUsingInternalPaginator() {
    return this.paginator === this.internalPaginator;
  }

  canFilter(column: ColumnConfig) {
    const filter = this.columnFilterService.getFilter(column.type);

    return filter != null;
  }

  isFiltered(column: ColumnConfig) {
    return this.appliedFilters[column.name];
  }

  getFilterDescription(column: ColumnConfig) {
    const filter = this.appliedFilters[column.name];
    if (!filter || !filter.getDescription) {
      return null;
    }

    return filter.getDescription();
  }

  prepareColumnName(name: string, columnNumber: number): string {
    return name || 'col' + columnNumber;
  }

  filter(column: ColumnConfig) {
    const filter = this.columnFilterService.getFilter(column.type);

    if (filter) {
      const dialogConfig = new MatDialogConfig();
      const columnFilter = new ColumnFilter();
      columnFilter.column = column;

      if (this.appliedFilters[column.name]) {
        columnFilter.filter = Object.create(this.appliedFilters[column.name]);
      }

      dialogConfig.data = columnFilter;

      const dialogRef = this.dialog.open(filter, dialogConfig);

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.appliedFilters[column.name] = result;
        } else if (result === '') {
          delete this.appliedFilters[column.name];
        }

        if (result || result === '') {
          this.updateDataSource();
        }
      });
    }
  }

  clearFilters() {
    this.appliedFilters = {};
    this.updateDataSource();
  }

  protected updateDataSource() {
    const dataSource = this.dataSource as any;
    dataSource.filters = this.getFilters();
  }

  getFilters() {
    const filters = this.appliedFilters;
    const filterArray = Object.keys(filters).map((key) => filters[key]);
    return filterArray;
  }

  getFilter(columnName: string): any {
    const filterColumn = this.getColumnByName(columnName);

    if (!filterColumn) {
      throw Error(`Column with name '${columnName}' does not exist.`);
    }

    return this.appliedFilters[filterColumn.name];
  }

  setFilter(columnName: string, filter: any) {
    const filterColumn = this.getColumnByName(columnName);

    if (!filterColumn) {
      throw Error(`Cannot set filter for a column. Column with name '${columnName}' does not exist.`);
    }

    this.appliedFilters[filterColumn.name] = filter;
    this.updateDataSource();
  }

  private getColumnByName(columnName: string): ColumnConfig {
    return this.columnConfigs.find(c =>
      (c.name ? c.name.toLowerCase() : c.name) === (columnName ? columnName.toLowerCase() : columnName)
    );
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selectionModel.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selectionModel.clear() :
      this.dataSource.data.forEach(row => this.selectionModel.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Row): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selectionModel.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
}
