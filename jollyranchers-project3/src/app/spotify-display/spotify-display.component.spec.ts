import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotifyDisplayComponent } from './spotify-display.component';

describe('SpotifyDisplayComponent', () => {
  let component: SpotifyDisplayComponent;
  let fixture: ComponentFixture<SpotifyDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpotifyDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotifyDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
