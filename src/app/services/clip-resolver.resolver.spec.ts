import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { clipResolverResolver } from './clip-resolver.resolver';

describe('clipResolverResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => clipResolverResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
