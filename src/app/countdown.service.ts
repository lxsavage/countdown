import { Injectable } from '@angular/core';

export interface Timestamp {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

@Injectable({
  providedIn: 'root'
})
export class CountdownService {
  getDHMSDisplay(deltaMs: number): Timestamp {
    if (deltaMs < 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(deltaMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor(deltaMs / (1000 * 60 * 60) % 24);
    const minutes = Math.floor((deltaMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((deltaMs % (1000 * 60)) / 1000);

    return <Timestamp>{ days, hours, minutes, seconds };
  }
}
