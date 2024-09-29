import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface GoogleShets {
  range: string;
  majorDimension: string;
  values: [];
}

@Injectable({
  providedIn: 'root',
})
export class GoogleSheetsService {
  private DASHBOARD_SHEET = 'Summary';
  private TRANSACTION_SHEET = 'Transactions';
  private API_KEY = 'AIzaSyA1OLX9VAp5wDpZuiVWWXyYIRiaBENjnME';
  private SPREAD_SHEET_ID = '1LbRASJCrVC_FBf92NyeOL2PfMdazs1SWC6RZxK5GK-c';
  private API_URL = `https://sheets.googleapis.com/v4/spreadsheets`;

  constructor(private httpClient: HttpClient) {}

  fetchData(type: 'Dashboard' | 'Transaction'): Observable<GoogleShets> {
    const sheetName =
      type === 'Dashboard' ? this.DASHBOARD_SHEET : this.TRANSACTION_SHEET;
    return this.httpClient.get<GoogleShets>(
      `${this.API_URL}/${this.SPREAD_SHEET_ID}/values/${sheetName}?key=${this.API_KEY}`
    );
  }
}
