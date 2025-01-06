import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumNoticiasComponent } from './forum-noticias.component';

describe('ForumNoticiasComponent', () => {
  let component: ForumNoticiasComponent;
  let fixture: ComponentFixture<ForumNoticiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForumNoticiasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForumNoticiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
