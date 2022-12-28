import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagedialogComponent } from './packagedialog.component';

describe('PackagedialogComponent', () => {
  let component: PackagedialogComponent;
  let fixture: ComponentFixture<PackagedialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackagedialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackagedialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
