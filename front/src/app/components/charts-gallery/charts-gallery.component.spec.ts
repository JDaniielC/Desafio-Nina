import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsGalleryComponent } from './charts-gallery.component';

describe('ChartsGalleryComponent', () => {
  let component: ChartsGalleryComponent;
  let fixture: ComponentFixture<ChartsGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartsGalleryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartsGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
