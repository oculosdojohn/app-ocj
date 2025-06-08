import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesProdutosComponent } from './detalhes-produtos.component';

describe('DetalhesProdutosComponent', () => {
  let component: DetalhesProdutosComponent;
  let fixture: ComponentFixture<DetalhesProdutosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalhesProdutosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalhesProdutosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
