import { NestFactory } from '@nestjs/core'
import cookieParser from 'cookie-parser'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.use(cookieParser())

  // ローカルで試せるように一時的にCORSを許可する
  app.enableCors()
  await app.listen(8000)
}
bootstrap()
