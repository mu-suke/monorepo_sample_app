import { Injectable } from '@nestjs/common'
import { Dog } from './dog.interface'

@Injectable()
export class DogService {
  private readonly dogs: Dog[] = []

  create(dog: Dog) {
    this.dogs.push(dog)
  }

  findAll(): Dog[] {
    return this.dogs
  }
}
