import { Body, Controller, Get, Post } from '@nestjs/common'
import { CreateDogRequest } from './create-dog-request.dto'
import { DogService } from './dog.service'
import { Dog } from './dog.interface'

@Controller('dog')
export class DogController {
  constructor(private dogService: DogService) {}

  @Post('createDog')
  async createNewDog(@Body() dog: CreateDogRequest) {
    console.log('dog: ', dog)
    this.dogService.create(dog)
  }

  @Get('getAllDogs')
  async findAll(): Promise<Dog[]> {
    return this.dogService.findAll()
  }
}
