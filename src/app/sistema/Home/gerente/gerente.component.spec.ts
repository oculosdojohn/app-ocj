import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenteComponent } from './gerente.component';

describe('GerenteComponent', () => {
  let component: GerenteComponent;
  let fixture: ComponentFixture<GerenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GerenteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GerenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
