import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistVideoComponent } from './playlist-video.component';

describe('PlaylistVideoComponent', () => {
  let component: PlaylistVideoComponent;
  let fixture: ComponentFixture<PlaylistVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaylistVideoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaylistVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
