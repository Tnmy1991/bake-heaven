import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWatermarkComponent } from './create-watermark.component';

describe('CreateWatermarkComponent', () => {
  let component: CreateWatermarkComponent;
  let fixture: ComponentFixture<CreateWatermarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateWatermarkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateWatermarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
