import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-watermark',
  standalone: true,
  imports: [
    MatIconModule,
    MatInputModule, 
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule, 
  ],
  templateUrl: './create-watermark.component.html',
  styleUrl: './create-watermark.component.scss'
})
export class CreateWatermarkComponent implements OnInit {
  public watermarkForm!: FormGroup;
  public positionArray: {label: string; value: string;}[] = [
    {label: 'Upper Left', value: 'U-LEFT'},
    {label: 'Upper Right', value: 'U-RIGHT'},
    {label: 'Center', value: 'CENTER'},
    {label: 'Right Left', value: 'R-LEFT'},
    {label: 'Right Right', value: 'R-RIGHT'},
  ]

  ngOnInit(): void {
    this.watermarkForm = new FormGroup({
      targetImage: new FormControl('', [Validators.required]),
      watermarkPosition: new FormControl('CENTER', [Validators.required])
    })
  }
}
