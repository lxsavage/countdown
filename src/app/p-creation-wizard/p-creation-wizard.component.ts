import { Component, model } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-p-creation-wizard',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
  ],
  templateUrl: './p-creation-wizard.component.html',
  styleUrl: './p-creation-wizard.component.scss'
})
export class PCreationWizardComponent {
  titleControl = new FormControl('');
  subtitleControl = new FormControl('');
  targetDateControl = new FormControl(new Date().toISOString());
  imgSrcControl = new FormControl('');

  readonly hasPreload = model(false);
  preloadTargetDateControl = new FormControl('');

  constructor(private router: Router) { }

  createCountdown(event: Event) {
    event.preventDefault();
    const queryParams: any = {};

    if (this.titleControl.value) {
      queryParams['t'] = this.titleControl.value;
    }

    if (this.imgSrcControl.value) {
      queryParams['i'] = this.imgSrcControl.value;
    }

    if (this.subtitleControl.value) {
      queryParams['s'] = this.subtitleControl.value;
    }

    if (this.hasPreload() && this.preloadTargetDateControl.value) {
      queryParams['p'] = encodeURIComponent(this.convertLocaleStringToISOString(this.preloadTargetDateControl.value));
    }

    this.router.navigate([
      encodeURIComponent(this.convertLocaleStringToISOString(this.targetDateControl.value ?? ''))
    ], { queryParams });
  }

  convertLocaleStringToISOString(dateString: string): string {
    // Workaround for browsers that add the Zero UTC offset ('Z') to the end of the string
    const correctedDateString = dateString[dateString.length - 1] === 'Z'
      ? dateString.slice(0, -1)
      : dateString;

    const offset = new Date().getTimezoneOffset();
    const offsetHours = String(Math.floor(offset / 60)).padStart(2, '0');
    const offsetMinutes = String(offset % 60).padStart(2, '0');
    const offsetSign = offset < 0 ? '+' : '-';
    return correctedDateString + offsetSign + offsetHours + ':' + offsetMinutes;
  }
}
