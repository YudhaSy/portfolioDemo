import { TestBed } from '@angular/core/testing';

import { IpService } from './ip.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('IpService', () => {
  let service: IpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(IpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
