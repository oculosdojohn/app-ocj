import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressosComponent } from './progressos.component';

describe('ProgressosComponent', () => {
  let component: ProgressosComponent;
  let fixture: ComponentFixture<ProgressosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgressosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgressosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
