import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { deleteUser } from '../../functions/delete-user'
import { UserNotFoundError } from '../../errors/errors'

export const deleteUserRoute: FastifyPluginAsyncZod = async app => {
  app.delete(
    '/users/:id',
    {
      schema: {
        tags: ['users'],
        summary: 'Deleta um usuário',
        description: 'Endpoint para deletar um usuário pelo ID.',
        params: z.object({
          id: z.string().describe('ID do usuário'),
        }),
        response: {
          204: z.undefined().describe('Usuário deletado'),
          400: z.object({ error: z.string() }).describe('Erro de validação'),
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

        // ✅ 1️⃣ Converte `id` para número e valida
        const userId = Number(id)
        if (Number.isNaN(userId) || userId <= 0) {
          return reply.status(400).send({ error: 'ID inválido' })
        }

        // ✅ 2️⃣ Aguarda a Promise resolver e deleta usuário
        await deleteUser({ id: userId })

        console.log(`✅ Usuário ${userId} deletado com sucesso`)
        return reply.status(204).send() // ⚠️ Deve ser `null` para evitar erro
      } catch (error) {
        if (error instanceof UserNotFoundError) {
          console.error(`❌ Usuário não encontrado: ID ${request.params.id}`)
          return reply.status(404).send({ error: error.message })
        }

        console.error('🔥 Erro ao deletar usuário:', error)
        return reply.status(500).send({ error: 'Erro ao deletar usuário' })
      }
    }
  )
}
