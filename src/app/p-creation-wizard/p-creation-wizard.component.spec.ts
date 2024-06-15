import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PCreationWizardComponent } from './p-creation-wizard.component';

describe('PCreationWizardComponent', () => {
  let component: PCreationWizardComponent;
  let fixture: ComponentFixture<PCreationWizardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PCreationWizardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PCreationWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
