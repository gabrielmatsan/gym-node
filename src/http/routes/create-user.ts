import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { createUser } from '../../functions/create-user'
import { EmailAlreadyExistsError } from '../../errors/errors'

export const createUserRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/users',
    {
      schema: {
        tags: ['users'],
        summary: 'Cria um novo usuário',
        description: 'Endpoint para cadastrar um novo usuário no sistema.',
        body: z.object({
          name: z
            .string()
            .min(1, 'O nome é obrigatório')
            .describe('Nome do usuário'),
          email: z
            .string()
            .email('Email inválido')
            .describe('E-mail do usuário'),
          password: z
            .string()
            .min(6, 'A senha deve ter pelo menos 6 caracteres')
            .describe('Senha do usuário'),
        }),
        response: {
          201: z.null().describe('Usuário criado com sucesso'),
          400: z.object({ error: z.string() }).describe('Email já cadastrado'),
          500: z.object({ error: z.string() }).describe('Erro interno'),
        },
      },
    },
    async (request, reply) => {
      try {
        console.log('📌 Criando usuário:', request.body.email)

        const { name, email, password } = request.body
        await createUser({ name, email, password })

        return reply.status(201).send() // ✅ Retorna 201 sem corpo
      } catch (error) {
        if (error instanceof EmailAlreadyExistsError) {
          console.error('🔥 Email já cadastrado:', error)
          return reply.status(400).send({ error: 'E-mail já cadastrado' })
        }

        console.error('🔥 Erro ao criar usuário:', error)
        return reply.status(500).send({ error: 'Erro ao criar usuário' })
      }
    }
  )
}
