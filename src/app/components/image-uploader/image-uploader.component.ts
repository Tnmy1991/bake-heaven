import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  ReactiveFormsModule,
  ControlContainer,
  FormGroup,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-image-uploader',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './image-uploader.component.html',
  styleUrl: './image-uploader.component.scss',
})
export class ImageUploaderComponent implements OnInit {
  @Input() imageField = 'targetImage';
  @Input() buttonLabel = 'Upload a file';
  @Input() hintText = 'Accepted formats jpg, jpeg and png.';
  @Input() acceptedTypes = 'image/jpg, image/jpeg, image/png';

  @Output() targetedImage: EventEmitter<File[]> = new EventEmitter();

  @ViewChild('fileUpload') fileUpload!: ElementRef;

  public formGroup!: FormGroup;

  @Input()
  files: File[] = [];

  constructor(
    private sanitizer: DomSanitizer,
    private controlContainer: ControlContainer
  ) {}

  ngOnInit(): void {
    this.formGroup = this.controlContainer.control as FormGroup;
  }

  onClick(): void {
    if (this.fileUpload) this.fileUpload.nativeElement.click();
  }

  onFileSelected(event: any): void {
    let files = event.dataTransfer
      ? event.dataTransfer.files
      : event.target.files;

    this.files = [];
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      if (this.validate(file)) {
        file.objectURL = this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(files[i])
        );
        this.files.push(files[i]);
      }
    }

    this.targetedImage.emit(this.files);
  }

  validate(file: File) {
    for (const f of this.files) {
      if (
        f.name === file.name &&
        f.lastModified === file.lastModified &&
        f.size === f.size &&
        f.type === f.type
      ) {
        return false;
      }
    }
    return true;
  }
}
