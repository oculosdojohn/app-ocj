import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesFeriasComponent } from './detalhes-ferias.component';

describe('DetalhesFeriasComponent', () => {
  let component: DetalhesFeriasComponent;
  let fixture: ComponentFixture<DetalhesFeriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalhesFeriasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalhesFeriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
