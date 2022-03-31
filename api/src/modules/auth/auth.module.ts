import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { AuthController } from './auth.controller'
import { AuthResolver } from './auth.resolver'
import { AuthLoginService } from './service/auth-login.service'
import { AuthSignupService } from './service/auth-signup.service'
import { FirebaseAuthStrategy } from '@/modules/auth/firebase-auth.strategy'

@Module({
  imports: [PassportModule],
  providers: [
    AuthSignupService,
    FirebaseAuthStrategy,
    AuthLoginService,
    AuthResolver,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
