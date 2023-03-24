import { compare } from 'bcryptjs'
import { expect, test, describe, it } from 'vitest'
import { RegisterUseCase } from './registerUseCase'

describe('Register Use Case', () => {
  it('Should hash user password upon registration', async () => {
    const registerUseCase = new RegisterUseCase({
      async findByEmail(email) {
        return null
      },

      async create(data) {
        return {
          id: 'user-1',
          name: data.name,
          email: data.email,
          created_at: new Date(),
          password_hash: data.password_hash,
        }
      },
    })

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
})
