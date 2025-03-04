import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PainelRhComponent } from './painel-rh.component';

describe('PainelRhComponent', () => {
  let component: PainelRhComponent;
  let fixture: ComponentFixture<PainelRhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PainelRhComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PainelRhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
