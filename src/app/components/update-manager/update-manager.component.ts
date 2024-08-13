import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { UpdateService } from '../../services/update.service';

@Component({
  selector: 'app-update-manager',
  standalone: true,
  imports: [],
  templateUrl: './update-manager.component.html',
  styleUrl: './update-manager.component.scss',
})
export class UpdateManagerComponent implements OnInit {
  public hasUpdate = false;

  constructor(public _updateService: UpdateService) {}

  ngOnInit(): void {
    this.hasUpdate = this._updateService.isNewVersionAvailable;
  }

  applyUpdate(): void {
    this._updateService.applyUpdate();
  }
}
