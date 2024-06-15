import { Component } from '@angular/core';
import { CountdownClockComponent } from '../countdown-clock/countdown-clock.component';
import { Subscription } from 'rxjs';
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
  bgImg = '';
  targetDate = new Date();

  subSink = new Subscription();

  constructor(private route: ActivatedRoute) {
    this.subSink.add(
      route.queryParams.subscribe(params => {
        this.title = params['title'];
        this.bgImg = params['imgSrc'];
        this.targetDate = new Date(params['targetDate']);
      })
    );
  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }
}
