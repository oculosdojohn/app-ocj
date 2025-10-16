import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoMedidorComponent } from './grafico-medidor.component';

describe('GraficoMedidorComponent', () => {
  let component: GraficoMedidorComponent;
  let fixture: ComponentFixture<GraficoMedidorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficoMedidorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficoMedidorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
