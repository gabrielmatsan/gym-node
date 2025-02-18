import { client, db } from '.'
import { users } from './schema'
async function seed() {
  await db.delete(users)

  await db.insert(users).values([
    { name: 'Alice', email: 'alice@example.com', password: '123456' },
    { name: 'Bob', email: 'bob@example.com', password: '654321' },
  ])
}

seed().finally(() => {
  client.end()
})
