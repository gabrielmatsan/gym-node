import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { updateUser } from '../../functions/update-user'
import { UserNotFoundError } from '../../errors/errors'

export const updateUserRoute: FastifyPluginAsyncZod = async app => {
  app.put(
    '/users/:id',
    {
      schema: {
        tags: ['users'],
        summary: 'Atualiza um usuário',
        description: 'Endpoint para atualizar os dados de um usuário pelo ID.',
        params: z.object({
          id: z.string().describe('ID do usuário'), // ⚠️ Fastify recebe `id` como string
        }),
        body: z
          .object({
            fullName: z
              .string()
              .min(1)
              .optional()
              .describe('Novo nome do usuário'),
            email: z
              .string()
              .email()
              .optional()
              .describe('Novo e-mail do usuário'),
            password: z.string().min(6).optional().describe('Nova senha'),
          })
          .refine(data => Object.keys(data).length > 0, {
            message: 'Pelo menos um campo deve ser enviado para atualização',
          }),
        response: {
          200: z.object({
            id: z.number().int().positive().describe('ID do usuário'),
            fullName: z.string().describe('Nome do usuário'),
            email: z.string().email().describe('E-mail do usuário'),
            created_at: z.string().describe('Data de criação do usuário'),
          }),
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
        const { fullName, email, password } = request.body

        // ✅ Converte `id` para número e valida
        const userId = Number(id)
        if (Number.isNaN(userId) || userId <= 0) {
          return reply.status(400).send({ error: 'ID inválido' })
        }

        // ✅ Aguarda a Promise resolver e atualiza usuário
        const updatedUser = await updateUser({
          id: userId,
          name: fullName, // ✅ Corrigido: Agora passamos `fullName` como `name`
          email,
          password,
        })

        return reply.status(200).send(updatedUser)
      } catch (error) {
        if (error instanceof UserNotFoundError) {
          return reply.status(404).send({ error: 'Usuário não encontrado' })
        }

        console.error('🔥 Erro ao atualizar usuário:', error)
        return reply.status(500).send({ error: 'Erro ao atualizar usuário' })
      }
    }
  )
}
