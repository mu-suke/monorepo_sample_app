import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { SignupBody } from './dto/signup-body.dto'
import { AuthLoginService } from './service/auth-login.service'
import { AuthSignupService } from './service/auth-signup.service'
import { FirebaseAuthDecodedUser } from '@/modules/auth/firebase-auth.strategy'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authSignupService: AuthSignupService,
    private readonly authLoginService: AuthLoginService
  ) {}
  @UseGuards(AuthGuard('firebase-auth'))
  @Post('/signup')
  signup(@Body() body: SignupBody) {
    return this.authSignupService.signup({ signup: body })
  }

  @UseGuards(AuthGuard('firebase-auth'))
  @Post('/login')
  async login(@Request() req: { user: FirebaseAuthDecodedUser }) {
    const userId = req.user.uid

    return this.authLoginService.login(userId)
  }
}
