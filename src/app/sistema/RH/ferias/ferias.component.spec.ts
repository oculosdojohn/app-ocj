import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeriasComponent } from './ferias.component';

describe('FeriasComponent', () => {
  let component: FeriasComponent;
  let fixture: ComponentFixture<FeriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeriasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
