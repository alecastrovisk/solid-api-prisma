import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymUseCase } from './search-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymUseCase(gymsRepository)
  })

  it('Should be able to search for Gyms', async () => {
    await gymsRepository.create({
      title: 'Js gym',
      description: null,
      latitude: -9.6577019,
      longitude: -35.7027677,
      phone: null,
    })

    await gymsRepository.create({
      title: 'Ts gym',
      description: null,
      latitude: -9.6577019,
      longitude: -35.7027677,
      phone: null,
    })

    const { gyms } = await sut.execute({
      query: 'Js',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Js gym' })])
  })

  it.skip('Should be able to fetch paginated gym search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Ts gym ${i}`,
        description: null,
        latitude: -9.6577019,
        longitude: -35.7027677,
        phone: null,
      })
    }

    const { gyms } = await sut.execute({
      query: 'Ts',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Ts gym 21' }),
      expect.objectContaining({ title: 'Ts gym 22' }),
    ])
  })
})
