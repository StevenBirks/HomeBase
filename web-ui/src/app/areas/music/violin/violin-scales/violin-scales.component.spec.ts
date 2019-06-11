import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViolinScalesComponent } from './violin-scales.component';

describe('ViolinScalesComponent', () => {
  let component: ViolinScalesComponent;
  let fixture: ComponentFixture<ViolinScalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViolinScalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViolinScalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
