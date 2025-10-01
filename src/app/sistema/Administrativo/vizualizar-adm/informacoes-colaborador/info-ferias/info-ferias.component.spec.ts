import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoFeriasComponent } from './info-ferias.component';

describe('InfoFeriasComponent', () => {
  let component: InfoFeriasComponent;
  let fixture: ComponentFixture<InfoFeriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoFeriasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoFeriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
