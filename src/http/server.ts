import fastify from 'fastify'
import { env } from '../env/'
import { createUserRoute } from './routes/create-user'

import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { getUserRoute } from './routes/get-user'
import { updateUserRoute } from './routes/update-user'
import { deleteUserRoute } from './routes/delete-user'

const app = fastify()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.setErrorHandler((error, request, reply) => {
  console.error('🔥 ERRO DETECTADO:', error)
  reply
    .status(500)
    .send({ error: 'Erro interno no servidor', details: error.message })
})

// 📌 Configuração correta do Swagger (corrigida)
app.register(fastifySwagger, {
  mode: 'dynamic', // ✅ Garante que o schema seja gerado corretamente
  openapi: {
    openapi: '3.1.0', // ✅ Versão OpenAPI correta
    info: {
      title: 'Fastify API',
      version: '1.0.0',
      description: 'API de exemplo com Fastify e Swagger',
    },
    servers: [{ url: 'http://localhost:3333' }], // ✅ Define a URL base
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

// 📌 Registre as rotas corretamente
app.register(createUserRoute)
app.register(getUserRoute)
app.register(updateUserRoute)
app.register(deleteUserRoute)

app.listen({ port: env.PORT }).then(() => {
  console.log(`🚀 HTTP server running on http://localhost:${env.PORT}`)
  console.log('📄 Swagger disponível em http://localhost:3333/docs')
})
