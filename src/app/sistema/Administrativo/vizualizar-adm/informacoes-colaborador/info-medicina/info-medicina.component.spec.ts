import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoMedicinaComponent } from './info-medicina.component';

describe('InfoMedicinaComponent', () => {
  let component: InfoMedicinaComponent;
  let fixture: ComponentFixture<InfoMedicinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoMedicinaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoMedicinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
