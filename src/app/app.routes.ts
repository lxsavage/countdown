import { Routes } from '@angular/router';
import { PCreationWizardComponent } from './p-creation-wizard/p-creation-wizard.component';
import { PCountdownViewComponent } from './p-countdown-view/p-countdown-view.component';

export const routes: Routes = [
  {
    path: ':targetDate',
    component: PCountdownViewComponent
  },
  {
    path: '',
    title: 'Countdown | Creation Wizard',
    component: PCreationWizardComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
