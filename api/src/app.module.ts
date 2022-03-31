import { join } from 'path'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { AppController } from '@/app.controller'
import { AppService } from '@/app.service'
import { FirebaseModule } from '@/libs/firebase/firebase.module'
import { AuthModule } from '@/modules/auth/auth.module'
import { CatModule } from '@/modules/cat/cat.module'
import { DogModule } from '@/modules/dog/dog.module'
import { HealthCheckModule } from '@/modules/health-check/health-check.module'
import { TodoModule } from '@/modules/todo/todo.module'
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
    FirebaseModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
