import { Subscription, interval } from 'rxjs';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CountdownService } from '../countdown.service';

@Component({
  selector: 'app-countdown-clock',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe
  ],
  templateUrl: './countdown-clock.component.html',
  styleUrl: './countdown-clock.component.scss'
})
export class CountdownClockComponent implements OnInit, OnDestroy {
  @Input() targetDate = new Date();
  @Input() bgImg = '';

  daysLeft = 0;
  hoursLeft = 0;
  minutesLeft = 0;
  secondsLeft = 0;
  finished = false;

  interval$ = new Subscription();

  constructor(private countdownService: CountdownService) { }

  ngOnInit() {
    this.targetDate = new Date(this.targetDate);
    this.updateTime();

    this.interval$ = interval(1000).subscribe(() => {
      this.updateTime();

      if (this.finished) {
        this.interval$.unsubscribe();
      }
    });
  }

  ngOnDestroy() {
    this.interval$.unsubscribe();
  }

  updateTime() {
    const now = new Date();
    const diff = this.targetDate.getTime() - now.getTime();

    [this.daysLeft, this.hoursLeft, this.minutesLeft, this.secondsLeft] = this.countdownService.getDHMSDisplay(diff);
    this.finished = this.daysLeft <= 0 && this.hoursLeft <= 0 && this.minutesLeft <= 0 && this.secondsLeft <= 0;
  }
}
