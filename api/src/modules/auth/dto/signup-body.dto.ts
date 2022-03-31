import { IsString } from 'class-validator'

export class SignupBody {
  @IsString()
  readonly displayName: string

  @IsString()
  readonly gender: string
}
