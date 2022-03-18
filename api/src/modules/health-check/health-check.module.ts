import { Module } from '@nestjs/common'
import { HealthCheckResolver } from './health-check.resolver'

@Module({
  providers: [HealthCheckResolver],
})
export class HealthCheckModule {}
