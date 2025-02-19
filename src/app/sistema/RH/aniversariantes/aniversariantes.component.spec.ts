import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AniversariantesComponent } from './aniversariantes.component';

describe('AniversariantesComponent', () => {
  let component: AniversariantesComponent;
  let fixture: ComponentFixture<AniversariantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AniversariantesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AniversariantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
