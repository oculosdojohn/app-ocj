import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroDeFeedbackComponent } from './cadastro-de-feedback.component';

describe('CadastroDeFeedbackComponent', () => {
  let component: CadastroDeFeedbackComponent;
  let fixture: ComponentFixture<CadastroDeFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroDeFeedbackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroDeFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
