import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoPizzaComponent } from './grafico-pizza.component';

describe('GraficoPizzaComponent', () => {
  let component: GraficoPizzaComponent;
  let fixture: ComponentFixture<GraficoPizzaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficoPizzaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficoPizzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
