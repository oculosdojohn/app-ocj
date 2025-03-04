import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PainelGerenteComponent } from './painel-gerente.component';

describe('PainelGerenteComponent', () => {
  let component: PainelGerenteComponent;
  let fixture: ComponentFixture<PainelGerenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PainelGerenteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PainelGerenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
