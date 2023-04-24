import { FastifyInstance } from 'fastify'
import { authenticateController } from './authenticate'
import { registerController } from './register'
import { ProfileController } from './profile'
import { verifyJWT } from '../../middlewares/verify-jwt'
import { refresh } from './refresh'

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', registerController)

  app.post('/sessions', authenticateController)

  app.get('/me', { onRequest: [verifyJWT] }, ProfileController)

  app.patch('/token/refresh', refresh)
}
