import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register.js'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository.js'
import { UserAlreadyExistsError } from './errors/user-already-exists-error.js'

describe('Register Use Case', () => {
  it('should be able to register', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)
    
    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'teste@teste.com',
      password: 'password123'
    })

    expect(user.id).toEqual(expect.any(String))
  })
  
  it('should hash user password upon registration', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)
    
    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'teste@teste.com',
      password: 'password123'
    })

    const isPasswordCorrectlyHashed = await compare('password123', user.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const email = 'johndoe@example.com' 
    
    await registerUseCase.execute({
      name: 'John Doe',
      email,
      password: 'password123'
    })

    await expect(() => 
      registerUseCase.execute({
        name: 'John Doe 02',
        email,
        password: 'password456'
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})