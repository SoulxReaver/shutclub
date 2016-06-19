
import { Component } from '@angular/core';
import { Table } from './table';
import { TableService } from './table.service';
import { RouteSegment } from '@angular/router';

@Component({
    selector: 'my-table',
    templateUrl: 'app/table.component.html',
    providers: [ TableService ],
    styleUrls: [ 'app/table.component.css' ]
})

export class TableComponent {
    tables: Table[];

    constructor(public _tableService: TableService, private routeSegment: RouteSegment) {
        this.getAllTables()
    }

    getAllTables() {
        this._tableService.getAllTables(this.routeSegment.getParam('id'))
            .subscribe((items: any) => {
                this.tables = items['table']
            }, err => console.log(err));
    }
}