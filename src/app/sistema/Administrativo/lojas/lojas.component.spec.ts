import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LojasComponent } from './lojas.component';

describe('LojasComponent', () => {
  let component: LojasComponent;
  let fixture: ComponentFixture<LojasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LojasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LojasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
