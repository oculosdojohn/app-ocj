import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalQuizComponent } from './modal-quiz.component';

describe('ModalQuizComponent', () => {
  let component: ModalQuizComponent;
  let fixture: ComponentFixture<ModalQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalQuizComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
