import { Injectable } from '@nestjs/common'
import { SignupBody } from '../dto/signup-body.dto'

@Injectable()
export class AuthSignupService {
  async signup(param: { signup: SignupBody }) {
    return param
  }
}
