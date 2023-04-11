import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyUseCase(gymsRepository)
  })

  it('Should be able to fetch nearby Gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: null,
      latitude: -9.6577019,
      longitude: -35.7027677,
      phone: null,
    })

    await gymsRepository.create({
      title: 'Far Gym',
      description: null,
      latitude: -9.4853277,
      longitude: -35.829371,
      phone: null,
    })

    const { gyms } = await sut.execute({
      userLatitude: -9.6577019,
      userLongitude: -35.7027677,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
