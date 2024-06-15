import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-p-creation-wizard',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    FooterComponent
  ],
  templateUrl: './p-creation-wizard.component.html',
  styleUrl: './p-creation-wizard.component.scss'
})
export class PCreationWizardComponent {
  titleControl = new FormControl('');
  targetDateControl = new FormControl(new Date().toISOString());
  imgSrcControl = new FormControl('', [
  ]);

  constructor(private router: Router) { }

  createCountdown(event: Event) {
    event.preventDefault();

    this.router.navigate(['/countdown'], {
      queryParams: {
        title: this.titleControl.value,
        targetDate: this.convertLocaleStringToISOString(this.targetDateControl.value ?? ''),
        imgSrc: this.imgSrcControl.value
      }
    });
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
