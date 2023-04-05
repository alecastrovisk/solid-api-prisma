import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { CheckInUseCase } from './check-in'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'

let checkInsRepository: CheckInsRepository
let sut: CheckInUseCase

describe('Check Ins Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new CheckInUseCase(checkInsRepository)
  })

  it('Should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
