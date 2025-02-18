import { eq } from 'drizzle-orm'
import { db } from '../db'
import { users } from '../db/schema'
import { UserNotFoundError } from '../errors/errors'

interface DeleteUserRequest {
  id: number
}

export async function deleteUser({ id }: DeleteUserRequest) {
  // 🔍 1️⃣ Verifica se o usuário existe antes de deletar
  const user = await db.select().from(users).where(eq(users.id, id))

  if (user.length === 0) {
    throw new UserNotFoundError()
  }

  // ✅ 2️⃣ Executa a deleção e verifica se ocorreu corretamente
  const result = await db.delete(users).where(eq(users.id, id)).execute()

  if (!result) {
    throw new Error('Erro ao deletar usuário')
  }
}
