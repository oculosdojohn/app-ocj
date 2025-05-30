import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemissoesComponent } from './demissoes.component';

describe('DemissoesComponent', () => {
  let component: DemissoesComponent;
  let fixture: ComponentFixture<DemissoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemissoesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemissoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
