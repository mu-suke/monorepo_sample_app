import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { join } from 'path'
import { HealthCheckResolver } from './modules/health-check/health-check.resolver'
import { HealthCheckModule } from './modules/health-check/health-check.module'
import { CatModule } from './modules/cat/cat.module'
import { DogModule } from './modules/dog/dog.module'
import { TodoModule } from './modules/todo/todo.module'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    CatModule,
    DogModule,
    TodoModule,
    HealthCheckModule,
  ],
  controllers: [AppController],
  providers: [AppService, HealthCheckResolver],
})
export class AppModule {}
