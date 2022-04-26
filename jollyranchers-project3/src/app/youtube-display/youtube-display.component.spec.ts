import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YoutubeDisplayComponent } from './youtube-display.component';

describe('YoutubeDisplayComponent', () => {
  let component: YoutubeDisplayComponent;
  let fixture: ComponentFixture<YoutubeDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YoutubeDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YoutubeDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
