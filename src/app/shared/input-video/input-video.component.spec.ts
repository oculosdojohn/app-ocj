import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputVideoComponent } from './input-video.component';

describe('InputVideoComponent', () => {
  let component: InputVideoComponent;
  let fixture: ComponentFixture<InputVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputVideoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
