import { Component } from '@angular/core';
import { MatCommonModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';

import { CreateWatermarkComponent } from './components/create-watermark/create-watermark.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatCommonModule, MatToolbarModule, CreateWatermarkComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Bake Heaven - Apply Watermark';
}
