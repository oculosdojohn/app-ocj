import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroQuizzComponent } from './cadastro-quizz.component';

describe('CadastroQuizzComponent', () => {
  let component: CadastroQuizzComponent;
  let fixture: ComponentFixture<CadastroQuizzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroQuizzComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroQuizzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
