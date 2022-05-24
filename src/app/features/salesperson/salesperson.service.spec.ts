import { TestBed } from '@angular/core/testing';

import { SalespersonService } from './salesperson.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('SalespersonService', () => {
  let service: SalespersonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
    });
    service = TestBed.inject(SalespersonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
