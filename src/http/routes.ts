import { FastifyInstance } from 'fastify'
import { authenticateController } from './controllers/authenticate'
import { registerController } from './controllers/register'
import { ProfileController } from './controllers/profile'
import { verifyJWT } from './middlewares/verify-jwt'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', registerController)

  app.post('/sessions', authenticateController)

  app.get('/me', { onRequest: [verifyJWT] }, ProfileController)
}
