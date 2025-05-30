import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesProgressoComponent } from './detalhes-progresso.component';

describe('DetalhesProgressoComponent', () => {
  let component: DetalhesProgressoComponent;
  let fixture: ComponentFixture<DetalhesProgressoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalhesProgressoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalhesProgressoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
