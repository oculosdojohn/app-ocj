import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbaksComponent } from './feedbaks.component';

describe('FeedbaksComponent', () => {
  let component: FeedbaksComponent;
  let fixture: ComponentFixture<FeedbaksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedbaksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedbaksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
