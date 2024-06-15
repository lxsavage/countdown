import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PCountdownViewComponent } from './p-countdown-view.component';

describe('PCountdownViewComponent', () => {
  let component: PCountdownViewComponent;
  let fixture: ComponentFixture<PCountdownViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PCountdownViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PCountdownViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
