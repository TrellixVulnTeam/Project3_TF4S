import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SymptomsDisplayComponent } from './symptoms-display.component';

describe('SymptomsDisplayComponent', () => {
  let component: SymptomsDisplayComponent;
  let fixture: ComponentFixture<SymptomsDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SymptomsDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SymptomsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
