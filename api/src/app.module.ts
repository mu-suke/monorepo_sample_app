import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CatModule } from './cat/cat.module'
import { DogModule } from './dog/dog.module'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { join } from 'path'
import { TodoModule } from './todo/todo.module'
import { HealthCheckResolver } from './modules/health-check/health-check.resolver';
import { HealthCheckModule } from './modules/health-check/health-check.module';

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
