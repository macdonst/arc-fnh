import arc from '@architect/functions'
import { deleteGame } from '@architect/shared/db/games.mjs'
import authenticate from '@architect/shared/auth.mjs'


export const handler = arc.http.async(authenticate, http)

async function http(req) {
  const { todelete = [], season } = req.body
  const games = Array.isArray(todelete) ? todelete : [todelete]

  await Promise.all(games.map((game) => deleteGame(game)))

  return {
    location: `/games?season=${season}`
  }
}
