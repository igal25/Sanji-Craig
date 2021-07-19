import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphSampleComponent } from './graph-sample.component';

describe('GraphSampleComponent', () => {
  let component: GraphSampleComponent;
  let fixture: ComponentFixture<GraphSampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphSampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
