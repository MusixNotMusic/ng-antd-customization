import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WukongTransferComponent } from './transfer.component';

describe('WukongTransferComponent', () => {
  let component: WukongTransferComponent;
  let fixture: ComponentFixture<WukongTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WukongTransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WukongTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
