import arc from '@architect/functions'
import { deletePlayer } from '@architect/shared/db/players.mjs'
import authenticate from '@architect/shared/auth.mjs'


export const handler = arc.http.async(authenticate, http)

async function http(req) {
  const { todelete = [] } = req.body
  const players = Array.isArray(todelete) ? todelete : [todelete]

  await Promise.all(players.map((player) => deletePlayer(player)))

  return {
    location: '/players'
  }
}
