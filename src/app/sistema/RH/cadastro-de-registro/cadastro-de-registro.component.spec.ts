import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroDeRegistroComponent } from './cadastro-de-registro.component';

describe('CadastroDeRegistroComponent', () => {
  let component: CadastroDeRegistroComponent;
  let fixture: ComponentFixture<CadastroDeRegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroDeRegistroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroDeRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
