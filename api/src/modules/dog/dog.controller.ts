import { Body, Controller, Get, Post } from '@nestjs/common'
import { CreateDogRequest } from './create-dog-request.dto'
import { Dog } from './dog.interface'
import { DogService } from './dog.service'

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
