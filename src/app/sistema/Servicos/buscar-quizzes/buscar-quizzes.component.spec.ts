import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarQuizzesComponent } from './buscar-quizzes.component';

describe('BuscarQuizzesComponent', () => {
  let component: BuscarQuizzesComponent;
  let fixture: ComponentFixture<BuscarQuizzesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarQuizzesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscarQuizzesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
