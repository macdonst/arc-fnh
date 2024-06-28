import arc from '@architect/functions'
import { upsertPlayer } from '@architect/shared/db/players.mjs'
import authenticate from '@architect/shared/auth.mjs'


export const handler = arc.http.async(authenticate, http)

async function http(req) {
  await upsertPlayer(req.body)
  const location =
    req.body.fulltime === 'true' ? '/players' : '/players?type=spares'

  return {
    location
  }
}
