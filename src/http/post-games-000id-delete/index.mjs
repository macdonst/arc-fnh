import arc from '@architect/functions'
import { deleteGame } from '@architect/shared/db/games.mjs'
import authenticate from '@architect/shared/auth.mjs'


export const handler = arc.http.async(authenticate, http)

async function http(req) {
  const id = req.pathParameters?.id

  await deleteGame(id)

  return {
    location: '/games'
  }
}
