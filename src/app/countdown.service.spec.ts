import { TestBed } from '@angular/core/testing';

import { CountdownService } from './countdown.service';

describe('CountdownService', () => {
  let service: CountdownService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountdownService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should convert milliseconds to days, hours, minutes, seconds', () => {
    const tests = [
      { input: 86400000, expected: { days: 1, hours: 0, minutes: 0, seconds: 0 } },
      { input: 90061000, expected: { days: 1, hours: 1, minutes: 1, seconds: 1 } },
      { input: 3723000, expected: { days: 0, hours: 1, minutes: 2, seconds: 3 } },
      { input: 0, expected: { days: 0, hours: 0, minutes: 0, seconds: 0 } }
    ];

    tests.forEach(test => {
      const result = service.getDHMSDisplay(test.input);
      expect(result).toEqual(test.expected, `Failed at ${test.input}`);
    });
  });

  it('should handle negative values by returning zero for all fields', () => {
    const result = service.getDHMSDisplay(-10000);
    expect(result).toEqual({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  });
});
