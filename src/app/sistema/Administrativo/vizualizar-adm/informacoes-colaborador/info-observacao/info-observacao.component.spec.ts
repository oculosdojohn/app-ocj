import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoObservacaoComponent } from './info-observacao.component';

describe('InfoObservacaoComponent', () => {
  let component: InfoObservacaoComponent;
  let fixture: ComponentFixture<InfoObservacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoObservacaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoObservacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
