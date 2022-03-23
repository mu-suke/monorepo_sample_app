import { NestFactory } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'
import * as admin from 'firebase-admin'
import { ServiceAccount } from 'firebase-admin'
import serviceAccount from '../bin/key/firebase-service-account.json'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.use(cookieParser())
  // Setup: firestore

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount),
  })

  await app.listen(8000)
}
bootstrap()
