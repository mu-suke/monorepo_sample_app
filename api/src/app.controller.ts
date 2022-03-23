import { Controller, Get, Req, Res } from '@nestjs/common'
import { Request, Response } from 'express'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getHello(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): string {
    console.log('cookie: ', request.cookies)
    response.cookie('key', 'value', {
      signed: false,
      expires: new Date('2022-12-31'),
      httpOnly: true,
      path: '/',
      domain: 'localhost',
      secure: true,
      sameSite: 'lax',
    })
    return this.appService.getHello()
  }
}
