import 'dotenv/config'
import { z } from 'zod'

// Definindo o esquema de validação das variáveis de ambiente
const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'), // Define o ambiente de execução
  PORT: z.coerce.number().default(3333), // Define a porta como número e com valor padrão
  DATABASE_URL: z.string().url(), // URL de conexão com o banco de dados
})

// Fazendo a validação das variáveis de ambiente
const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid environment variables', _env.error.format())
  throw new Error('Invalid environment variables')
}

// Exportando as variáveis de ambiente validadas
export const env = _env.data
