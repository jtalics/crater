import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Row } from 'projects/material-dynamic-table/src/lib/row'; // TODO
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { Global } from './global';

@Injectable({ providedIn: 'root' })
export class RowService {

  private rowsUrl = `${this.global.baseURL}/api/slots`;  // URL to REST

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private global: Global) { }

  /** GET rows from the server */
  getRows(): Observable<Row[]> {
    return this.http.get<Row[]>(this.rowsUrl)
      .pipe(
        tap(_ => this.log('fetched rows')),
        catchError(this.handleError<Row[]>('getRows', []))
      );
  }

  /** GET slot by id. Return `undefined` when id not found */
  getSlotNo404<Data>(id: number): Observable<Row> {
    const url = `${this.rowsUrl}/?id=${id}`;
    return this.http.get<Row[]>(url)
      .pipe(
        map(rows => rows[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} slot id=${id}`);
        }),
        catchError(this.handleError<Row>(`getRow id=${id}`))
      );
  }

  /** GET slot by id. Will 404 if id not found */
  getSlot(id: number): Observable<Row> {
    const url = `${this.rowsUrl}/${id}`;
    return this.http.get<Row>(url).pipe(
      tap(_ => this.log(`fetched slot id=${id}`)),
      catchError(this.handleError<Row>(`getRow id=${id}`))
    );
  }

  /* GET slots whose name contains search term */
  searchSlots(term: string): Observable<Row[]> {
    if (!term.trim()) {
      // if not search term, return empty slot array.
      return of([]);
    }
    return this.http.get<Row[]>(`${this.rowsUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found slots matching "${term}"`)),
      catchError(this.handleError<Row[]>('searchRows', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new Row to the server */
  addRow (row: Row): Observable<Row> {
    return this.http.post<Row>(this.rowsUrl, row, this.httpOptions).pipe(
      tap((newRow: Row) => this.log(`added row w/ id=${newRow.id}`)),
      catchError(this.handleError<Row>('addRow'))
    );
  }

  /** DELETE: delete the row from the server */
  deleteRow (row: Row | number): Observable<Row> {
    const id = typeof row === 'number' ? row : row.id;
    const url = `${this.rowsUrl}/${id}`;

    return this.http.delete<Row>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted slot id=${id}`)),
      catchError(this.handleError<Row>('deleteRow'))
    );
  }

  /** PUT: update the slot on the server */
  updateSlot (row: Row): Observable<any> {
    return this.http.put(this.rowsUrl, row, this.httpOptions).pipe(
      tap(_ => this.log(`updated slot id=${row.id}`)),
      catchError(this.handleError<any>('updateRow'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a SlotService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`SlotService: ${message}`);
  }

  /*
  slotsChanged(slots: Slot[]) {
    throw new Error("Method not implemented.");
  }
  */
}