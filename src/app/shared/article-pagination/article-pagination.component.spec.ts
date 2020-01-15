import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlePaginationComponent } from './article-pagination.component';

describe('ArticlePaginationComponent', () => {
  let component: ArticlePaginationComponent;
  let fixture: ComponentFixture<ArticlePaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticlePaginationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlePaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
