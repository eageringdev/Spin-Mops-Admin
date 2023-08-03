import { TestBed, inject } from '@angular/core/testing';

import { DataCollectorService } from './data-collector.service';

describe('DataCollectorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataCollectorService]
    });
  });

  it('should be created', inject([DataCollectorService], (service: DataCollectorService) => {
    expect(service).toBeTruthy();
  }));
});
