import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesFeedbackComponent } from './detalhes-feedback.component';

describe('DetalhesFeedbackComponent', () => {
  let component: DetalhesFeedbackComponent;
  let fixture: ComponentFixture<DetalhesFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalhesFeedbackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalhesFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
