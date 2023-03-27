import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { compare } from 'bcryptjs'
import { expect, describe, it } from 'vitest'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { RegisterUseCase } from './registerUseCase'

describe('Register Use Case', () => {
  it('Should be able to register', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUseCase.execute({
      name: 'user one',
      email: 'userone@email.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('Should hash user password upon registration', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUseCase.execute({
      name: 'user one',
      email: 'userone@email.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('Should not be able to register an email twice', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const email = 'user@email.com'

    await registerUseCase.execute({
      name: 'user one',
      email,
      password: '123456',
    })

    await expect(() =>
      registerUseCase.execute({
        name: 'user one',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
