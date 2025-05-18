import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoFeedbackComponent } from './info-feedback.component';

describe('InfoFeedbackComponent', () => {
  let component: InfoFeedbackComponent;
  let fixture: ComponentFixture<InfoFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoFeedbackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
