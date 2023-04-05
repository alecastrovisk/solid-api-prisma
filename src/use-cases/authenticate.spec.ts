import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { describe, it, expect } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialError } from './errors/invalid-credentials-error'

describe('Authenticate Use Case', () => {
  it('should be able to authenticate', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

    await usersRepository.create({
      name: 'User One',
      email: 'user@email.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'user@email.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

    await expect(async () =>
      sut.execute({
        email: 'user@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

    await usersRepository.create({
      name: 'User One',
      email: 'user@email.com',
      password_hash: await hash('123456', 6),
    })

    await expect(async () =>
      sut.execute({
        email: 'user@email.com',
        password: '123455',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialError)
  })
})
