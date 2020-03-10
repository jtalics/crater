import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { FilteredDataSource } from './data-source/filtered-data-source';
import { ColumnConfig, DynamicTableComponent } from 'material-dynamic-table';
import { RowService } from './row.service';
import { TextFilter } from './filters/text-filter/text-filter.model';
import { DateFilter } from './filters/date-filter/date-filter.model';
import { Row } from 'projects/material-dynamic-table/src/lib/row';
import { MessageService } from './message.service';
//import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'ld-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Crater';

  @ViewChild(DynamicTableComponent, { static: true })
  dynamicTable: DynamicTableComponent;

  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;

  columnConfigs: ColumnConfig[];
  rows: Row[];
  dataSource = new FilteredDataSource<Row>(/*this.rows*/);

  constructor(
    private rowService: RowService,
    // private emailService: EmailService,
    private messageService: MessageService,
    // public dialog: MatDialog
  ) {
    // if using REST: 
    this.updateDataSource(this.loadTestRows()); // DynamicTableModule wants this.
  }

  loadRows(): void {
      this.rowService.getRows().subscribe(
        rows => {
          this.updateDataSource(rows);
        }
      );
  }

  loadTestRows(): Row[] {
    this.columnConfigs = [
      {
        name: 'product',
        displayName: 'Product',
        type: 'string',
        sticky: 'start'
      },
      {
        name: 'description',
        displayName: 'Description',
        type: 'string',
        sort: false
      },
      {
        name: 'receivedOn',
        displayName: 'Received On',
        type: 'date'
      },
      {
        name: 'created',
        displayName: 'Created Date',
        type: 'date',
        options: {
          dateFormat: 'shortDate'
        }
      },
      {
        type: 'options',
        sticky: 'end'
      }
    ];

    const rows: Row[] = [];

    rows.push(new Row({
      'product': 'Mouse',
      'description': 'Fast and wireless',
      'receivedOn': new Date('2018-01-02T11:05:53.212Z'),
      'created': new Date('2015-04-22T18:12:21.111Z')
    }));


    rows.push(new Row(
      {
        'product': 'Keyboard',
        'description': 'Loud and Mechanical',
        'receivedOn': new Date('2018-06-09T12:08:23.511Z'),
        'created': new Date('2015-03-11T11:44:11.431Z')
      }
    ));

    rows.push(new Row(
    {
        'product': 'Laser',
        'description': 'It\'s bright',
        'receivedOn': new Date('2017-05-22T18:25:43.511Z'),
        'created': new Date('2015-04-21T17:15:23.111Z')
    }
    ));

    rows.push(new Row(
      {
        'product': 'Baby food',
        'description': 'It\'s good for you',
        'receivedOn': new Date('2017-08-26T18:25:43.511Z'),
        'created': new Date('2016-01-01T01:25:13.055Z')
      }
    ));

    rows.push(new Row(
      {
        'product': 'Coffee',
        'description': 'Prepared from roasted coffee beans',
        'receivedOn': new Date('2015-04-16T23:52:23.565Z'),
        'created': new Date('2016-12-21T21:05:03.253Z')
      }
    ));

    rows.push(new Row(
      {
        'product': 'Cheese',
        'description': 'A dairy product',
        'receivedOn': new Date('2017-11-06T21:22:53.542Z'),
        'created': new Date('2014-02-11T11:34:12.442Z')
      }
    ));

    rows.push(new Row(
      {
        'product': 'Floppy disk',
        'description': 'It belongs in a museum',
        'receivedOn': new Date('2015-10-12T11:12:42.621Z'),
        'created': new Date('2013-03-12T21:54:31.221Z')
      }
    ));

    rows.push(new Row(
      {
        'product':'Fan',
        'description': 'It will blow you away',
        'receivedOn': new Date('2014-05-04T01:22:35.412Z'),
        'created': new Date('2014-03-18T23:14:18.426Z')
      }
    ));

    return rows;
}

  updateDataSource(rows: Row[]): void {

    this.log('Updated with row count = ' + rows.length);
    this.rows = rows;
    // this.dataSource = new FilteredDataSource<Row>(this.rows)
    this.dataSource.data = this.rows;
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    this.dataSource._updateChangeSubscription();
  }

  clearFilters() {    
    this.dynamicTable.clearFilters();
  }

  setFilter() {
    const createdColumnName = 'created';
    const appliedFilter = this.dynamicTable.getFilter(createdColumnName);
    if (!appliedFilter) {
      const filter = new DateFilter(createdColumnName);
      filter.fromDate = new Date(2015, 1, 1);
      filter.toDate = new Date(2015, 12, 31);

      this.dynamicTable.setFilter(createdColumnName, filter);      
    } else {
      const columnName = 'description';
      const filter = new TextFilter(columnName);
      filter.value = 'Loud';

      this.dynamicTable.setFilter(columnName, filter);      
    }
  }

  private log(message: string): void {
    this.messageService.add('AppComponent: ' + message);
  }
}
