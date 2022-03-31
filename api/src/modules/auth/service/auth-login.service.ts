import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class AuthLoginService {
  async login(userId: string) {
    new Logger('auth-login').log(userId)
    return {
      userId: userId,
    }
  }
}
