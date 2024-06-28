import arc from '@architect/functions'
import { deletePlayer } from '@architect/shared/db/players.mjs'
import authenticate from '@architect/shared/auth.mjs'


export const handler = arc.http.async(authenticate, http)

async function http(req) {
  const id = req.pathParameters?.id

  await deletePlayer(id)

  return {
    location: '/players'
  }
}
