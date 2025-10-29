import { TestBed } from '@angular/core/testing';

import { GetContacts } from './contacts';

describe('GetContacts', () => {
  let service: GetContacts;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetContacts);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
