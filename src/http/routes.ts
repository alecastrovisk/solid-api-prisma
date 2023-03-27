import { FastifyInstance } from 'fastify'
import { authenticateController } from './controllers/authenticateController'
import { registerController } from './controllers/registerController'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', registerController)

  app.post('/sessions', authenticateController)
}
