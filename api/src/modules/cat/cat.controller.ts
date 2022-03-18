import { Body, Controller, Get, Post } from '@nestjs/common'
import { CatService } from './cat.service'
import { Cat } from './cat.interface'
import { CreateCatRequest } from './create-cat-request.dto'

@Controller('cat')
export class CatController {
  constructor(private catService: CatService) {}

  @Post('createCat')
  async createNewCat(@Body() cat: CreateCatRequest) {
    console.log('cat: ', cat)
    this.catService.create(cat)
  }

  @Get('getAllCats')
  async findAll(): Promise<Cat[]> {
    return this.catService.findAll()
  }
}
