import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageLabellingComponent } from './storage-labelling.component';

describe('StorageLabellingComponent', () => {
  let component: StorageLabellingComponent;
  let fixture: ComponentFixture<StorageLabellingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorageLabellingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorageLabellingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
