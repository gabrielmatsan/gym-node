import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getUser } from '../../functions/get-user'
import { UserNotFoundError } from '../../errors/errors'

export const getUserRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/users/:id',
    {
      schema: {
        tags: ['users'],
        summary: 'Busca um usuário',
        description: 'Endpoint para buscar um usuário pelo ID.',
        params: z.object({
          id: z.string().describe('ID do usuário'),
        }),
        response: {
          200: z
            .object({
              id: z.number().int().positive().describe('ID do usuário'),
              name: z.string().describe('Nome do usuário'),
              email: z.string().email().describe('E-mail do usuário'),
              created_at: z.string().describe('Data de criação do usuário'),
            })
            .describe('Usuário encontrado'),
          404: z
            .object({ error: z.string() })
            .describe('Usuário não encontrado'),
          500: z.object({ error: z.string() }).describe('Erro interno'),
        },
      },
    },
    async (request, reply) => {
      try {
        const { id } = request.params

        const userId = Number(id)
        if (Number.isNaN(userId) || userId <= 0) {
          return reply.status(400).send({ error: 'ID inválido' })
        }

        const user = await getUser({ id: userId })

        return reply.status(200).send(user)
      } catch (error) {
        if (error instanceof UserNotFoundError) {
          console.error('🔥 Usuário não encontrado:', error)
          return reply.status(404).send({ error: 'Usuário não encontrado' })
        }
        console.error('🔥 Erro ao buscar usuário:', error)
        return reply.status(500).send({ error: 'Erro ao buscar usuário' })
      }
    }
  )
}
