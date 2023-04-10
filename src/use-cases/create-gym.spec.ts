import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { CreateGymUseCase } from './create-gym'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })
  it('Should be able to create a Gym', async () => {
    const { gym } = await sut.execute({
      title: 'Js Gym',
      description: null,
      latitude: -9.6577019,
      longitude: -35.7027677,
      phone: null,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
