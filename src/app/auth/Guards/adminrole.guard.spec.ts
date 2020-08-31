import { TestBed, async, inject } from '@angular/core/testing';

import { AdminroleGuard } from './adminrole.guard';

describe('AdminroleGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminroleGuard]
    });
  });

  it('should ...', inject([AdminroleGuard], (guard: AdminroleGuard) => {
    expect(guard).toBeTruthy();
  }));
});
