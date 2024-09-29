import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { takeUntil, Subject } from 'rxjs';
import { GoogleSheetsService } from './../../services/google-sheets.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

interface Transaction {
  created_at: string;
  amount: number;
  description: number;
}

@Component({
  selector: 'app-sales-order',
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  templateUrl: './sales-order.component.html',
  styleUrl: './sales-order.component.scss',
})
export class SalesOrderComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public dataSource!: MatTableDataSource<Transaction>;
  public displayedColumns: string[] = ['created_at', 'amount', 'description'];

  private salesOrder: Transaction[] = [];
  private unSubscribe$: Subject<void> = new Subject();

  constructor(private googleSheetService: GoogleSheetsService) {}

  ngOnInit(): void {
    this.googleSheetService
      .fetchData('Transaction')
      .pipe(takeUntil(this.unSubscribe$))
      .subscribe((data) => {
        if (data.values.length) {
          const dataArray = data.values.filter((element, index) => {
            return index > 4 && element[1] === 'Sales';
          });
          this.salesOrder = dataArray.map((data) => ({
            created_at: data[0],
            amount: data[2],
            description: data[3],
          }));
          this.dataSource = new MatTableDataSource(this.salesOrder);
        }
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator ?? null;
    this.dataSource.sort = this.sort ?? null;
  }

  ngOnDestroy(): void {
    this.unSubscribe$.next();
    this.unSubscribe$.complete();
  }
}
