import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataPullerComponent } from './data-puller.component';

describe('DataPullerComponent', () => {
  let component: DataPullerComponent;
  let fixture: ComponentFixture<DataPullerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataPullerComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataPullerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
