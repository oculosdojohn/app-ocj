import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloCursoComponent } from './modulo-curso.component';

describe('ModuloCursoComponent', () => {
  let component: ModuloCursoComponent;
  let fixture: ComponentFixture<ModuloCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuloCursoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuloCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
