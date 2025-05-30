import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmissoesDemissoesComponent } from './admissoes.component';

describe('AdmissoesDemissoesComponent', () => {
  let component: AdmissoesDemissoesComponent;
  let fixture: ComponentFixture<AdmissoesDemissoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdmissoesDemissoesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdmissoesDemissoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
