import {
  FormGroup,
  Validators,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ImageWatermark, TranslatePlacementType } from 'watermark-js-plus';
import { ImageUploaderComponent } from '../image-uploader/image-uploader.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-create-watermark',
  standalone: true,
  imports: [
    MatButtonModule,
    MatSelectModule,
    MatSliderModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    ImageUploaderComponent,
  ],
  templateUrl: './create-watermark.component.html',
  styleUrl: './create-watermark.component.scss',
})
export class CreateWatermarkComponent implements OnInit, OnDestroy {
  public file!: File;
  public imageUrl: string = '';
  public watermarkForm!: FormGroup;
  public imageDOM!: HTMLImageElement;
  public watermarkFlag: boolean = false;
  public position: TranslatePlacementType = 'middle';
  public positionArray: { label: string; value: TranslatePlacementType }[] = [
    { label: 'Top', value: 'top' },
    { label: 'Top Start', value: 'top-start' },
    { label: 'Top End', value: 'top-end' },
    { label: 'Bottom', value: 'bottom' },
    { label: 'Bottom Start', value: 'bottom-start' },
    { label: 'Bottom End', value: 'bottom-end' },
    { label: 'Left', value: 'left' },
    { label: 'Right', value: 'right' },
    { label: 'Middle', value: 'middle' },
  ];

  private watermark!: ImageWatermark;
  private unSubscribe$: Subject<void> = new Subject();

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.watermarkForm = new FormGroup({
      imageWidth: new FormControl(200, [Validators.required]),
      targetImage: new FormControl('', [Validators.required]),
      watermarkPosition: new FormControl(this.position, [Validators.required]),
    });

    this.watermarkForm.valueChanges
      .pipe(takeUntil(this.unSubscribe$))
      .subscribe((response) => {
        this.position = response.watermarkPosition;
        this.watermark?.destroy();
        this.watermarkFlag = false;
      });
  }

  formatLabel(value: number): string {
    return `${value}` as string;
  }

  previewImage(files: File[]): void {
    this.file = files[0];

    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    };
    reader.readAsDataURL(this.file);
  }

  createWatermark(): void {
    this.imageDOM = document.querySelector(
      '#watermark-preview'
    ) as HTMLImageElement;

    this.watermark = new ImageWatermark({
      contentType: 'image',
      image: '/apply-watermark/watermark.png',
      imageWidth: this.watermarkForm.value.imageWidth,
      width: this.imageDOM.width,
      height: this.imageDOM.height,
      dom: this.imageDOM,
      rotate: 0,
      translatePlacement: this.position,
    });

    this.watermark.create().then(() => {
      this.watermarkFlag = true;
    });
  }

  downloadImage(): void {
    const imgUrl = this.imageDOM.src;
    const imgName = `bake-heaven--${Date.now()}`;

    this.httpClient
      .get(imgUrl, { responseType: 'blob' as 'json' })
      .subscribe((res: any) => {
        const file = new Blob([res], { type: res.type });
        const blob = window.URL.createObjectURL(file);
        const link = document.createElement('a');
        link.href = blob;
        link.download = imgName;

        link.dispatchEvent(
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window,
          })
        );

        setTimeout(() => {
          window.URL.revokeObjectURL(blob);
          link.remove();
        }, 100);
      });
  }

  ngOnDestroy(): void {
    this.unSubscribe$.next();
    this.unSubscribe$.complete();
  }
}
