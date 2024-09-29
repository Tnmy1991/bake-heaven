import { Component, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { GoogleSheetsService } from '../../services/google-sheets.service';

interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatGridListModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  public tiles: Tile[] = [];
  constructor(private googleSheetService: GoogleSheetsService) {}

  ngOnInit(): void {
    this.googleSheetService.fetchData('Dashboard').subscribe((data) => {
      if (data.values.length) {
        let labelArray: string[] = [],
          valueArray: string[] = [];
        let statusLabel = '',
          statusValue = '';
        data.values.forEach((row: string[], index) => {
          switch (index) {
            case 13:
              statusValue = row.filter((str) => /\w+/.test(str)).join('');
              break;
            case 14:
              statusLabel = row.filter((str) => /\w+/.test(str)).join('');
              break;
            case 15:
              labelArray = row.filter((str) => /\w+/.test(str));
              break;
            case 16:
              valueArray = row.filter((str) => /\w+/.test(str));
              break;
          }
        });

        this.tiles = [
          { text: 'Revenue Balance', cols: 4, rows: 1, color: 'lightblue' },
          {
            text: `${statusValue} (${statusLabel})`,
            cols: 2,
            rows: 2,
            color: 'lightgreen',
          },
          {
            text: `${labelArray[0]}: ${valueArray[0]}`,
            cols: 2,
            rows: 1,
            color: 'lightpink',
          },
          {
            text: `${labelArray[1]}: ${valueArray[1]}`,
            cols: 2,
            rows: 1,
            color: '#DDBDF1',
          },
        ];
      }
    });
  }
}
