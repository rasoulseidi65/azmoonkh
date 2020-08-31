import { TestBed, async, inject } from '@angular/core/testing';

import { AdminMasterGuard } from './admin-master.guard';

describe('AdminMasterGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminMasterGuard]
    });
  });

  it('should ...', inject([AdminMasterGuard], (guard: AdminMasterGuard) => {
    expect(guard).toBeTruthy();
  }));
});
