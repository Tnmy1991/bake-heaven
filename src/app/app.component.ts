import { Component, ViewChild, viewChild } from '@angular/core';
import { MatCommonModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';

import { CreateWatermarkComponent } from './components/create-watermark/create-watermark.component';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatCommonModule,
    MatToolbarModule,
    CreateWatermarkComponent,
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Bake Heaven';
  navigation: { label: string; route: string }[] = [
    { label: 'Dashboard', route: '/dashboard' },
    { label: 'Apply Watermark', route: '/apply-watermark' },
    { label: 'Create Order', route: '/create-order' },
    { label: 'Purchase Order', route: '/purchase-order' },
    { label: 'Sales Order', route: '/sales-order' },
  ];
  @ViewChild('drawer', { static: true }) public drawer!: MatDrawer;

  toggle(): void {
    this.drawer.toggle();
  }
}
