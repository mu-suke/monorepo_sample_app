import { Test, TestingModule } from '@nestjs/testing';
import { HealthCheckResolver } from './health-check.resolver';

describe('HealthCheckResolver', () => {
  let resolver: HealthCheckResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HealthCheckResolver],
    }).compile();

    resolver = module.get<HealthCheckResolver>(HealthCheckResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
