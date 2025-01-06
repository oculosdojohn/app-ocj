import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LojinhaComponent } from './lojinha.component';

describe('LojinhaComponent', () => {
  let component: LojinhaComponent;
  let fixture: ComponentFixture<LojinhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LojinhaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LojinhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
