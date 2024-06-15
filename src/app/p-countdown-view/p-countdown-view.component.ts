import { Component } from '@angular/core';
import { CountdownClockComponent } from '../countdown-clock/countdown-clock.component';
import { Subscription, map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

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

  subSink = new Subscription();
  error = '';

  constructor(private route: ActivatedRoute) {
    this.subSink.add(
      route.params.pipe(map(p => p['targetDate'])).subscribe(targetDate => {
        const decodedDate = decodeURIComponent(targetDate);
        this.targetDate = new Date(decodedDate);
        if (this.targetDate.toString() === 'Invalid Date') {
          this.error = 'Invalid Date: ' + decodedDate;
        } else {
          this.error = '';
        }
      })
    );
    this.subSink.add(
      route.queryParams.subscribe(params => {
        this.title = params['t'];
        this.bgImg = params['i'];
        this.subtitle = params['s'];

        if (params['p']) {
          const preload = new Date(decodeURIComponent(params['p']));
          if (preload.toString() !== 'Invalid Date')
            this.preloadDate = preload;
        }
      })
    );
  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }
}
