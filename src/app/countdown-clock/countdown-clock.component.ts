import { Subscription, interval } from 'rxjs';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
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
  @Output() completed = new EventEmitter<void>();

  daysLeft = 0;
  hoursLeft = 0;
  minutesLeft = 0;
  secondsLeft = 0;
  finished = false;

  interval$ = new Subscription();

  constructor(private countdownService: CountdownService) { }

  ngOnInit() {
    this.targetDate = new Date(this.targetDate);
    if (this.targetDate <= new Date()) {
      this.finished = true;
      this.completed.emit();
      return;
    }

    this.updateTime();

    this.interval$ = interval(1000).subscribe(() => {
      this.updateTime();

      if (this.finished) {
        this.completed.emit();
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

    const { days, hours, minutes, seconds} = this.countdownService.getDHMSDisplay(diff);
    this.daysLeft = days;
    this.hoursLeft = hours;
    this.minutesLeft = minutes;
    this.secondsLeft = seconds;

    this.finished = this.daysLeft <= 0 && this.hoursLeft <= 0 && this.minutesLeft <= 0 && this.secondsLeft <= 0;
  }
}
