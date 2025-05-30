import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenovarContratoComponent } from './renovar-contrato.component';

describe('RenovarContratoComponent', () => {
  let component: RenovarContratoComponent;
  let fixture: ComponentFixture<RenovarContratoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenovarContratoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RenovarContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
