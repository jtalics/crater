import { TestBed } from '@angular/core/testing';

import { CellTypeService } from './cell-type-service';

describe('CellTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [        
      CellTypeService
    ]
  }));

  it('should be created', () => {
    const service: CellTypeService = TestBed.inject(CellTypeService);
    expect(service).toBeTruthy();
  });
});
