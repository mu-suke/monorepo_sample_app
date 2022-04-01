import { Request, UseGuards } from '@nestjs/common'
import { Query, Resolver } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'
import { Auth, AuthTest } from './models/auth.model'
import { AuthLoginService } from './service/auth-login.service'

@Resolver()
export class AuthResolver {
  constructor(private readonly authLoginService: AuthLoginService) {}
  @Query(() => Auth)
  @UseGuards(AuthGuard('firebase'))
  async login(@Request() req: { userId: string }) {
    const userId = req.userId
    return this.authLoginService.login(userId)
  }

  @Query(() => AuthTest)
  test() {
    return new AuthTest('test')
  }
}
