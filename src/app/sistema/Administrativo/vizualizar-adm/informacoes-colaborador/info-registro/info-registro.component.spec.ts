import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoRegistroComponent } from './info-registro.component';

describe('InfoRegistroComponent', () => {
  let component: InfoRegistroComponent;
  let fixture: ComponentFixture<InfoRegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoRegistroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
