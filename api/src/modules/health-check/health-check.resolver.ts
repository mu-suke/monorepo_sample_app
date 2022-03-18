import { Query, Resolver } from '@nestjs/graphql'
import { HealthCheck } from './health-check.model'

@Resolver()
export class HealthCheckResolver {
  @Query(() => HealthCheck)
  healthCheck() {
    return new HealthCheck('healthy')
  }
}
