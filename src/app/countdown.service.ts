import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountdownService {

  constructor() { }

  getDHMSDisplay(deltaMs: number): number[] {
    const days = Math.floor(deltaMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor(deltaMs / (1000 * 60 * 60) % 24);
    const minutes = Math.floor((deltaMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((deltaMs % (1000 * 60)) / 1000);

    return [days, hours, minutes, seconds];
  }
}
