import { Injectable } from '@nestjs/common'

@Injectable()
export class AuthLoginService {
  async login(userId: string) {
    return {
      userId: userId,
    }
  }
}
