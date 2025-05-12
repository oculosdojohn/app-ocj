import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectorNavigationComponent } from './sector-navigation.component';

describe('SectorNavigationComponent', () => {
  let component: SectorNavigationComponent;
  let fixture: ComponentFixture<SectorNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectorNavigationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectorNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
