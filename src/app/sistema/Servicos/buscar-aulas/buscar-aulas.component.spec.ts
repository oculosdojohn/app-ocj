import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarAulasComponent } from './buscar-aulas.component';

describe('BuscarAulasComponent', () => {
  let component: BuscarAulasComponent;
  let fixture: ComponentFixture<BuscarAulasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarAulasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscarAulasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
