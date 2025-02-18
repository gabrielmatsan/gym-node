import { eq } from 'drizzle-orm'
import { db } from '../db'
import { users } from '../db/schema'
import { EmailAlreadyExistsError } from '../errors/errors'

interface CreateUserRequest {
  name: string
  email: string
  password: string
}

export async function createUser({ name, email, password }: CreateUserRequest) {
  const emailAlreadyUsed = await db
    .select()
    .from(users)
    .where(eq(users.email, email))

  if (emailAlreadyUsed.length > 0) {
    throw new EmailAlreadyExistsError()
  }

  await db.insert(users).values({
    name,
    email,
    password,
  })
}
