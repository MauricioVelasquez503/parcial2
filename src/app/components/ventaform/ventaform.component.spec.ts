import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaformComponent } from './ventaform.component';

describe('VentaformComponent', () => {
  let component: VentaformComponent;
  let fixture: ComponentFixture<VentaformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VentaformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VentaformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
