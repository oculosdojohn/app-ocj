import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroFeriasComponent } from './cadastro-ferias.component';

describe('CadastroFeriasComponent', () => {
  let component: CadastroFeriasComponent;
  let fixture: ComponentFixture<CadastroFeriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroFeriasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroFeriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
