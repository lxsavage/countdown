import { Component } from '@angular/core';
import { CountdownClockComponent } from '../countdown-clock/countdown-clock.component';
import { Subscription, map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-p-countdown-view',
  standalone: true,
  imports: [
    CountdownClockComponent
  ],
  templateUrl: './p-countdown-view.component.html',
  styleUrl: './p-countdown-view.component.scss'
})
export class PCountdownViewComponent {
  title = '';
  subtitle = '';
  bgImg = '';
  targetDate = new Date();
  preloadDate: Date | undefined;
  preloadPassed = false;
  finalCountdown = false;

  subSink = new Subscription();
  error = '';

  constructor(private route: ActivatedRoute, private titleService: Title) {
    this.subSink.add(
      route.params.pipe(map(p => p['targetDate'])).subscribe(targetDate => {
        const decodedDate = decodeURIComponent(targetDate);
        this.targetDate = new Date(decodedDate);

        this.error = '';
        if (this.targetDate.toString() === 'Invalid Date') {
          this.error = 'Invalid Date: ' + decodedDate;
        }
      })
    );
    this.subSink.add(
      route.queryParams.subscribe(params => {
        this.title = params['t'] ?? '';
        this.subtitle = params['s'] ?? '';
        this.bgImg = params['i'] ?? '';

        if (this.title) {
          let generatedTitle = 'Countdown | ' + decodeURIComponent(this.title);
          if (this.subtitle) {
            generatedTitle += ': ' + decodeURIComponent(this.subtitle);
          }
          titleService.setTitle(generatedTitle);
        } else {
          titleService.setTitle('Countdown | View');
        }

        if (!params['p']) return;

        const preload = new Date(decodeURIComponent(params['p']));
        if (preload.toString() === 'Invalid Date') return;

        if (preload <= new Date()) {
          this.preloadPassed = true;
        }

        this.preloadDate = preload;
      })
    );
  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }

  onFinalCountdownTriggered() {
    if (this.finalCountdown) return;
    this.finalCountdown = true;
  }
}
