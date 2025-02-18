import { eq } from 'drizzle-orm'
import { db } from '../db'
import { users } from '../db/schema'
import { UserNotFoundError } from '../errors/errors'

interface UpdateUserRequest {
  id: number
  name?: string 
  email?: string
  password?: string
}

export async function updateUser({
  id,
  name,
  email,
  password,
}: UpdateUserRequest) {

  const existingUser = await db.select().from(users).where(eq(users.id, id))

  if (existingUser.length === 0) {
    throw new UserNotFoundError()
  }

  // ✅ 2️⃣ Garante que só espalhamos objetos válidos
  const updateData: Partial<{ name: string; email: string; password: string }> =
    {}

  if (name != null) updateData.name = name
  if (email != null) updateData.email = email
  if (password != null) updateData.password = password

  if (Object.keys(updateData).length === 0) {
    throw new Error('Pelo menos um campo deve ser enviado para atualização')
  }

  // ✅ 3️⃣ Atualiza apenas os campos enviados
  await db.update(users).set(updateData).where(eq(users.id, id))

  // 🔄 4️⃣ Retorna os novos dados do usuário atualizado
  const updatedUser = await db.select().from(users).where(eq(users.id, id))

  return {
    id: updatedUser[0].id,
    fullName: updatedUser[0].name, // ✅ Convertendo `name` para `fullName`
    email: updatedUser[0].email,
    created_at: updatedUser[0].created_at.toISOString(), // ✅ Convertendo `Date` para `string`
  }
}
