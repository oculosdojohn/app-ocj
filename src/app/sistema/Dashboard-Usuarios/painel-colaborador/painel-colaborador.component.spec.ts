import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PainelColaboradorComponent } from './painel-colaborador.component';

describe('PainelColaboradorComponent', () => {
  let component: PainelColaboradorComponent;
  let fixture: ComponentFixture<PainelColaboradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PainelColaboradorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PainelColaboradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
