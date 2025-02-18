import { eq } from 'drizzle-orm'
import { db } from '../db'
import { users } from '../db/schema'
import { EmailAlreadyExistsError, UserNotFoundError } from '../errors/errors'

interface GetUserRequest {
  id: number
}

export async function getUser({ id }: GetUserRequest) {
  const user = await db.select().from(users).where(eq(users.id, id))

  if (user.length === 0) {
    throw new UserNotFoundError()
  }

  return { ...user[0], created_at: user[0].created_at.toISOString() }
}
