import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaleComODonoComponent } from './fale-com-o-dono.component';

describe('FaleComODonoComponent', () => {
  let component: FaleComODonoComponent;
  let fixture: ComponentFixture<FaleComODonoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaleComODonoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaleComODonoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
